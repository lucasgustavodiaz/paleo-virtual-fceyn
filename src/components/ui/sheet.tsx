"use client";

import { Dialog } from "@base-ui/react/dialog";
import { X } from "lucide-react";

import { cn } from "@/lib/utils";

function Sheet(props: Dialog.Root.Props) {
  return <Dialog.Root {...props} />;
}

function SheetTrigger(props: Dialog.Trigger.Props) {
  return <Dialog.Trigger {...props} />;
}

function SheetPortal(props: Dialog.Portal.Props) {
  return <Dialog.Portal {...props} />;
}

function SheetBackdrop({ className, ...props }: Dialog.Backdrop.Props) {
  return (
    <Dialog.Backdrop
      className={cn(
        "bg-background/70 fixed inset-0 z-50 backdrop-blur-sm",
        className,
      )}
      {...props}
    />
  );
}

function SheetContent({ className, children, ...props }: Dialog.Popup.Props) {
  return (
    <SheetPortal>
      <SheetBackdrop />
      <Dialog.Popup
        className={cn(
          "ring-primary/20 bg-background/96 fixed top-0 right-0 z-50 flex h-dvh w-[min(22rem,calc(100vw-2rem))] flex-col border-l border-[var(--paleo-border)] p-6 shadow-2xl ring-1 backdrop-blur-xl outline-none",
          className,
        )}
        {...props}
      >
        {children}
        <Dialog.Close className="hover:bg-primary/10 hover:text-primary focus-visible:ring-ring text-muted-foreground absolute top-4 right-4 inline-flex size-9 items-center justify-center rounded-full transition focus-visible:ring-2 focus-visible:outline-none">
          <X aria-hidden="true" className="size-4" />
          <span className="sr-only">Cerrar menú</span>
        </Dialog.Close>
      </Dialog.Popup>
    </SheetPortal>
  );
}

function SheetHeader({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("space-y-2 pr-10", className)} {...props} />;
}

function SheetTitle({ className, ...props }: Dialog.Title.Props) {
  return (
    <Dialog.Title
      className={cn(
        "text-foreground text-lg font-semibold tracking-tight",
        className,
      )}
      {...props}
    />
  );
}

function SheetDescription({ className, ...props }: Dialog.Description.Props) {
  return (
    <Dialog.Description
      className={cn("text-muted-foreground text-sm leading-6", className)}
      {...props}
    />
  );
}

export {
  Sheet,
  SheetBackdrop,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetPortal,
  SheetTitle,
  SheetTrigger,
};
