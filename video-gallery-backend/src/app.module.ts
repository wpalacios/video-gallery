import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HttpExceptionFilter } from './common/filters/all-exceptions.filter';
import { VideosController } from './videos/videos.controller';
import { VideosService } from './videos/videos.service';
import { Video } from './videos/entities/video.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'example',
      database: 'videodb',
      entities: [Video],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Video]),
  ],
  controllers: [AppController, VideosController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    AppService,
    VideosService,
  ],
})
export class AppModule {}
