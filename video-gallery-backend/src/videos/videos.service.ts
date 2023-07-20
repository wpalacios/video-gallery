import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Video } from './entities/video.entity';
import { Repository } from 'typeorm';
import { CreateVideoDTO } from './dto/create-video.dto';
import { UpdateVideoDTO } from './dto/edit-video.dto';

@Injectable()
export class VideosService {
  constructor(
    @InjectRepository(Video)
    private videosRepository: Repository<Video>,
  ) {}

  create(video: CreateVideoDTO) {
    return this.videosRepository.save(video);
  }

  findAll(): Promise<Video[]> {
    return this.videosRepository.find();
  }

  findOne(id: number): Promise<Video | null> {
    return this.videosRepository.findOneBy({ id });
  }

  async update(id: number, { name, url }: UpdateVideoDTO) {
    return await this.videosRepository.update(
      { id },
      {
        name,
        url,
        updatedAt: new Date(),
      },
    );
  }

  async remove(id: number): Promise<void> {
    await this.videosRepository.delete(id);
  }
}
