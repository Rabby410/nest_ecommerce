import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { userRepository } from 'src/shared/repositories/user.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema, Users } from 'src/shared/schema/users';

@Module({
  controllers: [UsersController],
  providers: [UsersService, userRepository],
  imports: [
    MongooseModule.forFeature([
      {
        name: Users.name,
        schema: UserSchema,
      }
    ])
  ],
})
export class UsersModule {}
