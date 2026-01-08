"use client";
import { motion } from "motion/react";

const HalfCircleGroup = ({ baseX, y, isTop, colors }) => (
  <g>
    <circle cx={baseX + 62.5} cy={y} r="62.5" fill={colors.circle} />
    <path
      d={
        isTop
          ? `M${baseX + 63} 0C${baseX + 97.5} 0 ${baseX + 125.5} 27.98 ${
              baseX + 125.5
            } 62.5C${baseX + 125.5} 97.02 ${baseX + 97.5} 125 ${
              baseX + 63
            } 125L${baseX + 63} 0Z`
          : `M${baseX + 63} 125C${baseX + 28.48} 125 ${baseX + 0.5} 152.98 ${
              baseX + 0.5
            } 187.5C${baseX + 0.5} 222.02 ${baseX + 28.48} 250 ${
              baseX + 63
            } 250L${baseX + 63} 125Z`
      }
      fill={colors.halfCircle}
    />
  </g>
);

export default function SecondCard() {
  const darkTeal = "#1F807B";
  const mediumTeal = "#63BBB6";
  const lightTeal = "#9DEBE7";

  return (
    <div className="w-full overflow-hidden">
      <svg
        width="457"
        height="250"
        viewBox="545 0 457 250"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto"
      >
        {/* Full background */}
        <rect x="0" y="0" width="400%" height="100%" fill={mediumTeal} />

        {/* Top section (animated right) */}
        <motion.g
          animate={{ x: [0, 705, 705] }}
          transition={{
            duration: 6,
            times: [0, 0.5, 1],
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {/* Rectangles */}
          <rect x="771" width="770" height="125" fill={darkTeal} />
          <rect x="63" width="354" height="125" fill={darkTeal} />
          <rect
            width="354"
            height="125"
            transform="matrix(-1 0 0 1 771 0)"
            fill={mediumTeal}
          />

          {/* Half circles - Top row */}
          <HalfCircleGroup
            baseX={708.5}
            y={62.5}
            isTop={true}
            colors={{ circle: darkTeal, halfCircle: lightTeal }}
          />
          <HalfCircleGroup
            baseX={354.5}
            y={62.5}
            isTop={true}
            colors={{ circle: lightTeal, halfCircle: darkTeal }}
          />
          <HalfCircleGroup
            baseX={0.5}
            y={62.5}
            isTop={true}
            colors={{ circle: darkTeal, halfCircle: lightTeal }}
          />
        </motion.g>

        {/* Bottom section (animated left) */}
        <motion.g
          animate={{ x: [0, -711.5, -711.5] }}
          transition={{
            duration: 6,
            times: [0, 0.5, 1],
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {/* Rectangles */}
          <rect
            width="354"
            height="125"
            transform="matrix(-1 0 0 1 1125 125)"
            fill={mediumTeal}
          />
          <rect
            width="770"
            height="125"
            transform="matrix(-1 0 0 1 771 125)"
            fill={darkTeal}
          />
          <rect
            width="354"
            height="125"
            transform="matrix(-1 0 0 1 1479 125)"
            fill={darkTeal}
          />

          {/* Half circles - Bottom row */}
          <HalfCircleGroup
            baseX={708.5}
            y={187.5}
            isTop={false}
            colors={{ circle: darkTeal, halfCircle: lightTeal }}
          />
          <HalfCircleGroup
            baseX={1062.5}
            y={187.5}
            isTop={false}
            colors={{ circle: lightTeal, halfCircle: darkTeal }}
          />
          <HalfCircleGroup
            baseX={1416.5}
            y={187.5}
            isTop={false}
            colors={{ circle: darkTeal, halfCircle: lightTeal }}
          />
        </motion.g>
      </svg>
    </div>
  );
}
