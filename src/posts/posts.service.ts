import { Injectable, NotFoundException, BadGatewayException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { Repository } from 'typeorm';
import { Cron } from '@nestjs/schedule';
import { BlockchainStatisticsService } from '../blockchain-statistics/blockchain-statistics.service';
import axios from 'axios';
import { DateOfPost, DateOfPostType } from '../utils/types/dates';
import slugify from 'slugify';
import { CompaniesSalariesService } from '../companies-salaries/companies-salaries.service';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private readonly postsRepository: Repository<Post>,
    private readonly blockchainStatisticsService: BlockchainStatisticsService,
    private readonly companiesSalariesService: CompaniesSalariesService
  ) {}

  async generatePost (postDto: any, dataFrom: DateOfPostType, type: 'secret_info' | 'salary') {
    const text = type === 'salary' ? `Generate a small article about that data, it's about recruitment offers, the data is from that ${dataFrom}, data in json: ${JSON.stringify(postDto)}`
                                    : `Generate a small article about that data, it's about secret informations, the data is from that ${dataFrom}, data in json: ${JSON.stringify(postDto)}`
    const options = {
      method: "POST",
      url: "https://api.edenai.run/v2/text/generation",
      headers: {
        authorization: `Bearer ${process.env.EDNNAI_API_KEY}`,
      },
      data: {
        providers: "cohere",
        text,
        temperature: 0.2,
        max_tokens: 500,
        fallback_providers: "",
      },
    };

    try {
      const { data } = await axios.request(options) as { data: {cohere: { generated_text: string }} }
      const dateNow = new Date();
      const date = `${dateNow.getDate()}/${dateNow.getMonth()}/${dateNow.getFullYear()}`
      const post: { title: string, description: string, user: number } = {
        title: dataFrom === DateOfPost.MONTH ? `Companies salaries statistics for the ${DateOfPost.MONTH} of ${date}` : `Companies salaries statistics for the ${DateOfPost.YEAR} of ${date}`,
        description: data.cohere.generated_text,
        user: 43
      }
      return this.create(post)
    } catch (err) {
      console.log(err)
      throw new BadGatewayException()
    }
  }

  @Cron('0 0 0 1 * *') // on start month create report
  async createPostAfterMonth() {
    const dateNow = new Date()
    const year = dateNow.getFullYear()
    const month = dateNow.getMonth() === 1 ? 1 : dateNow.getMonth() - 1
    const salariesStats = await this.companiesSalariesService.getStats(new Date(year, month, 1))
    const blockchainSalariesStats = await this.blockchainStatisticsService.getSalariesStats(new Date(year, month, 1))
    const blockchainSecretInfosStats = await this.blockchainStatisticsService.getSecretInfosStats(new Date(year, month, 1))
    await this.generatePost(salariesStats, DateOfPost.MONTH, 'salary')
    await this.generatePost(blockchainSalariesStats, DateOfPost.MONTH, 'salary')
    await this.generatePost(blockchainSecretInfosStats, DateOfPost.MONTH, 'secret_info')
  }

  @Cron('0 0 0 31 12 *') // on end of the year create post report
  async createPostReportOnEndOfTheYear() {
    const dateNow = new Date()
    const year = dateNow.getFullYear() - 1
    const month = dateNow.getMonth()
    const salariesStats = await this.companiesSalariesService.getStats(new Date(year, month, 1))
    const blockchainSalariesStats = await this.blockchainStatisticsService.getSalariesStats(new Date(year, month, 1))
    const blockchainSecretInfosStats = await this.blockchainStatisticsService.getSalariesStats(new Date(year, month, 1))
    await this.generatePost(salariesStats, DateOfPost.YEAR, 'salary')
    await this.generatePost(blockchainSecretInfosStats, DateOfPost.YEAR, 'salary')
    await this.generatePost(blockchainSalariesStats, DateOfPost.YEAR, 'secret_info')
  }

  async create(createPostDto: CreatePostDto) {
    const newPost = this.postsRepository.create(createPostDto);
    return await this.postsRepository.save(newPost);
  }

  async findAll() {
    const posts = await this.postsRepository.find(
      {
        relations: {
          user: true
        },
        select: {
          user: {
            created_at: true,
            email: true,
            id: true,
            roles: true,
            username: true
          }
        }
    });

    // generating dynamic slugs
    const postsWithSlug = posts.map(post => (
      {
        ...post,
        slug: slugify(post.title)
      }
    ))

    return postsWithSlug
  }

  async findOne(id: number) {
    return await this.postsRepository.findOne(
      { 
        where: { id }, 
        relations: { 
          user: true
        },
        select: {
          user: {
            created_at: true,
            email: true,
            id: true,
            roles: true,
            username: true
          }
        } 
      })
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    const existingEntity = await this.postsRepository.findOneBy({ id });

    if (!existingEntity) {
      throw new NotFoundException(`Post with id ${id} not found`);
    }

    const updatedEntity = this.postsRepository.merge(existingEntity, updatePostDto);
    return await this.postsRepository.save(updatedEntity);
  }

  async remove(id: number) {
    const existingEntity = await this.postsRepository.findOneBy({ id });

    if (!existingEntity) {
      throw new NotFoundException(`Post with id ${id} not found`);
    }

    return await this.postsRepository.remove(existingEntity)
  }

  async removeAll () {
    const existingEntity = await this.postsRepository.find();

    existingEntity.forEach((post: Post) => {
      this.postsRepository.remove(post)
    })
  }
}
