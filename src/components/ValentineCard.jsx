import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { useRef, useState, useEffect } from "react";

const ValentineCard = ({ removeHeart, onYesPressed }) => {
  const noButtonRef = useRef(null);
  const [maxX, setMaxX] = useState(0);
  const [maxY, setMaxY] = useState(0);
  const [yesPressed, setYesPressed] = useState(false);
  const [noCount, setNoCount] = useState(0);
  const [showHeartbreak, setShowHeartbreak] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    if (noButtonRef.current) {
      const buttonWidth = noButtonRef.current.offsetWidth;
      const buttonHeight = noButtonRef.current.offsetHeight;

      setMaxX(window.innerWidth - buttonWidth);
      setMaxY(window.innerHeight - buttonHeight);
    }
  }, []);

  useEffect(() => {
    if (showHeartbreak && videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
    }
  }, [showHeartbreak]);

  const bouncePoints = [
    { x: maxX, y: 300 },
    { x: 200, y: 0 },
    { x: 0, y: 200 },
    { x: maxX, y: 400 },
    { x: 0, y: 600 },
    { x: maxX, y: maxY },
    { x: 0, y: 300 },
    { x: 200, y: 0 },
    { x: maxX, y: 300 },
    { x: 0, y: 500 },
    { x: 200, y: maxY },
    { x: maxX, y: 600 },
    { x: 0, y: 400 },
    { x: maxX, y: 300 },
  ];

  const handleNoClick = () => {
    if (noCount < 3) {
      removeHeart(); // Remove one heart
    } else if (noCount === 3) {
      setShowHeartbreak(true)
      setTimeout(() => {
        window.location.reload(); // Reload after GIF finishes (3s delay)
      }, 7000);
    }
    setNoCount(noCount + 1);
  };

  return (
    <div>
      <motion.div className="z-10 h-screen flex flex-col justify-center items-center px-6 text-center">
        {showHeartbreak ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <video
              ref={videoRef}
              src="/heart-break.webm"
              className="w-32 h-32"
              autoPlay
              playsInline
              muted
              loop={false} // No loop to keep control over playback
              style={{ background: "none" }}
            />
          </motion.div>
        ) : (
          <>
            <motion.h1
              className="text-4xl font-bold text-gray-800 leading-tight"
              disabled={yesPressed} // Disables the button when yesPressed is true
              animate={{
                opacity: yesPressed ? 0 : 1, // Fades out when yesPressed is true
              }}>
              Will you be my Valentine? 💖
            </motion.h1>

            <motion.button
              className="px-4 py-2 bg-pink-500 text-white text-lg font-bold rounded-full shadow-lg"
              whileTap={{ scale: 0.9 }}
              onClick={() => {
                setYesPressed(true);
                onYesPressed()
              }}
              disabled={yesPressed} // Disables the button when yesPressed is true
              animate={{
                opacity: yesPressed ? 0 : 1, // Fades out when yesPressed is true
              }}
            >
              Yes! 💘
            </motion.button>
          </>
        )}
      </motion.div >
      {
        !showHeartbreak && !yesPressed && (
          <motion.button
            ref={noButtonRef}
            className="absolute top-0 px-4 py-2 bg-gray-300 text-gray-700 text-lg font-bold rounded-full shadow-lg"
            animate={{
              x: bouncePoints.map((point) => point.x),
              y: bouncePoints.map((point) => point.y),
            }}
            transition={{
              repeat: Infinity,
              duration: 50,
              ease: "linear",
            }}
            whileTap={{ scale: 0.9 }}
            onClick={handleNoClick}
          >
            No 🙈
          </motion.button>
        )
      }

      {
        yesPressed && (
          // Heart Shower Effect
          <div className="absolute inset-0 overflow-hidden">
            {Array.from({ length: 30 }).map((_, i) => {
              const sizeOptions = [24, 32, 40];
              const colorOptions = ["text-pink-300", "text-pink-400", "text-pink-500"];
              const randomSize = sizeOptions[Math.floor(Math.random() * sizeOptions.length)];
              const randomColor = colorOptions[Math.floor(Math.random() * colorOptions.length)];

              return (
                <motion.div
                  key={i}
                  className={`absolute ${randomColor}`}
                  style={{ fontSize: `${randomSize}px` }}
                  initial={{
                    x: Math.random() * window.innerWidth,
                    y: Math.random() * window.innerHeight,
                    opacity: 0,
                  }}
                  animate={{
                    y: [-50, window.innerHeight + 50],
                    opacity: [1, 0.8, 0],
                  }}
                  transition={{
                    duration: Math.random() * 2 + 2,
                    delay: Math.random(),
                    repeat: Infinity,
                  }}
                >
                  <Heart size={randomSize} />
                </motion.div>
              );
            })}
          </div>
        )
      }
    </div >
  );
};

export default ValentineCard;
