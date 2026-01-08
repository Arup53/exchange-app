"use client";
import { motion } from "motion/react";

const pills = [
  { id: 1, x: 165, y: 58, animateY: -8.87957, duration: 4 },
  { id: 2, x: 101, y: 122, animateY: -1.98464, duration: 5 },
  { id: 3, x: 229, y: 122, animateY: -4.28805, duration: 4.5 },
  { id: 4, x: 37, y: 186, animateY: -3.05807, duration: 5.5 },
  { id: 5, x: 165, y: 186, animateY: -6.81876, duration: 4.8 },
  { id: 6, x: 293, y: 186, animateY: -5.57382, duration: 5.2 },
];

const Pill = ({ x, y, clipId }) => (
  <g clipPath={`url(#${clipId})`}>
    <rect x={x} y={y} width="128" height="256" rx="64" fill="white" />
    <rect x={x} y={y} width="128" height="256" fill="#E2E0FF" />
    <rect x={x} y={y} width="64" height="256" fill="#9896FF" />
  </g>
);

const AnimatedPill = ({ pill }) => (
  <motion.g
    animate={{ y: [pill.animateY, -pill.animateY, pill.animateY] }}
    transition={{
      duration: pill.duration,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  >
    <Pill x={pill.x} y={pill.y} clipId={`clip${pill.id}`} />
  </motion.g>
);

export default function FirstCard() {
  return (
    <div>
      <svg
        width="457"
        height="250"
        viewBox="0 0 457 250"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto"
      >
        <g>
          <g>
            {/* Background rounded rectangle */}
            <path
              d="M0 16C0 7.16345 7.16344 0 16 0H441C449.837 0 457 7.16345 457 16V234C457 242.837 449.837 250 441 250H16C7.16344 250 0 242.837 0 234V16Z"
              fill="#9896FF"
            />

            {/* Left half overlay */}
            <rect width="229" height="250" fill="#BCBBFF" />

            {/* Animated pills */}
            {pills.map((pill) => (
              <AnimatedPill key={pill.id} pill={pill} />
            ))}
          </g>
        </g>

        {/* Clip paths */}
        <defs>
          <clipPath id="clip0">
            <path
              d="M0 16C0 7.16345 7.16344 0 16 0H441C449.837 0 457 7.16345 457 16V234C457 242.837 449.837 250 441 250H16C7.16344 250 0 242.837 0 234V16Z"
              fill="white"
            />
          </clipPath>
          {pills.map((pill) => (
            <clipPath key={`clip${pill.id}`} id={`clip${pill.id}`}>
              <rect
                x={pill.x}
                y={pill.y}
                width="128"
                height="256"
                rx="64"
                fill="white"
              />
            </clipPath>
          ))}
        </defs>
      </svg>
    </div>
  );
}
