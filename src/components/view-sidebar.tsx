import { Sidebar } from "./ui/sidebar";

export function ViewSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
    return (
      <Sidebar className="bg-background top-12 h-[calc(100svh-var(--header-height))]!">

      </Sidebar>
    )
}
