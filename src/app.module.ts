import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Balance } from './balance/balance.entity';
import { BalanceService } from './balance/balance.service';
import { AppService2 } from './sudu/app.service2';
import { AppService3 } from './sudu/app.service3';
import { AppService4 } from './sudu/app.service4';
import { AppService5 } from './sudu/app.service5';
import { AppService6 } from './sudu/app.service6';
import { AppService7 } from './sudu/app.service7';

@Module({
  imports: [
    TypeOrmModule.forFeature([Balance]),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'postgres',
      synchronize: false,
      logging: false,
      entities: [Balance],
      extra: {
        poolSize: 100,
      },
    }),
    BullModule.registerQueueAsync(
      {
        name: 'test1',
        useFactory: () => ({
          redis: {
            host: 'localhost',
            port: 6379,
          },
        }),
      },
      {
        name: 'test2',
        useFactory: () => ({
          redis: {
            host: 'localhost',
            port: 6379,
          },
        }),
      },
      {
        name: 'test3',
        useFactory: () => ({
          redis: {
            host: 'localhost',
            port: 6379,
          },
        }),
      },
      {
        name: 'test4',
        useFactory: () => ({
          redis: {
            host: 'localhost',
            port: 6379,
          },
        }),
      },
      {
        name: 'test5',
        useFactory: () => ({
          redis: {
            host: 'localhost',
            port: 6379,
          },
        }),
      },
      {
        name: 'test6',
        useFactory: () => ({
          redis: {
            host: 'localhost',
            port: 6379,
          },
        }),
      },
      {
        name: 'test7',
        useFactory: () => ({
          redis: {
            host: 'localhost',
            port: 6379,
          },
        }),
      },
    ),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    BalanceService,
    AppService2,
    AppService3,
    AppService4,
    AppService5,
    AppService6,
    AppService7,
  ],
})
export class AppModule {}
