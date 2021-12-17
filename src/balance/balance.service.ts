import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Balance } from './balance.entity';
// import Decimal from 'decimal.js';

@Injectable()
export class BalanceService {
	constructor(@InjectRepository(Balance) private balanceRepo: Repository<Balance>) { }

	/**
	 * 增加余额
	 * @param id 
	 * @param amount 
	 * @returns 
	 */
	public async addBalance(id: string, amount: number) {
		// const balanceObj = await this.balanceRepo.findOneOrFail({ id })
		// balanceObj.available = new Decimal(balanceObj.available).add(new Decimal(amount)).toNumber();
		return await this.balanceRepo.update(id, { available: 0 });
	}
}
