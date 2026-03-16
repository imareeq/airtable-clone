import { authClient } from "~/server/better-auth/client";
import AppleIcon from "./apple-icon";
import GoogleIcon from "./google-icon";
import Logo from "./logo";
import { Button } from "./ui/button";
import { Field, FieldLabel } from "./ui/field";
import { Input } from "./ui/input";
import LoginEmailForm from "./login-email-form";
import LoginSocialsButton from "./login-socials-button";
import LoginFooter from "./login-footer";

export default function LoginFormSide() {
  return (
    <div
      id="login-side"
      className="flex h-full w-full items-center justify-center md:w-1/2"
    >
      <div className="flex h-full w-full flex-col items-center justify-center gap-5 sm:w-124">
        <div className="flex w-full flex-col gap-12.5 pb-7.5">
          <Logo />
          <h1 className="text-3xl font-semibold">Sign in to Airtable</h1>
        </div>

        <LoginEmailForm />

        <span>or</span>

        <LoginSocialsButton />
        <LoginFooter />
      </div>
    </div>
  );
}
