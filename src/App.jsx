import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CoverCard from "./components/CoverCard";
import ValentineCard from "./components/ValentineCard";
import FloatingHeartsBackground from "./components/FloatingHeartsBackground";
import FlowersCard from "./components/FlowersCard";

function App() {
  const [step, setStep] = useState(0);
  const [showSwipeMessage, setShowSwipeMessage] = useState(true);

  return (
    <FloatingHeartsBackground>
      {({ removeHeart }) => (
        <>
          <AnimatePresence>
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 500 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -500 }}
              transition={{ type: "spring", stiffness: 100, damping: 10 }}
              drag={showSwipeMessage ? "y" : false}  // Disable drag when showSwipeMessage is false              dragConstraints={{ top: 0, bottom: 0 }}
              dragElastic={0.3}
              onDragEnd={(e, info) => {
                if (info.velocity.y < -500 || info.offset.y < -200) {
                  console.log(info)
                  setStep(step + 1);
                  setShowSwipeMessage(false);
                }
              }}
              className="absolute"
            >
              {step === 0 && <CoverCard />}
              {step === 1 && <ValentineCard removeHeart={removeHeart} onYesPressed={() => setShowSwipeMessage(true)} />}
              {step === 2 && <FlowersCard />}
            </motion.div>
          </AnimatePresence>

          {/* Keep Swipe Up Message Static */}
          {showSwipeMessage && (
            <motion.div
              className="absolute bottom-10 text-gray-600 text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, y: [0, 5, 0] }}
              transition={{ opacity: { delay: 1, duration: 0.5 }, y: { repeat: Infinity, duration: 1.5 } }}
            >
              Swipe up to continue ⬆️
            </motion.div>
          )}
        </>
      )}
    </FloatingHeartsBackground>
  );
}

export default App;
