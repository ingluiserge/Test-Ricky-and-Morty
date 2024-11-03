import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class CharacterFilterInput {
  @Field({ nullable: true })
  id?: number;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  status?: string;

  @Field({ nullable: true })
  species?: string;

  @Field({ nullable: true })
  gender?: string;

  @Field({ nullable: true })
  originName?: string;

  @Field({ nullable: true })
  originDimension?: string;
}