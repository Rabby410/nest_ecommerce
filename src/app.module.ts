import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import  config  from 'config';
import { AllExceptionFilter } from './httpExceptionFilter';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    MongooseModule.forRoot(config.get('mongodbUrl'),{
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
      keepAlive: true ,
      w: 1
    }),
    UsersModule
  ],
  controllers: [AppController],
  providers: [AppService,
    {
      provide: 'APPFILTER',
      useClass: AllExceptionFilter
    }
  ],
})
export class AppModule {}
