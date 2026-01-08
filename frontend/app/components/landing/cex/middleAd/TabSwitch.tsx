import { motion } from "motion/react";
import { useState } from "react";

const TabSwitch = ({ animateState, setAnimateState }) => {
  const [switchTab, setSwitchTab] = useState(false);

  const handleSwitch = () => {
    setSwitchTab(!switchTab);
    setAnimateState(!animateState);
  };
  return (
    <div className="mt-3 ">
      <motion.div
        className="grid  gap-12 "
        animate={{
          gridTemplateColumns: switchTab ? "4fr 6fr" : "6fr 4fr",
        }}
        transition={{
          duration: 0.6,
          ease: "easeInOut",
        }}
      >
        {/* left */}
        <motion.div
          className="border-t-2 flex flex-col gap-3 pt-6  cursor-pointer"
          onClick={handleSwitch}
          animate={{
            borderColor: switchTab ? "#8f8e8e" : "#008aff",
            color: switchTab ? "#8f8e8e" : "#008aff",
          }}
        >
          <h3 className="text-2xl font-bold ">Supply</h3>
          <motion.p
            animate={{
              opacity: switchTab ? 0 : 1,
            }}
            transition={{ duration: 0.5, ease: "easeIn" }}
            className="text-sm text-[#8f8e8e] w-96"
          >
            Earn interest by supplying assets to the lending network.
          </motion.p>
        </motion.div>
        {/* right */}
        <motion.div
          className="border-t-2 flex flex-col gap-3 pt-6 cursor-pointer "
          onClick={handleSwitch}
          animate={{
            borderColor: switchTab ? "#008aff" : "#8f8e8e",
            color: switchTab ? "#008aff" : "#8f8e8e",
          }}
        >
          <h3 className="text-2xl font-bold ">Borrow</h3>
          <motion.p
            animate={{
              opacity: switchTab ? 1 : 0,
            }}
            transition={{ duration: 0.5, ease: "easeIn" }}
            className="text-sm text-[#8f8e8e] w-96"
          >
            Borrow against your collateral from across multiple networks and
            assets.
          </motion.p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default TabSwitch;
