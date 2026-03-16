import { Button } from "./ui/button";
import { Field, FieldLabel } from "./ui/field";
import { Input } from "./ui/input";

export default function LoginEmailForm() {
  return (
    <form className="flex w-full flex-col gap-6">
      <Field>
        <FieldLabel htmlFor="input-email" className="text-sm">
          Email
        </FieldLabel>
        <Input
          className="text-sm placeholder:text-sm"
          id="input-email"
          type="email"
          placeholder="Email address"
        />
      </Field>
      <Button className="w-full">Continue</Button>
    </form>
  );
}
