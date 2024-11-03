import {
  Character,
  CharacterAttributes,
  CharacterCreationAttributes,
} from 'src/models/character';
import { Origin } from 'src/models/origin';
import { StatusCodes } from 'http-status-codes';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { getUniqueItemsById } from './utils';
import { ResultsDto } from 'src/dtos/character.response.dto';
import { RickAndMortyClient } from 'src/clients/rick.and.morty.client';
import ApiError from 'src/dtos/response/ApiErrors';

@Injectable()
export class CharacterService implements OnModuleInit {
  constructor(private gqlService: RickAndMortyClient) {}

  async onModuleInit() {
    console.log('Running initial migration');
    await this.runUpdate();
  }

  async getById(id: string | number): Promise<CharacterAttributes> {
    try {
      const character = await Character.findByPk(id);
      if (!character) {
        throw new ApiError('Character not found', StatusCodes.NOT_FOUND);
      }
      return character;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async create(
    payload: CharacterCreationAttributes,
  ): Promise<CharacterAttributes> {
    try {
      const character = await Character.create(payload);
      return character;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async runUpdate(): Promise<void> {
    try {
      const response = (await this.gqlService.getInitial()) as ResultsDto;
      const characters = response.characters.results.slice(0, 15);
      const origins = characters
        .filter((c) => c.origin !== undefined)
        .map((c) => c.origin);

      const parsedOrigins = getUniqueItemsById(origins);

      for (const origin of parsedOrigins) {
        if (origin.id === null) continue;

        Origin.upsert(origin);
      }

      const charactersToInsert = characters.map((c) => {
        return {
          id: c.id,
          name: c.name,
          gender: c.gender,
          species: c.species,
          status: c.status,
          OriginId: c.origin.id,
        } as CharacterAttributes;
      });

      for (const character of charactersToInsert) {
        Character.upsert(character);
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
