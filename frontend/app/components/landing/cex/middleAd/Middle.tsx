import BouncingCircles from "./BouncingCircles";
import TabSwitch from "./TabSwitch";

const Middle = () => {
  return (
    <div className="bg-white">
      <div className="w-1/2 mx-auto border-t border-gray-200 pt-20">
        <div className="flex flex-col justify-center items-center ">
          <h2 className="text-[40px] text-black font-bold">Meet Aave.</h2>
          <p className="text-xl text-gray-500 mt-2 font-medium">
            Earn interest. Borrow when you need. 24/7
          </p>
        </div>
        <div className="mt-10">
          <BouncingCircles />
        </div>
      </div>
    </div>
  );
};

export default Middle;
