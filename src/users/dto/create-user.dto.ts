import { IsIn, IsString, IsNotEmpty, IsOptional } from "class-validator";
import { userTypes } from "src/shared/schema/users";

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string;

    @IsNotEmpty()
    @IsString()
    @IsIn([userTypes.ADMIN, userTypes.CUSTOMER])
    type:string;

    @IsString()
    @IsOptional()
    secretToken?: string;

    isVarified?: boolean;
}
