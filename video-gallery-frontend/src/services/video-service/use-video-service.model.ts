import { AxiosResponse } from "axios";
import { Video } from "../../types/models/video";
import { CreateUpdateVideoDTO } from "../../types/dtos/video.dto";

export default interface VideoService {
  getAll: () => Promise<AxiosResponse<Array<Video>>>;
  findOne: (id: number) => Promise<AxiosResponse<Video>>;
  update: (
    id: number,
    payload: CreateUpdateVideoDTO
  ) => Promise<AxiosResponse<Video>>;
  create: (payload: CreateUpdateVideoDTO) => Promise<AxiosResponse<Video>>;
  deleteOne: (id: number) => Promise<AxiosResponse>;
}
