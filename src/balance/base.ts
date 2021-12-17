import { CreateDateColumn, UpdateDateColumn, DeleteDateColumn, VersionColumn, PrimaryGeneratedColumn, Column, Index } from 'typeorm';

/**
 * 表基类
 */
export class Base {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column({ comment: '备注', nullable: true, default: '' })
  remarks?: string;

  @Index()
  @CreateDateColumn({ type: 'timestamptz' })
  createTime?: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updateTime?: Date;

  @DeleteDateColumn({ select: false, type: 'timestamptz' })
  deleteTime?: Date;

  @VersionColumn({ select: false })
  version?: number;
}
