import FirstCard from "./FirstCard";
import FourthCard from "./FourthCard";
import MiniContent from "./MiniContent";
import SecondCard from "./SecondCard";
import ThirdCard from "./ThirdCard";

const Features = () => {
  return (
    <div className="bg-white py-20 h-[1600px]">
      <div className="w-1/2 mx-auto  grid grid-cols-2 gap-6 h-[1300px]">
        <div className="sticky top-[70px] w-[100px] h-[100px]">
          <h3 className="text-black text-[40px] font-bold w-[400px]">
            Why choose aave
          </h3>
          <p className="text-xl font-semibold text-gray-300 w-[400px]">
            Aave handles tens of billions of dollars across 12+ networks.
          </p>
        </div>
        <div className="flex flex-col gap-6">
          <FirstCard />
          <MiniContent
            heading={"$56.94B"}
            content={"Net deposits supplied across 12+ networks."}
          />
          <SecondCard />
          <MiniContent heading={"$158.69B"} content={"Volume, past 30 days."} />
          <ThirdCard />
          <MiniContent
            heading={"4.80%"}
            content={
              "Average stablecoin supply APY Ethereum network, past year."
            }
          />
          <FourthCard />
          <MiniContent
            heading={"7.66%"}
            content={
              "Average stablecoin borrow APR Ethereum network, past year."
            }
          />
        </div>
      </div>
    </div>
    // <div className="h-[2000px]">
    //   <div className="w-[75%] mx-auto  bg-gray-400 h-[1200px] ">
    //     <div className="w-[100px] h-[100px] bg-red-500 sticky top-[70px]">
    //       Sticky
    //     </div>
    //   </div>
    // </div>
  );
};

export default Features;
