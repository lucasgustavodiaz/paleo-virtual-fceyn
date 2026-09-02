import { cn } from "@/lib/utils";

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn(
        "from-secondary via-primary/15 to-secondary animate-pulse rounded-xl bg-gradient-to-r",
        className,
      )}
      {...props}
    />
  );
}

export { Skeleton };
