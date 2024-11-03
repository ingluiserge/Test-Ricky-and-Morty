import { Field, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class Origin {

    @Field(type => Int, { nullable: true })
    id?: number;

    @Field()
    name: string;

    @Field()
    dimension: string;
}

@ObjectType()
export class Character {
    @Field(type => Int, { nullable: true })
    id?: number;

    @Field()
    name: string;

    @Field()
    status: string;

    @Field()
    species: string;

    @Field()
    gender: string;

    @Field(type => Origin, { nullable: true })
    origin?: Origin;
}