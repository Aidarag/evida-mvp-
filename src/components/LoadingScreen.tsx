import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

interface LoadingScreenProps {
  onComplete: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {

  useEffect(() => {
    // Run the animation sequences and then complete loading
    const timer = setTimeout(() => {
      onComplete();
    }, 2800);

    return () => clearTimeout(timer);
  }, [onComplete]);

  // Coordinates for the 4 primary nodes representing students
  const nodes = [
    { id: 1, cx: 120, cy: 120, targetX: 185, targetY: 185, delay: 0 }, // Top-Left
    { id: 2, cx: 280, cy: 120, targetX: 215, targetY: 185, delay: 0.2 }, // Top-Right
    { id: 3, cx: 120, cy: 280, targetX: 185, targetY: 215, delay: 0.4 }, // Bottom-Left
    { id: 4, cx: 280, cy: 280, targetX: 215, targetY: 215, delay: 0.3 }  // Bottom-Right
  ];

  // Connections (lines) between nodes
  const connections = [
    { from: 0, to: 1, delay: 0.4 },
    { from: 1, to: 3, delay: 0.6 },
    { from: 3, to: 2, delay: 0.8 },
    { from: 2, to: 0, delay: 0.5 },
    { from: 0, to: 3, delay: 0.7 }, // diagonal
    { from: 1, to: 2, delay: 0.7 }  // diagonal
  ];

  return (
    <div className="fixed inset-0 bg-[#0F0D11] z-[999] flex flex-col items-center justify-center overflow-hidden font-sans select-none">
      
      {/* Decorative Warm Backglow */}
      <div className="absolute w-[400px] h-[400px] rounded-full bg-[#FE7F42]/8 blur-[100px] pointer-events-none" />

      {/* SVG Canvas for Network and Logo transformation */}
      <div className="relative w-80 h-80 flex items-center justify-center">
        <svg 
          viewBox="0 0 400 400" 
          className="w-full h-full"
        >
          {/* Animated connection lines (representing student networking) */}
          <g>
            {connections.map((line, index) => {
              const startNode = nodes[line.from];
              const endNode = nodes[line.to];
              return (
                <motion.line
                  key={`line-${index}`}
                  x1={startNode.cx}
                  y1={startNode.cy}
                  x2={endNode.cx}
                  y2={endNode.cy}
                  stroke="url(#line-gradient)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0.2 }}
                  animate={{ 
                    pathLength: [0, 1],
                    opacity: [0.2, 0.6, 0] 
                  }}
                  transition={{ 
                    duration: 1.4,
                    delay: line.delay,
                    ease: "easeInOut"
                  }}
                />
              );
            })}
          </g>

          {/* Glowing particle nodes that merge into the logo leaf nodes */}
          {nodes.map((node) => {
            return (
              <motion.circle
                key={`node-${node.id}`}
                cx={node.cx}
                cy={node.cy}
                r="7"
                fill="#FE7F42"
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                  scale: [0, 1.4, 1],
                  opacity: [0, 1, 1],
                  cx: [node.cx, node.cx, node.targetX],
                  cy: [node.cy, node.cy, node.targetY],
                  r: [7, 7, 12]
                }}
                transition={{
                  scale: { duration: 0.6, delay: node.delay },
                  opacity: { duration: 0.6, delay: node.delay },
                  cx: { duration: 0.8, delay: 1.3, ease: [0.25, 1, 0.5, 1] },
                  cy: { duration: 0.8, delay: 1.3, ease: [0.25, 1, 0.5, 1] },
                  r: { duration: 0.6, delay: 1.4 }
                }}
                className="filter drop-shadow-[0_0_8px_rgba(254,127,66,0.8)]"
              />
            );
          })}

          {/* Definitions for gradients and clipping */}
          <defs>
            <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FE7F42" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#FF8A4C" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#FFFB97" stopOpacity="0.8" />
            </linearGradient>
          </defs>
        </svg>

        {/* Coalesced Logo overlay (fades in right as particles complete merging) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 1.8, ease: "easeOut" }}
          className="absolute w-20 h-20 grid grid-cols-2 gap-[8%]"
        >
          {/* Top Left Leaf */}
          <div 
            className="bg-[#FE7F42] shadow-[0_0_15px_rgba(254,127,66,0.4)]"
            style={{
              borderTopLeftRadius: '40%',
              borderBottomRightRadius: '10%',
              borderTopRightRadius: '25%',
              borderBottomLeftRadius: '25%',
            }}
          />
          {/* Top Right Leaf */}
          <div 
            className="bg-[#FF8A4C] shadow-[0_0_15px_rgba(255,138,76,0.3)]"
            style={{
              borderTopRightRadius: '40%',
              borderBottomLeftRadius: '10%',
              borderTopLeftRadius: '25%',
              borderBottomRightRadius: '25%',
            }}
          />
          {/* Bottom Left Leaf */}
          <div 
            className="bg-[#FE7F42] shadow-[0_0_15px_rgba(254,127,66,0.3)]"
            style={{
              borderBottomLeftRadius: '40%',
              borderTopRightRadius: '10%',
              borderBottomRightRadius: '25%',
              borderTopLeftRadius: '25%',
            }}
          />
          {/* Bottom Right Leaf */}
          <div 
            className="bg-[#FFFB97] shadow-[0_0_20px_rgba(255,251,151,0.5)]"
            style={{
              borderBottomRightRadius: '40%',
              borderTopLeftRadius: '10%',
              borderBottomLeftRadius: '25%',
              borderTopRightRadius: '25%',
            }}
          />
        </motion.div>
      </div>

      {/* Brand Text & Slogan Fades */}
      <div className="mt-6 flex flex-col items-center space-y-4 text-center max-w-sm px-6">
        
        {/* Evida Brand Wordmark */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.9 }}
          className="text-3xl font-bold tracking-widest text-white font-sans"
          style={{ letterSpacing: '0.15em' }}
        >
          EVIDA
        </motion.h1>

        {/* Campus Memories Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 2.1 }}
          className="text-sm font-semibold tracking-wider text-white/80 leading-relaxed font-sans"
        >
          College ends. Memories don't.
        </motion.p>

        {/* Small pulsing connecting status */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.7, 0.4, 0.7] }}
          transition={{ 
            opacity: { 
              repeat: Infinity, 
              duration: 1.5, 
              repeatType: "reverse"
            },
            default: { delay: 2.3, duration: 0.5 }
          }}
          className="text-[10px] uppercase font-bold tracking-widest text-[#FF8A4C]/85 pt-4"
        >
          Connecting your campus…
        </motion.div>
      </div>

    </div>
  );
};

export default LoadingScreen;
