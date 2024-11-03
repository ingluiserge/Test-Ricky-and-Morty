import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateCharacterInput {
  @Field()
  name: string;

  @Field()
  status: string;

  @Field()
  species: string;

  @Field()
  gender: string;

  @Field({ nullable: true })
  originName?: string;

  @Field({ nullable: true })
  originDimension?: string;
}
