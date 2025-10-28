import HeroInfo from "./_components/HeroInfo";
import LoginBox from "./_components/LoginBox";
import Features from "./_components/Features";

export default function Home() {
  return (
    <div>
      <div className="flex-col lg:flex lg:flex-row lg:text-left text-center items-center justify-center min-h-screen gap-2">
        <HeroInfo />
        <LoginBox />
      </div>
      <Features />
    </div>
  );
}
