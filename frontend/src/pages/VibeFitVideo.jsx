import React from "react";
import { useNavigate } from "react-router-dom";
import vibefit from "../assets/VibeFit.mp4";

function VibeFitVideo() {
  const navigate = useNavigate();

  const handleVideoEnd = () => {
    navigate("/");
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        zIndex: 9999,
        backgroundColor: "black",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <video
        src={vibefit}
        type="video/mp4"
        autoPlay
        onEnded={handleVideoEnd}
        playsInline
        muted={false}
        style={{
          maxWidth: "100%",
          maxHeight: "100%",
          objectFit: "contain",
        }}
      />

      <style>
        {`
          /* Responsive adjustments */
          @media (max-width: 768px) {
            video {
              object-fit: contain !important;
              height: auto !important;
              max-height: 80vh !important;
              width: 100% !important;
            }
          }
        `}
      </style>
    </div>
  );
}

export default VibeFitVideo;
