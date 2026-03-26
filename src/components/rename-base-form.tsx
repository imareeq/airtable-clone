import { Field } from "./ui/field";
import * as z from "zod";
import { useForm } from "@tanstack/react-form";
import { api } from "~/trpc/react";
import { Input } from "./ui/input";
import { useBaseMutations } from "~/hooks/use-base-mutations";

const RenameBaseSchema = z.object({
  name: z.string().min(1, "Base name cannot be empty"),
});

export interface RenameBaseFormProps {
  baseId: string;
  baseName: string;
  className?: string;
}

export default function RenameBaseForm({
  baseId,
  baseName,
  className,
}: RenameBaseFormProps) {
  const utils = api.useUtils();

  const { updateBase } = useBaseMutations(baseId);

  const form = useForm({
    validators: {
      onSubmit: RenameBaseSchema,
    },
    defaultValues: {
      name: baseName,
    },
    onSubmit: async ({ value }) =>
      updateBase.mutate({
        baseId: baseId,
        name: value.name,
      }),
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      <form.Field
        name="name"
        children={(field) => (
          <Field>
            <Input
              id={field.name}
              name={field.name}
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              className={className}
              autoComplete="off"
            />
          </Field>
        )}
      />
    </form>
  );
}
