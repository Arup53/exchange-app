import Image from "next/image";
import { Markets } from "./components/Markets";
import { Landing } from "./components/landing/Landing";

export default function Home() {
  return (
    <main className="min-h-screen">
      <div className=" bg-white">
        <Landing />
      </div>
    </main>
  );
}
