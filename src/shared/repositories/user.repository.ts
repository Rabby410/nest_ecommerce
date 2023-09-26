import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Users } from "../schema/users";
import { Injectable } from "@nestjs/common";


@Injectable()
export class userRepository{
    constructor(@InjectModel(Users.name) private readonly userModel: Model<Users>,){}

    async findOne(query: any){
        return await this.userModel.findOne(query);
    }

    async create(data: Record<string, any>){
        return await this.userModel.create(data);
    }
}