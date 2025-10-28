import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
export default function LoginForm() {
  return (
    <form action="">
      <Input type="email" placeholder="Email" className="bg-gray-50 mt-5" />
      <Input
        type="password"
        placeholder="Password"
        className="bg-gray-50 mt-5"
      />
      <Button className="mt-5 w-full bg-MainColor cursor-pointer hover:bg-MainColor/95">
        Login
      </Button>
    </form>
  );
}
