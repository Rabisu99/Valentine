import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { useState } from "react";

const FloatingHeartsBackground = ({ children }) => {
    const initialHearts = [
        { id: 1, x: "left-10", y: "top-40", size: 32, color: "text-pink-400", duration: 3 },
        { id: 2, x: "right-14", y: "bottom-36", size: 24, color: "text-pink-300", duration: 4 },
        { id: 3, x: "right-20", y: "top-20", size: 40, color: "text-pink-500", duration: 5 }
    ];

    const [hearts, setHearts] = useState(initialHearts);

    const removeHeart = () => {
        if (hearts.length > 0) {
            setHearts(hearts.slice(0, -1));
        }
    };

    return (
        <div className="h-[100dvh] w-screen bg-gradient-to-b from-pink-200 to-white flex justify-center items-center relative overflow-hidden">
            {/* Render hearts dynamically */}
            {hearts.map((heart) => (
                <motion.div
                    key={heart.id}
                    className={`absolute ${heart.y} ${heart.x} ${heart.color}`}
                    animate={{ y: [0, -30, 0], scale: [1, 1.1, 1] }}
                    transition={{ repeat: Infinity, duration: heart.duration }}
                >
                    <Heart size={heart.size} fill="currentColor" />
                </motion.div>
            ))}

            {/* Render children (cards) */}
            {children({ removeHeart })}
        </div>
    );
};

export default FloatingHeartsBackground;
