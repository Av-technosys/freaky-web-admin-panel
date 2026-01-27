import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import Logo from "../assets/freakychimplogo.png";
import { useUserLoginMutation } from "../services/useUserLogin";

const EmailPasswordLogin = () => {
  const mutation = useUserLoginMutation();

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;

    const userData = {
      email: (form.email as HTMLInputElement).value,
      password: (form.password as HTMLInputElement).value,
    };

    mutation.mutate(userData);
    form.reset();
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <Card className="w-full max-w-[420px] border-none shadow-lg rounded-2xl">
        {/* Header */}
        <CardHeader className="space-y-3 pb-6">
          <CardTitle className="flex justify-center">
            <img src={Logo} alt="freaky-logo" className="w-28" />
          </CardTitle>

          <div className="text-center space-y-1">
            <h1 className="text-xl font-bold">Sign In</h1>
            <CardDescription className="text-xs text-muted-foreground">
              Enter your email below to login to your account
            </CardDescription>
          </div>
        </CardHeader>

        {/* Form */}
        <CardContent className="px-6">
          <form onSubmit={submitHandler} className="space-y-5">
            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" required />
            </div>

            <div className="space-y-1">
              <Label htmlFor="password">Password</Label>
              <Input id="password" name="password" type="password" required />
            </div>

            <Button
              type="submit"
              size="lg"
              className="w-full rounded-full bg-[#ff5722] font-semibold hover:bg-[#ff845e]"
              disabled={mutation.isPending}
            >
              {mutation.isPending ? "Signing in..." : "Sign in"}
            </Button>
          </form>
        </CardContent>

        {/* Footer */}
        <CardFooter className="flex flex-col gap-3 pt-4 pb-6">
          <p className="text-center text-[11px] text-muted-foreground leading-relaxed">
            By continuing, you agree to the Terms of Use and Privacy Policy.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default EmailPasswordLogin;
