import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Users } from "../schema/users";



export class userRepository{
    constructor(@InjectModel(Users.name) private readonly userModel: Model<Users>,){}
}