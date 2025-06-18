import React, { useRef, useState, useCallback,  } from 'react';
import Webcam from 'react-webcam';
import Palette, { usePalette } from "react";

const videoConstraints = {
  width: 640,
  height: 480,
  facingMode: 'user'
};

const WebcamPalette = () => {
  const webcamRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(null);
  const [colors, setColors] = useState({});

  const capture = useCallback(() => {
    const image = webcamRef.current.getScreenshot();
    setImgSrc(image);
  }, [webcamRef]);

  return (
    <div style={{ textAlign: 'center', fontFamily: 'sans-serif' }}>
      {!imgSrc ? (
        <>
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            width={videoConstraints.width}
            height={videoConstraints.height}
            videoConstraints={videoConstraints}
            mirrored
          />
          <button onClick={capture} style={{ marginTop: 10 }}>
            Capture Frame
          </button>
        </>
      ) : (
        <>
          <img
            src={imgSrc}
            alt="Captured"
            width={videoConstraints.width}
            height={videoConstraints.height}
          />
          <br />
          <button onClick={() => setImgSrc(null)} style={{ margin: '10px' }}>
            Retake
          </button>

          <Palette
            src={imgSrc}
            getColors={palette => setColors(palette)}
          />

          {colors.vibrant && (
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              {Object.entries(colors).map(([name, color]) => (
                <div
                  key={name}
                  style={{
                    backgroundColor: color,
                    width: 60,
                    height: 60,
                    margin: 5,
                    border: '1px solid #ddd'
                  }}
                  title={name}
                />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default WebcamPalette;
