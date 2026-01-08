"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import TabSwitch from "./TabSwitch";

interface Circle {
  x: number;
  y: number;
  animateY: number;
  duration: number;
}

interface CirclePair {
  cx: number;
  cy: number;
  maskPrefix: string;
  color1: string;
  color2: string;
}

interface Colors {
  color1: string;
  color2: string;
}

interface AnimatedCircleGroup {
  key: string;
  index: number;
  group: Circle;
  colors: Colors;
  dropCircle: boolean;
}

const circleGroups: Circle[] = [
  { x: 0, y: 237, animateY: 11.3096, duration: 4 },
  { x: 182, y: 201, animateY: 19.6862, duration: 5 },
  { x: 364, y: 237, animateY: 26.3589, duration: 4.5 },
  { x: 546, y: 201, animateY: 29.6501, duration: 5.5 },
];

const CirclePair = ({ cx, cy, maskPrefix, color1, color2 }: CirclePair) => (
  <>
    <circle
      mask={`url(#${maskPrefix}-r)`}
      cx={cx}
      cy={cy}
      r="90"
      fill={color1}
    />
    <mask id={`${maskPrefix}-r`}>
      <rect x={cx} y={cy - 90} width="90" height="180" fill="white" />
    </mask>
    <circle
      mask={`url(#${maskPrefix}-l)`}
      cx={cx}
      cy={cy}
      r="90"
      fill={color2}
    />
    <mask id={`${maskPrefix}-l`}>
      <rect x={cx - 90} y={cy - 90} width="90" height="180" fill="white" />
    </mask>
  </>
);

const AnimatedCircleGroup = ({
  group,
  index,
  colors,
  dropCircle,
}: AnimatedCircleGroup) => {
  return (
    <motion.g
      animate={{ y: [group.animateY, -group.animateY, group.animateY] }}
      transition={{
        duration: group.duration,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {/* Bottom circle */}
      <motion.g
        animate={{
          y: dropCircle ? 600 : 0,
        }}
        transition={{
          duration: 0.8,
          ease: dropCircle ? "easeIn" : "easeOut",
        }}
      >
        <g transform={`translate(${group.x}, ${group.y})`}>
          <CirclePair
            cx={223}
            cy={0}
            maskPrefix={`m${index}`}
            color1={colors.color1}
            color2={colors.color2}
          />
        </g>
      </motion.g>

      {/* Top circle */}
      <motion.g
        animate={{
          translateY: dropCircle ? 184 : 0,
        }}
        transition={{
          duration: 0.8,
          ease: dropCircle ? "easeIn" : "easeOut",
        }}
      >
        <g transform={`translate(${group.x}, ${group.y - 184})`}>
          <CirclePair
            cx={223}
            cy={0}
            maskPrefix={`m${index}b`}
            color1={colors.color1}
            color2={colors.color2}
          />
        </g>
      </motion.g>
    </motion.g>
  );
};

export default function BouncingCircles() {
  const [dropCircle, setDropCircle] = useState(false);

  const grayColors = { color1: "#1A88F8", color2: "#48ABFF" };
  const blueColors = { color1: "#6BCEF5", color2: "#B5E7FA" };

  return (
    <div>
      <svg
        width="986"
        height="450"
        viewBox="0 0 986 450"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto"
      >
        {/* Background rectangles */}
        <rect width="986" height="450" fill="#F7F6F6" />
        <rect width="986" height="225" fill="#FCFCFB" />

        {/* Gray circles section (bottom half) */}
        <g clipPath="url(#clip-gray)">
          {circleGroups.map((group, i) => (
            <AnimatedCircleGroup
              key={`gray-${i}`}
              group={group}
              index={i + 1}
              colors={grayColors}
              dropCircle={dropCircle}
            />
          ))}
        </g>

        {/* Light blue circles section (top half) */}
        <g clipPath="url(#clip-blue)">
          {circleGroups.map((group, i) => (
            <AnimatedCircleGroup
              key={`blue-${i}`}
              group={group}
              index={i + 5}
              colors={blueColors}
              dropCircle={dropCircle}
            />
          ))}
        </g>

        {/* Clip paths */}
        <defs>
          <clipPath id="clip-blue">
            <rect width="986" height="225" fill="white" />
          </clipPath>
          <clipPath id="clip-gray">
            <rect width="986" height="225" y="225" fill="white" />
          </clipPath>
        </defs>
      </svg>

      <TabSwitch animateState={dropCircle} setAnimateState={setDropCircle} />
    </div>
  );
}
