import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';
import { Post } from './entities/post.entity';
import { BlockchainStatisticsModule } from '../blockchain-statistics/blockchain-statistics.module';
import { CompaniesSalariesModule } from '../companies-salaries/companies-salaries.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Post]),
    ScheduleModule.forRoot(),
    BlockchainStatisticsModule,
    CompaniesSalariesModule
  ],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
