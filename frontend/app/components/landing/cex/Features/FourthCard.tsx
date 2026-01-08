"use client";
import { motion } from "framer-motion";

const FourthCard = () => {
  return (
    <svg
      width="457"
      height="250"
      viewBox="0 0 457 250"
      className="w-full h-auto"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Background Rectangle */}
      <rect
        width="457"
        height="250"
        fill="#48ABFF"
        style={{ fill: "color(display-p3 0.2824 0.6706 1.0000)" }}
      />

      {/* Rotated Group */}
      <motion.g
        animate={{ rotate: [0, -22, 22, 0] }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          transformOrigin: "228.5px 0px",
        }}
      >
        {/* Outer Circles */}
        <g style={{ transformOrigin: "228.5px 0px" }}>
          <circle
            mask="url(#borrow-circle-outer-mask-1)"
            cx="228.5"
            r="228.5"
            fill="#A9E7FF"
            style={{ fill: "color(display-p3 0.6628 0.9060 1.0000)" }}
          />
          <mask id="borrow-circle-outer-mask-1">
            <rect
              x="228.5"
              y="-228.5"
              width="228.5"
              height="457"
              fill="white"
            />
          </mask>

          <circle
            mask="url(#borrow-circle-outer-mask-2)"
            cx="228.5"
            r="228.5"
            fill="#1A88F8"
            style={{ fill: "color(display-p3 0.1020 0.5333 0.9725)" }}
          />
          <mask id="borrow-circle-outer-mask-2">
            <rect x="0" y="-228.5" width="228.5" height="457" fill="white" />
          </mask>

          {/* Inner Circles */}
          <g style={{ transformOrigin: "228.5px 0px" }}>
            <circle
              mask="url(#borrow-circle-inner-mask-1)"
              cx="228.5"
              r="114"
              fill="#A9E7FF"
              style={{ fill: "color(display-p3 0.6628 0.9060 1.0000)" }}
            />
            <mask id="borrow-circle-inner-mask-1">
              <rect x="114.5" y="-114" width="114" height="228" fill="white" />
            </mask>

            <circle
              mask="url(#borrow-circle-inner-mask-2)"
              cx="228.5"
              r="114"
              fill="#1A88F8"
              style={{ fill: "color(display-p3 0.1020 0.5333 0.9725)" }}
            />
            <mask id="borrow-circle-inner-mask-2">
              <rect x="228.5" y="-114" width="114" height="228" fill="white" />
            </mask>
          </g>
        </g>
      </motion.g>
    </svg>
  );
};

export default FourthCard;
