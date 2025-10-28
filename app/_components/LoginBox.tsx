import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
export default function LoginBox() {
  return (
    <div className="bg-white mt-5 lg:mt-0  p-5 border-gray-100 border-2 basis-1/3 rounded-lg shadow-lg animate-slideLeft">
      <div>
        <h2 className="font-semibold text-2xl">Get Started</h2>
        <p className="text-gray-500 mt-2 mb-5">
          Sign in or create an account to start chatting
        </p>
      </div>
      <Tabs defaultValue="login" className="w-full">
        <TabsList className="w-full">
          <TabsTrigger className="cursor-pointer" value="login">
            Login
          </TabsTrigger>
          <TabsTrigger className="cursor-pointer" value="register">
            Register
          </TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <LoginForm />
        </TabsContent>
        <TabsContent value="register">
          <RegisterForm />
        </TabsContent>
      </Tabs>
    </div>
  );
}
