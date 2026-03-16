import { authClient } from "~/server/better-auth/client";
import AppleIcon from "./apple-icon";
import GoogleIcon from "./google-icon";
import { Button } from "./ui/button";

export default function LoginSocialsButton() {
  return (
    <div className="flex w-full flex-col gap-3">
      <Button variant="outline" className="w-full">
        Sign in with <span className="font-semibold">Single Sign On</span>
      </Button>
      <Button
        className="w-full"
        variant="outline"
        onClick={async () => {
          const res = await authClient.signIn.social({
            provider: "google",
            callbackURL: "/",
          });
        }}
      >
        <GoogleIcon />
        <p>
          Continue with <span className="font-semibold">Google</span>
        </p>
      </Button>
      <Button variant="outline" className="w-full">
        <AppleIcon />{" "}
        <p>
          Continue with <span className="font-semibold">Apple ID</span>
        </p>
      </Button>
    </div>
  );
}
