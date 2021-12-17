import { InjectQueue, Process, Processor } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import Bull, { Job, Queue } from 'bull';
import { BalanceService } from 'src/balance/balance.service';

@Injectable()
@Processor('test6')
export class AppService6 {
  constructor(@InjectQueue('test6') private readonly testQueue: Queue, private balanceService: BalanceService) {}

  async getHello() {
    const balanceIdList = ['3018b7fa-9413-43c2-987d-62f21baa2a0e',
      'ce231f70-1102-4113-b27c-c8e4f049b71b',
      'ac15c442-d8d4-4616-ac1b-48ab29e65b92',
      '3fb29d87-d7af-4691-8286-6408c31f7cab',
      '5fac3f94-83cb-4332-ba3f-64058ddffdd9',
      '15b92654-7571-4d1c-9418-b2ecae88f5a9',
      'cb426b4f-5178-47a0-97e6-098d43792592',
      'b5bf2f4b-ef69-458a-b254-3aa3286a9315',
      '4130ffbf-73ff-488e-9eba-bcc8f5c33538',
      '3b88dcb1-cc9c-436a-8473-24ac0c8aa174',
      'b018aac4-b38d-4cd2-b3a1-4a0c8934e99b',];
    const amount = 1;

    for (let index = 0; index < 1000; index++) {
      for (let index = 0; index < balanceIdList.length; index++) {
        const balanceId = balanceIdList[index];
        // 随机生成 10个任务
        // setTimeout(() => {
        await this.testQueue.add(`test2`, { balanceId, amount, index,})
        // console.log('add queue index', index)
        // })
  
      }
    }


    return true;
  }

  @Process({ name: 'test111', concurrency: 50 })
  async handleTest(job: Bull.Job<any>, done: Bull.DoneCallback) {
    const { balanceId, amount, index } = job.data as any;

    // Simulate database time-consuming operations(1-10s)
    // await this.sleep(Math.random() * 10000);

    await this.balanceService.addBalance(balanceId, amount);
    console.log('handle queue index', index)
    //done();
  }


  /**
 * 延迟执行、传函数则延迟执行函数
 * @param time
 * @param fn
 */
  private async sleep(time: number, fn: any = null) {
    return new Promise<void>(resolve => {
      const timeout = setTimeout(() => {
        if (timeout) clearTimeout(timeout);
        if (fn) fn();
        resolve();
      }, time * 1);
    });
  }
}
