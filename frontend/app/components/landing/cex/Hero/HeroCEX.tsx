"use client";
import { motion } from "motion/react";
import AnimatedCircles from "./AnimatedCircles";
import { LiaArrowRightSolid } from "react-icons/lia";

const HeroCEX = () => {
  return (
    <div className=" bg-white h-[100vh] py-20">
      <div className="w-[985px] mx-auto text-black space-y-6">
        {/* ad banner */}
        <div className="w-[360px] px-3 py-2 rounded-full text-xs bg-[#F7F6F6] flex  item-center gap-2  ">
          <span className="font-medium">
            The Horizon RWA market is live on Aave
          </span>
          <span>Learn More</span>
          <span className="text-base font-light">
            <LiaArrowRightSolid />
          </span>
        </div>
        <div>
          <h1 className="text-5xl font-bold ">
            DeFi's largest lending network.
          </h1>
        </div>
        <div>
          <p className="text-xl text-gray-500">
            Earn, borrow, save, and swap with millions of users.
          </p>
        </div>
      </div>
      <div className="flex flex-col items-center gap-0.5 text-black">
        <AnimatedCircles />
        <motion.div
          className="styles_hero_circle_platform"
          initial={{ scaleX: 0.2 }}
          animate={{ scaleX: 1 }}
          transition={{
            duration: 0.5,
            ease: "easeOut",
          }}
        />
      </div>
    </div>
  );
};

export default HeroCEX;
