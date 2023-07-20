import { useContext, useEffect } from "react";
import ReactPlayer from "react-player";
import { AppContext } from "../contexts/AppContext";
import { useVideoService } from "../services";
import { useParams } from "react-router-dom";

const Video = (): React.ReactElement => {
  let { id } = useParams();
  const { findOne } = useVideoService();
  const { currentVideo, setCurrentVideo } = useContext(AppContext);

  useEffect(() => {
    const getVideo = async () => {
      if (id && !isNaN(+id)) {
        const res = await findOne(parseInt(id));
        if (res.data && res.status === 200) {
          setCurrentVideo(res.data);
        }
      }
    };

    getVideo();

    return () => {
      setCurrentVideo(undefined);
    };
  }, [setCurrentVideo, findOne, id]);

  return (
    <div className="relative isolate px-6 pt-14 lg:px-8 content-center">
      {currentVideo && (
        <>
          <h1>{currentVideo.name}</h1>
          <ReactPlayer url={currentVideo.url} />
        </>
      )}
    </div>
  );
};

export default Video;
