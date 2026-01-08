import FirstAnimation from "./animatedObjects/FirstAnimation";
import FourthAnimation from "./animatedObjects/FourthAnimation";
import SecondAnimation from "./animatedObjects/SecondAnimation";
import ThirdAnimation from "./animatedObjects/ThirdAnimation";
import Card from "./Card";

const LastAd = () => {
  return (
    <div className="bg-white py-20">
      <h3 className="text-[40px] font-bold text-black w-1/2 mx-auto mb-12">
        Your money, your choice.
      </h3>
      <div className="w-1/2 mx-auto grid grid-cols-2 gap-12">
        {/* 1st row */}
        <Card title={"Earn"} content={"Earn interest lending out assets."}>
          <FirstAnimation />
        </Card>
        <Card
          title={"Swap"}
          content={"Swap assets, even those borrowed or supplied."}
          move={"10px"}
        >
          <SecondAnimation />
        </Card>
        {/* 2nd row */}
        <Card
          title={"Save"}
          content={"Save and earn yield with Aave's native stablecoin GHO."}
        >
          <ThirdAnimation />
        </Card>
        <Card
          move={"-30px"}
          title={"Health Factor"}
          content={"Easily track your loans."}
        >
          <FourthAnimation />
        </Card>
      </div>
    </div>
  );
};

export default LastAd;
