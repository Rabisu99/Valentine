import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart } from "lucide-react";

const FlowersCard = () => {
    const [response, setResponse] = useState(null);
    const [address, setAddress] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const [declined, setDeclined] = useState(false);
    const videoRef = useRef(null);

    const handleAccept = () => {
        setResponse("accept");
        setDeclined(false); // Reset declined state when accepting again
    };

    const handleDecline = () => {
        setResponse("decline");
        setTimeout(() => {
            setDeclined(true); // Show Accept-only option after declining
        }, 2000); // Wait 2 seconds before showing Accept-only state
    };

    const handleSubmit = async () => {
        if (response === "accept" && address.trim() !== "") {
            try {
                const formData = new FormData();
                formData.append("address", address);

                await fetch("https://formspree.io/f/xzzdayol", {
                    method: "POST",
                    body: formData,
                    headers: {
                        Accept: "application/json",
                    },
                });

                setTimeout(() => {
                    setResponse("confirmed");
                    setSubmitted(true);
                }, 300);
            } catch (error) {
                console.error("Failed to send email:", error);
            }
        }
    };


    return (
        <>
            <motion.div
                className="h-screen flex flex-col justify-center items-center px-6 text-center"
                initial={{ opacity: 0, y: 500 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -500 }}
                transition={{ type: "spring", stiffness: 100, damping: 10 }}
            >
                <AnimatePresence mode="wait">
                    {!response && (
                        <motion.div
                            key="intro"
                            initial={{ opacity: 1 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <h1 className="text-3xl font-bold text-gray-800 mb-4">
                                A gift is on its way! 💐
                            </h1>
                            <div className="flex space-x-4 mt-4">
                                <motion.button
                                    className="ml-4 px-4 py-2 rounded-full text-lg font-bold shadow-lg bg-gray-300 text-gray-700"
                                    whileTap={{ scale: 0.9 }}
                                    onClick={handleAccept}
                                >
                                    Accept 🎁
                                </motion.button>

                                <motion.button
                                    className="px-4 py-2 rounded-full text-lg font-bold shadow-lg bg-gray-300 text-gray-700"
                                    whileTap={{ scale: 0.9 }}
                                    onClick={handleDecline}
                                >
                                    Decline ❌
                                </motion.button>
                            </div>
                        </motion.div>
                    )}

                    {response === "accept" && (
                        <motion.div
                            key="address"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5 }}
                            className="flex flex-col items-center"
                        >
                            {/* Flower GIF Above Input */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1.5 }}
                                transition={{ duration: 0.5 }}
                            >
                                <video
                                    ref={videoRef}
                                    src="/flowers.webm"
                                    className="w-32 h-32"
                                    autoPlay
                                    playsInline
                                    muted
                                    loop={true} // No loop to keep control over playback
                                    style={{ background: "none" }}
                                />
                            </motion.div>
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Enter your address for delivery 📍
                            </label>
                            <input
                                type="text"
                                placeholder="Street, City, Country"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                className="w-80 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-pink-300"
                            />
                            <motion.button
                                onClick={handleSubmit}
                                className="mt-4 px-6 py-2 bg-pink-500 text-white text-lg font-bold rounded-full shadow-lg"
                                disabled={!address.trim()}
                                whileTap={{ scale: 0.9 }}
                            >
                                Confirm 💌
                            </motion.button>
                        </motion.div>
                    )}

                    {/* Show Happy Valentines message after submission */}
                    {submitted && (
                        <motion.div
                            key="confirmed"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.8, delay: 0.5 }}
                        >
                            <h1 className="text-3xl font-bold text-gray-800">
                                💐 Happy Valentines! 🥰
                            </h1>
                        </motion.div>
                    )}

                    {response === "decline" && !declined && (
                        <motion.p
                            key="declined"
                            className="mt-4 text-gray-500"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            No way! 😠
                        </motion.p>
                    )}

                    {/* Show "A gift is on its way" again but with only Accept option */}
                    {declined && (
                        <motion.div
                            key="try-again"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <h1 className="text-3xl font-bold text-gray-800 mb-4">
                                A gift is on its way! 💐
                            </h1>
                            <motion.button
                                className="px-4 py-2 rounded-full text-lg font-bold shadow-lg bg-gray-300 text-gray-700"
                                whileTap={{ scale: 0.9 }}
                                onClick={handleAccept}
                            >
                                Accept 🎁
                            </motion.button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>

            {submitted && (
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
            )}
        </>
    );
};

export default FlowersCard;
