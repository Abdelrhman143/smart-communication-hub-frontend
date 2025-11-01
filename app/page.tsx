// Home page - Landing page with hero section, login/register box, and features showcase
import HeroInfo from "./_components/HeroInfo";
import LoginBox from "./_components/LoginBox";
import Features from "./_components/Features";

// Main home page component - renders hero info, login/register box, and features
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
