import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CharacterService } from 'src/services/character.service';
import { Character as CharacterORM } from "src/models/character";
import { Op } from 'sequelize';
import { Inject, UseInterceptors } from '@nestjs/common';
import { LogTime } from 'src/decorators/LogTime';
import { RedisService } from 'src/services/redis.service';
import { delay, hashString } from 'src/services/utils';
import { Origin } from 'src/models/origin';
import { CharacterFilterInput } from 'src/dtos/graphql/character.filter.input';
import { CreateCharacterInput } from 'src/dtos/graphql/create.character.input';
import { Character } from 'src/dtos/graphql/character.model';
import { LoggingInterceptor } from 'src/middlewares/Interceptor';

@Resolver(of => Character)
@UseInterceptors(new LoggingInterceptor())
export class CharacterResolver {
    private characters: Character[] = [];

    constructor(
        private characterService: CharacterService, 
        @Inject(RedisService) private readonly redisRepository: RedisService
    ) { }    
    
    @Query(returns => [Character])    
    @LogTime()
    async getCharacters(@Args('filters', { nullable: true }) filters?: CharacterFilterInput): Promise<Character[]> {

        let filteredCharacters = this.characters;

        const key = hashString(JSON.stringify(filters));

        const data = await this.redisRepository.get('ghql-rnm-', key);
        if (data) return JSON.parse(data);

        const where: any = {};
        const originWhere: any = {};

        if (filters) {
            if (filters.id !== undefined) {
                where.id = filters.id;
            }
            if (filters.name) {
                where.name = { [Op.like]: `%${filters.name}%` };
            }
            if (filters.status) {
                where.status = { [Op.like]: `%${filters.status}%` };
            }
            if (filters.species) {
                where.species = { [Op.like]: `%${filters.species}%` };
            }
            if (filters.gender) {
                where.gender = { [Op.like]: `%${filters.gender}%` };
            }
            if (filters.originName) {
                originWhere.name = { [Op.like]: `%${filters.originName}%` };
            }
            if (filters.originDimension) {
                originWhere.dimension = { [Op.like]: `%${filters.originDimension}%` };
            }
        }       
        
        await delay(300);

        filteredCharacters = (await CharacterORM.findAll({ where, include: [{ model: Origin, where: originWhere }], }));

        this.redisRepository.setWithExpiry('ghql-rnm-', key, JSON.stringify(filteredCharacters), 60);

        return filteredCharacters;
    }

    @Mutation(returns => Character)
    createCharacter(@Args('createCharacterInput') createCharacterInput: CreateCharacterInput): Character {

        const character: Character = {
            id: this.characters.length + 1,
            ...createCharacterInput,
            origin: {
                name: createCharacterInput.originName,
                dimension: createCharacterInput.originDimension,
            },
        };
        this.characters.push(character);

        return character;
    }
}
