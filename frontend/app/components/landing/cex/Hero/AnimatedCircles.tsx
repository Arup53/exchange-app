import { motion } from "motion/react";
import { useState } from "react";

const circles = [
  {
    id: 1,
    x: 0,
    y: 220,
    stroke: "#D9F7FF",
    fill1: "#39D1F9",
    fill2: "#A7E9FD",
    initialRotation: 1,
  },
  {
    id: 2,
    x: 152,
    y: 210,
    stroke: "#FFF7A5",
    fill1: "#FFB000",
    fill2: "#FFD400",
    initialRotation: 0,
  },
  {
    id: 3,
    x: 304,
    y: 190,
    stroke: "#83EEE8",
    fill1: "#00827B",
    fill2: "#39BEB7",
    initialRotation: 0,
  },
  {
    id: 4,
    x: 456,
    y: 170,
    stroke: "#96E9FF",
    fill1: "#008AFF",
    fill2: "#00AEFF",
    initialRotation: 0,
  },
  {
    id: 5,
    x: 608,
    y: 120,
    stroke: "#FFC693",
    fill1: "#F24900",
    fill2: "#FF8947",
    initialRotation: 0,
  },
  {
    id: 6,
    x: 760,
    y: 60,
    stroke: "#E2E0FF",
    fill1: "#9896FF",
    fill2: "#BDBBFF",
    initialRotation: 0,
  },
];

function Circle({ circle, index }) {
  const [rotation, setRotation] = useState(circle.initialRotation);

  const handleHover = () => {
    // Generate random rotation between -45 and 45 degrees
    const randomRotation = Math.floor(Math.random() * 180) - 45;
    setRotation(randomRotation);
  };

  return (
    <motion.g
      opacity="1"
      initial={{ y: 500, x: circle.x }} // start at translateY(0)
      animate={{ y: circle.y, x: circle.x }} // animate to final x, y
      transition={{
        duration: 1.2,
        ease: "easeOut",
      }}
      style={{
        transformOrigin: "75px 227.25px",
      }}
      onHoverStart={handleHover}
    >
      <g transform="scale(1.5)">
        <path
          d="M50 50L50 303"
          stroke={circle.stroke}
          strokeWidth="100"
          strokeLinecap="round"
        />
        <mask
          id={`mask0_circle${circle.id}`}
          style={{ maskType: "alpha" }}
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="100"
          height="100"
        >
          <circle cx="50" cy="50" r="50" fill="#D9D9D9" />
        </mask>
        <g mask={`url(#mask0_circle${circle.id})`}>
          <g>
            <motion.g
              style={{
                transformOrigin: "50px 50px",
              }}
              animate={{ rotate: rotation }}
              transition={{
                type: "spring",
                stiffness: 80,
                damping: 30,
              }}
            >
              <rect width="100" height="100" fill={circle.fill1} />
              <rect width="50" height="100" fill={circle.fill2} />
              <mask
                id={`mask1_circle${circle.id}`}
                style={{ maskType: "alpha" }}
                maskUnits="userSpaceOnUse"
                x="25"
                y="25"
                width="50"
                height="50"
              >
                <circle cx="50" cy="50" r="25" fill="#D9D9D9" />
              </mask>
              <g mask={`url(#mask1_circle${circle.id})`}>
                <rect
                  x="25"
                  y="25"
                  width="50"
                  height="50"
                  fill={circle.fill1}
                />
                <rect
                  x="50"
                  y="25"
                  width="25"
                  height="50"
                  fill={circle.fill2}
                />
              </g>
            </motion.g>
          </g>
        </g>
      </g>
    </motion.g>
  );
}

export default function AnimatedCircles() {
  return (
    <div className="  ">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="985"
        height="438"
        fill="none"
        viewBox="0 0 985 438"
        style={{ pointerEvents: "auto", cursor: "pointer" }}
      >
        <g clipPath="url(#hero-animation-mask)">
          <g transform="scale(1.08)">
            <g opacity="1">
              {circles.map((circle, index) => (
                <Circle key={circle.id} circle={circle} index={index} />
              ))}
            </g>
          </g>
        </g>
        <defs>
          <clipPath id="hero-animation-mask">
            <rect width="1185" height="1438" x="-100" y="-1000" fill="#fff" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}
