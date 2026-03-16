export default function LoginFooter() {
  return (
    <div className="text-muted-foreground flex w-full flex-col gap-5 pt-15 text-xs font-light">
      <p>
        New to Airtable?{" "}
        <a href="#" className="underline text-primary">
          Create an account
        </a>{" "}
        instead
      </p>
      <p>
        Manage your cookie preferences{" "}
        <a href="#" className="underline text-primary">
          here
        </a>
      </p>
    </div>
  );
}
