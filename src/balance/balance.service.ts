import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Balance } from './balance.entity';
// import Decimal from 'decimal.js';

@Injectable()
export class BalanceService {
  constructor(
    @InjectRepository(Balance) private balanceRepo: Repository<Balance>,
  ) {}

  /**
   * 增加余额
   * @param id
   * @param amount
   * @returns
   */
  public async addBalance(id: string, amount: number) {
    return await this.balanceRepo.update(id, { remarks: amount.toString() });
  }
}
