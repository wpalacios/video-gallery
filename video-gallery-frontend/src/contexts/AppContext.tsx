import { createContext, useCallback, useMemo, useState } from "react";
import { AppContextType } from "../types";
import { Video } from "../types/models/video";
import { CreateUpdateVideoDTO } from "../types/dtos/video.dto";

const initialState: AppContextType = {
  isModalOpen: false,
  currentVideo: undefined,
  videos: [],
  setCurrentVideo: (value: CreateUpdateVideoDTO | undefined): void => {},
  setIsModalOpen: (value: boolean): void => {},
  setVideos: (value: Video[]): void => {},
};

const AppContext = createContext(initialState);

const AppContextProvider = ({
  children,
}: {
  children?: React.ReactNode;
}): React.ReactElement => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(
    initialState.isModalOpen
  );

  const [currentVideo, setCurrentVideo] = useState<
    CreateUpdateVideoDTO | undefined
  >(initialState.currentVideo);

  const [videos, setVideos] = useState<Video[]>(initialState.videos);

  const updateIsModalOpen = useCallback((isModalOpen: boolean) => {
    setIsModalOpen(isModalOpen);
  }, []);

  const updateCurrentVideo = useCallback(
    (video: CreateUpdateVideoDTO | undefined) => {
      setCurrentVideo(video);
    },
    []
  );

  const updateVideos = useCallback(
    (videos: Video[]) => {
      setVideos(videos);
    },
    [setVideos]
  );

  const providerValue = useMemo(
    () => ({
      isModalOpen,
      currentVideo,
      videos,
      setIsModalOpen: updateIsModalOpen,
      setCurrentVideo: updateCurrentVideo,
      setVideos: updateVideos,
    }),
    [
      isModalOpen,
      currentVideo,
      updateCurrentVideo,
      updateIsModalOpen,
      updateVideos,
      videos,
    ]
  );

  return (
    <AppContext.Provider value={providerValue}>{children}</AppContext.Provider>
  );
};

export default AppContextProvider;
export { AppContext };
