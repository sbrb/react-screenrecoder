import React, { useRef, useState, useEffect } from 'react';
// import './style.css';
import { ReactMediaRecorder } from 'react-media-recorder';

const VideoPreview = ({ stream }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);
  if (!stream) {
    return null;
  }
  return <video ref={videoRef} width={500} height={500} autoPlay controls />;
};

export default function App() {
  const [enable, setEnable] = useState(true);
  return (
    <div>
      <h1>Hello StackBlitz!</h1>
      <div>
        <ReactMediaRecorder
          video
          blobPropertyBag={{
            type: 'video/webm',
          }}
          // askPermissionOnMount={true}
          render={({
            previewStream,
            status,
            startRecording,
            stopRecording,
            mediaBlobUrl,
          }) => {
            console.log(previewStream);
            return (
              <div>
                <p>{status}</p>
                <button onClick={startRecording}>Start Recording</button>
                <button onClick={stopRecording}>Stop Recording</button>
                <button
                  onClick={() => {
                    startRecording();
                    setTimeout(stopRecording, 2000);
                    setEnable(false);
                  }}
                >
                  togglestreaming
                </button>
                {/* <audio src={mediaBlobUrl} controls autoPlay loop /> */}
                <video src={mediaBlobUrl} controls autoPlay loop />
                {enable && <VideoPreview stream={previewStream} />}
              </div>
            );
          }}
        />
      </div>
    </div>
  );
}