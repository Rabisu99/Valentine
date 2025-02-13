import { motion } from "framer-motion";
import { Heart } from "lucide-react"; // Using Lucide-react icons

const CoverCard = () => {
    return (
        <div className="h-[100dvh] flex flex-col justify-center items-center px-6 text-center">
            {/* Main Text */}
            <h1 className="text-3xl font-semibold text-gray-800 leading-tight">
                A little something special for you... 💌
            </h1>
        </div>
    );
};

export default CoverCard;
