"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { useState } from "react";

interface FloatingButtonProps {
  onClick?: () => void;
  icon?: React.ReactNode;
  tooltip?: string;
  position?: "bottom-right" | "bottom-left" | "top-right" | "top-left";
}

export function FloatingButton({
  onClick,
  icon = <MessageCircle className="h-5 w-5" />,
  tooltip = "Chat with us",
  position = "bottom-right",
}: FloatingButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  const positionClasses = {
    "bottom-right": "bottom-6 right-6",
    "bottom-left": "bottom-6 left-6",
    "top-right": "top-6 right-6",
    "top-left": "top-6 left-6",
  };

  return (
    <div className={`fixed ${positionClasses[position]} z-50`}>
      <motion.button
        onClick={onClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative group"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        {/* Main button */}
        <div className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300">
          {icon}
        </div>

        {/* Tooltip */}
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-gray-900 text-white text-sm px-3 py-2 rounded-lg whitespace-nowrap"
          >
            {tooltip}
            {/* Tooltip arrow */}
            <div className="absolute left-full top-1/2 -translate-y-1/2 w-0 h-0 border-l-4 border-l-gray-900 border-t-4 border-t-transparent border-b-4 border-b-transparent"></div>
          </motion.div>
        )}

        {/* Pulse animation */}
        <motion.div
          className="absolute inset-0 bg-primary rounded-full"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.7, 0, 0.7],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.button>
    </div>
  );
}
