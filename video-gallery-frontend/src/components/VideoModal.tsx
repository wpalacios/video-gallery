import { Form, Input, Modal } from "antd";
import React, { useCallback, useContext } from "react";
import { Controller, useForm } from "react-hook-form";
import { AppContext } from "../contexts/AppContext";
import { useVideoService } from "../services";
import { Video } from "../types/models/video";

interface VideoModalProps {
  isModalOpen: boolean;
  video?: Video;
}

interface FormData {
  name: string;
  url: string;
}

const VideoModal = ({ video }: VideoModalProps): React.ReactElement => {
  const { isModalOpen, setIsModalOpen, currentVideo, videos, setVideos } =
    useContext(AppContext);
  const { create, update } = useVideoService();

  const { handleSubmit, control } = useForm<FormData>({
    defaultValues: {
      name: currentVideo?.name || "",
      url: currentVideo?.url || "",
    },
  });

  const onSubmit = useCallback(
    async (video: FormData) => {
      if (currentVideo?.id) {
        const res = await update(currentVideo.id, { ...video });
        const updatedValues = [...videos];

        const foundIndex = updatedValues.findIndex(
          (x) => x.id === currentVideo.id
        );
        if (foundIndex) {
          updatedValues[foundIndex].name = video.name;
          updatedValues[foundIndex].url = video.url;
          setVideos(updatedValues);
        }
        setIsModalOpen(false);
        console.log(`video updated`, res.data);
      } else {
        const res = await create(video);
        if (res.status === 201) {
          console.log(`created video`, res.data);
          setVideos([...videos, res.data]);
          setIsModalOpen(false);
        }
      }
    },
    [create, currentVideo?.id, setIsModalOpen, update, setVideos, videos]
  );

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Modal
        title="Video Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okButtonProps={{ hidden: true }}
        cancelButtonProps={{ hidden: true }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Form.Item label="Name">
            <Controller
              name="name"
              control={control}
              rules={{ required: "Name is required" }}
              render={({ field, fieldState }) => (
                <>
                  <Input {...field} status={fieldState.error ? "error" : ""} />
                  {fieldState.error && (
                    <label className="text-red-500">
                      {fieldState.error.message}
                    </label>
                  )}
                </>
              )}
            />
          </Form.Item>
          <Form.Item label="Url">
            <Controller
              name="url"
              control={control}
              rules={{ required: "Url is required" }}
              render={({ field, fieldState }) => (
                <>
                  <Input {...field} status={fieldState.error ? "error" : ""} />
                  {fieldState.error && (
                    <label className="text-red-500">
                      {fieldState.error.message}
                    </label>
                  )}
                </>
              )}
            />
          </Form.Item>
          <button type="submit">Create</button>
        </form>
      </Modal>
    </>
  );
};

export default VideoModal;
