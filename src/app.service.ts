import { InjectQueue, Process, Processor } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import Bull, { Queue } from 'bull';
import { BalanceService } from './balance/balance.service';

@Injectable()
@Processor('test1')
export class AppService {
  constructor(
    @InjectQueue('test1') private readonly testQueue: Queue,
    @InjectQueue('test2') private readonly testQueue2: Queue,
    @InjectQueue('test3') private readonly testQueue3: Queue,
    @InjectQueue('test4') private readonly testQueue4: Queue,
    @InjectQueue('test5') private readonly testQueue5: Queue,
    @InjectQueue('test6') private readonly testQueue6: Queue,
    @InjectQueue('test7') private readonly testQueue7: Queue,
    private balanceService: BalanceService,
  ) {}

  async getHello() {
    const balanceIdList = [
      '3018b7fa-9413-43c2-987d-62f21baa2a0e',
      'ce231f70-1102-4113-b27c-c8e4f049b71b',
      'ac15c442-d8d4-4616-ac1b-48ab29e65b92',
      '3fb29d87-d7af-4691-8286-6408c31f7cab',
      '5fac3f94-83cb-4332-ba3f-64058ddffdd9',
      '15b92654-7571-4d1c-9418-b2ecae88f5a9',
      'cb426b4f-5178-47a0-97e6-098d43792592',
      'b5bf2f4b-ef69-458a-b254-3aa3286a9315',
      '4130ffbf-73ff-488e-9eba-bcc8f5c33538',
      '3b88dcb1-cc9c-436a-8473-24ac0c8aa174',
      'b018aac4-b38d-4cd2-b3a1-4a0c8934e99b',
    ];
    const amount = 1;
    const rawData = [
      {
        header: {
          message_type: 'transfer',
          notification_type: 'transfer_completed_notification',
        },
        body: {
          id: 'cb3afffb-d1dd-4ba0-86e0-7083c995676d',
          short_reference: 'BT-20211217-JRYXNR',
          source_account_id: 'd236f432-dd3a-4d22-aaa1-0aa3f5290913',
          destination_account_id: '9f9a51fb-808a-4768-a132-0202e90c142c',
          currency: 'USD',
          amount: '50075.00',
          status: 'completed',
          created_at: '2021-12-17T05:38:45+00:00',
          updated_at: '2021-12-17T05:38:45+00:00',
          completed_at: '2021-12-17T05:38:45+00:00',
          creator_account_id: '9f9a51fb-808a-4768-a132-0202e90c142c',
          creator_contact_id: 'ee157bcd-9c07-48b1-8dfc-f95c155f4cb5',
          reason: '708c2a2e-17dd-4b04-8230-698f8beae0a9',
        },
      },
    ];

    const jobOpts: Bull.JobOptions = {
      removeOnComplete: true,
    };

    let i = 0;
    for (let j = 0; j < 100; j++) {
      for (let index = 0; index < balanceIdList.length; index++) {
        const balanceId = balanceIdList[index];
        // 随机生成 10个任务
        // setTimeout(() => {
        i++;
        await this.testQueue.add(
          `test111`,
          { balanceId, amount, i, rawData },
          jobOpts,
        );
        await this.testQueue2.add(
          `test111`,
          { balanceId, amount, i, rawData },
          jobOpts,
        );
        await this.testQueue3.add(
          `test111`,
          { balanceId, amount, i, rawData },
          jobOpts,
        );
        await this.testQueue4.add(
          `test111`,
          { balanceId, amount, i, rawData },
          jobOpts,
        );
        await this.testQueue5.add(
          `test111`,
          { balanceId, amount, i, rawData },
          jobOpts,
        );
        await this.testQueue6.add(
          `test111`,
          { balanceId, amount, i, rawData },
          jobOpts,
        );
        await this.testQueue7.add(
          `test111`,
          { balanceId, amount, i, rawData },
          jobOpts,
        );
      }
    }

    return true;
  }

  @Process({ name: 'test111', concurrency: 1 })
  async handleTest(job: Bull.Job<any>, done: Bull.DoneCallback) {
    const { balanceId, amount, i } = job.data as any;

    await this.balanceService.addBalance(balanceId, amount);
    console.log('handle queue index', i);
    done();
  }
}
