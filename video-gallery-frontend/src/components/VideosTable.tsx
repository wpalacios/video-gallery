import { Button, Space, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useCallback, useContext, useEffect } from "react";
import { AppContext } from "../contexts/AppContext";
import { useVideoService } from "../services";
import { CreateUpdateVideoDTO } from "../types/dtos/video.dto";
import VideoModal from "./VideoModal";

interface DataType {
  id: number;
  name: string;
  url: string;
}

const VideosTable = (): React.ReactElement => {
  const { getAll } = useVideoService();
  const { isModalOpen, videos, setVideos, setCurrentVideo, setIsModalOpen } =
    useContext(AppContext);

  const handleAdd = useCallback(() => {
    setCurrentVideo(undefined);
    setIsModalOpen(!isModalOpen);
  }, [isModalOpen, setIsModalOpen, setCurrentVideo]);

  useEffect(() => {
    const getVideos = async () => {
      const { data, status } = await getAll();
      if (data && status === 200) setVideos(data);
    };

    getVideos();
  }, [getAll, setVideos]);

  const handleUpdate = useCallback(
    (record: DataType) => {
      setCurrentVideo(record as CreateUpdateVideoDTO);
      setIsModalOpen(!isModalOpen);
    },
    [setCurrentVideo, setIsModalOpen, isModalOpen]
  );

  const columns: ColumnsType<DataType> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "URL",
      dataIndex: "url",
      key: "url",
      render: (url) => (
        <a href={url} target="_blank" rel="noreferrer noopener">
          {url}
        </a>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space>
          <Button type="default" onClick={() => handleUpdate(record)}>
            Update
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="relative isolate px-6 pt-14 lg:px-8">
      <div className="lg:flex lg:items-center lg:justify-between">
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            YouTube Videos
          </h2>
        </div>
        <div className="mt-5 flex lg:ml-4 lg:mt-0">
          <span className="sm:ml-3">
            <Button type="default" onClick={handleAdd}>
              Add +
            </Button>
          </span>
        </div>
      </div>
      {isModalOpen && <VideoModal isModalOpen={isModalOpen} />}
      {videos && <Table columns={columns} dataSource={videos} />}
    </div>
  );
};

export default VideosTable;
