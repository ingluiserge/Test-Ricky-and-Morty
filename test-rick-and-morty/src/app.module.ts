import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RedisClientFactory } from './config/redis.config';
import { RedisService } from './services/redis.service';
import { SeederService } from './services/seeder.service';
import { CharacterService } from './services/character.service';
import { ScheduleModule } from '@nestjs/schedule';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { RickAndMortyClient } from './clients/rick.and.morty.client';
import { DatabaseConfigService } from './config/db.config.service';
import { CharacterResolver } from './graphql/character.resolver';
import { ConfigModule } from '@nestjs/config';
import { LoggingInterceptor } from './middlewares/Interceptor';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,      
    })
  ],
  controllers: [AppController],
  providers: [
    //configs
    RedisClientFactory,
    DatabaseConfigService,
    //services
    AppService,    
    RedisService,
    SeederService,
    CharacterService,
    RickAndMortyClient,
    //resolvers
    CharacterResolver,
    //middlewares
    LoggingInterceptor
  ],
})
export class AppModule {}
