import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UsePipes,
} from '@nestjs/common';
import { CreateVideoDTO, createVideoSchema } from './dto/create-video.dto';
import { UpdateVideoDTO } from './dto/edit-video.dto';
import { VideosService } from './videos.service';
import { Video } from 'src/interfaces/video.interface';
import { JoiValidationPipe } from 'src/common/pipes/joi-validation.pipe';

@Controller('videos')
export class VideosController {
  constructor(private videosService: VideosService) {}

  @Get()
  async findAll(): Promise<Video[]> {
    return this.videosService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Video> {
    return this.videosService.findOne(id);
  }

  @Post()
  @UsePipes(new JoiValidationPipe(createVideoSchema))
  async create(@Body() createVideoDto: CreateVideoDTO) {
    return this.videosService.create(createVideoDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateVideoDto: UpdateVideoDTO,
  ) {
    console.log('updating with data', updateVideoDto);
    return this.videosService.update(id, updateVideoDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.videosService.remove(id);
  }
}
