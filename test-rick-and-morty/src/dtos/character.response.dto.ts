import { CharacterDto } from "./character.dto";

export class ResultsDto {
    characters: CharacterResponseDto
}

export class CharacterResponseDto {
    results: CharacterDto[]
}