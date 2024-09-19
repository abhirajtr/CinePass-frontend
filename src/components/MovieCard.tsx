import React from 'react';
import { motion } from 'framer-motion';

interface MovieCardProps {
    title: string;
    poster: string;
}

const MovieCard: React.FC<MovieCardProps> = ({ title, poster }) => {
    return (
        <motion.div
            className="max-w-sm flex-shrink-0 bg-gray-800 rounded-lg overflow-hidden shadow-lg"
            whileHover={{
                scale: 1.05, // Enlarge slightly on hover
                boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.3)", // Add shadow on hover
            }}
            transition={{ type: "spring", stiffness: 300 }}
        >
            <img
                src={poster}
                alt={title}
                className="w-56 h-auto object-cover"
            />
        </motion.div>
    );
};

export default MovieCard;
