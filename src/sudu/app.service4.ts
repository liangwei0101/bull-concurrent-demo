import { Process, Processor } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import Bull from 'bull';
import { BalanceService } from 'src/balance/balance.service';

@Injectable()
@Processor('test4')
export class AppService4 {
  constructor(private balanceService: BalanceService) {}

  @Process({ name: 'test111', concurrency: 1 })
  async handleTest(job: Bull.Job<any>, done: Bull.DoneCallback) {
    const { balanceId, amount, index } = job.data as any;

    await this.balanceService.addBalance(balanceId, amount);
    console.log('handle queue index', index);
    done();
  }
}
