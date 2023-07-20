import axios, { AxiosResponse } from "axios";
import { useCallback } from "react";
import { videosUrl } from "./use-video-service.url";
import VideoService from "./use-video-service.model";
import { Video } from "../../types/models/video";
import { CreateUpdateVideoDTO } from "../../types/dtos/video.dto";

const useDaoService = (): VideoService => {
  const findOne = useCallback((id: number): Promise<AxiosResponse<Video>> => {
    return axios.get<Video>(`${videosUrl}/${id}`);
  }, []);

  const getAll = useCallback((): Promise<AxiosResponse<Array<Video>>> => {
    return axios.get<Video[]>(videosUrl);
  }, []);

  const update = useCallback(
    (id: number, data: CreateUpdateVideoDTO): Promise<AxiosResponse<Video>> => {
      return axios.put<CreateUpdateVideoDTO, AxiosResponse<Video>>(
        `${videosUrl}/${id}`,
        data
      );
    },
    []
  );

  const create = useCallback(
    (data: CreateUpdateVideoDTO): Promise<AxiosResponse<Video>> => {
      return axios.post<CreateUpdateVideoDTO, AxiosResponse<Video>>(
        `${videosUrl}`,
        data
      );
    },
    []
  );

  return {
    create,
    findOne,
    getAll,
    update,
  };
};

export default useDaoService;
