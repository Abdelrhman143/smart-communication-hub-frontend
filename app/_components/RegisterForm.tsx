import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function RegisterForm() {
  return (
    <div>
      {" "}
      <form action="">
        <Input
          name="email"
          type="email"
          placeholder="Email"
          className="bg-gray-50 mt-5"
        />
        <Input
          name="password"
          type="password"
          placeholder="Password"
          className="bg-gray-50 mt-5"
        />
        <Input
          name="confirm_password"
          type="password"
          placeholder="Confirm Password"
          className="bg-gray-50 mt-5"
        />
        <Button className="mt-5 w-full bg-MainColor cursor-pointer hover:bg-MainColor/95">
          Register
        </Button>
      </form>
    </div>
  );
}
