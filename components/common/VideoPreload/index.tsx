import { useEffect, useRef, useState } from "react";

const VideoPreload = ({
  src,
  classStr,
  poster,
  isAutoPlay = false,
  isMuted = true,
  isLoop = false,
}: {
  src: string;
  classStr?: string;
  poster: string;
  isAutoPlay?: boolean;
  isMuted?: boolean;
  isLoop?: boolean;
}) => {
  const isPosterLoaded = useRef<any>(false),
    isVideoLoaded = useRef<any>(false);

  const [videoSrc, setSrc] = useState<any>(null);
  const [videoPoster, setPoster] = useState(null);

  useEffect(() => {
    if (isVideoLoaded.current || !src) return;

    if (!src.includes("phinitytherapy.com")) return;
    fetch(src)
      .then((fetchResponse) => {
        if (fetchResponse.ok) {
          return fetchResponse;
        }
      })
      .then((response) => {
        if (response) {
          return response!.blob();
        }
      })
      .then((imageBlob) => {
        if (imageBlob) {
          const imageObjectURL: any = URL.createObjectURL(imageBlob);
          setSrc(imageObjectURL);
        }
      });
    isVideoLoaded.current = true;
  }, [src]);

  if (!src) {
    return (
      <img src={poster || ""} alt="phinity therapy" className={classStr} />
    );
  }
  return (
    <video
      disableRemotePlayback
      disablePictureInPicture
      poster={poster || ""} //videoPoster
      className={classStr}
      autoPlay={isAutoPlay}
      muted={isMuted}
      controls={false}
      src={videoSrc || src || ""}
      playsInline
      loop={isLoop}
    >
      <source src={videoSrc || src || ""}></source>
    </video>
  );
};

export default VideoPreload;
