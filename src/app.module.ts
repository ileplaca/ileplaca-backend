import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BlockchainStatisticsModule } from './blockchain-statistics/blockchain-statistics.module';
import { PostsModule } from './posts/posts.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './posts/entities/post.entity';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';
import { ConfigModule } from '@nestjs/config';
import { CompaniesSalariesModule } from './companies-salaries/companies-salaries.module';
import { CompaniesSalary } from './companies-salaries/entities/companies-salary.entity';
import { CompaniesModule } from './companies/companies.module';
import { Company } from './companies/entities/company.entity';
import * as dotenv from 'dotenv'
dotenv.config()
//test
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    BlockchainStatisticsModule,
    PostsModule,
    TypeOrmModule.forRoot({
      url: process.env.DATABASE_URL,
      type: 'postgres',
      entities: [Post, User, CompaniesSalary, Company],
      synchronize: true,
      // host: 'db',
      // port: 5432,
      // username: process.env.POSTGRES_USERNAME,
      // password: process.env.POSTGRES_DATABASE,
      // database: process.env.POSTGRES_PASSWORD,
      // autoLoadEntities: true,
    }),
    AuthModule,
    UsersModule,
    CompaniesSalariesModule,
    CompaniesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
