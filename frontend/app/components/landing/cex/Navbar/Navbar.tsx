import Link from "next/link";

const Navbar = () => {
  return (
    <div className="bg-white ">
      <div className="w-1/2 py-10  mx-auto text-black flex justify-between border-b border-b-gray-300">
        <div>xCEX</div>
        <div className="flex gap-2 text-sm">
          <div>
            <Link href={"/markets"}>Markets</Link>
          </div>
          <div>Developers</div>
          <div>Resources</div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
