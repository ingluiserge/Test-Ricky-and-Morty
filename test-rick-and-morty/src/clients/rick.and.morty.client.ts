import { Inject, Injectable } from '@nestjs/common';
import { GraphQLClient } from 'graphql-request';
import { RedisService } from 'src/services/redis.service';
import { hashString } from 'src/services/utils';

@Injectable()
export class RickAndMortyClient {

  private rickAndMortyGraphQlUrl: string =
    'https://rickandmortyapi.com/graphql';

  private client: GraphQLClient;

  private query: string = `
    query {
      characters(page:1, filter:{ }) {
        info {
          count
        }
        results {
          id,
          status,
          species,
          gender,
          name,
          origin {
            id,
            name,
            dimension,
            type
          }
        }
      }
    }
    `;  

  constructor(
    @Inject(RedisService) private readonly redisRepository: RedisService,
  ) {
    this.client = new GraphQLClient(this.rickAndMortyGraphQlUrl);
  }

  async getDefault() {
    const data = await this.redisRepository.get('rnm', 'default');
    if (data) return JSON.parse(data);

    const answer = await this.client.request(this.query);
    this.redisRepository.setWithExpiry(
      'rnm',
      'default',
      JSON.stringify(answer),
      60,
    );

    return answer;
  }

  async executeQuery(query: string) {

    const key = hashString(query);

    const data = await this.redisRepository.get('rnm', key);
    if (data) return JSON.parse(data);

    const answer = await this.client.request(query);
    this.redisRepository.setWithExpiry('rnm', key, JSON.stringify(answer), 60);

    return answer;
  }

  async getInitial(): Promise<any> {
    return await this.client.request(this.query);
  }
}
