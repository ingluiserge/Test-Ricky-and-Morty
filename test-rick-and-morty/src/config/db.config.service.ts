import { Injectable, OnModuleInit } from "@nestjs/common";
import { Character } from "src/models/character";
import { Origin } from "src/models/origin";

@Injectable()
export class DatabaseConfigService implements OnModuleInit {
    onModuleInit() {
        Character.belongsTo(Origin);
        Origin.hasMany(Character);
    }
}