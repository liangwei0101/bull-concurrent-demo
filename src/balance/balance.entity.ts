import { Column, Entity, Index } from 'typeorm';
import { Base } from './base';

/**
 * 余额
 */
@Entity('balance')
export class Balance extends Base {
  constructor(init?: Partial<Balance>) {
    super();
    Object.assign(this, init);
  }

  @Index()
  @Column({ type: 'varchar', length: 30, default: '', comment: '币种' })
  currency: string;
}
