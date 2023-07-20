import { CreateUpdateVideoDTO } from "../dtos/video.dto";
import { Video } from "../models/video";

export interface AppContextType {
  isModalOpen: boolean;
  currentVideo?: CreateUpdateVideoDTO;
  videos: Video[];
  setCurrentVideo: (value: CreateUpdateVideoDTO | undefined) => void;
  setIsModalOpen: (value: boolean) => void;
  setVideos: (value: Video[]) => void;
}
