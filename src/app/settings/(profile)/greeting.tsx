import * as React from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMediaQuery } from "@/lib/hooks/use-media-query";
import { Zap } from "lucide-react";

export function GreetingComponent({
  open = false,
  setOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[650px]">
          <DialogHeader></DialogHeader>
          <ProfileForm />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerContent>
        <DrawerHeader className="text-left"></DrawerHeader>
        <ProfileForm className="px-4" />
        <DrawerFooter className="pt-2"></DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

function ProfileForm({ className }: React.ComponentProps<"form">) {
  return (
    <form className={cn("grid items-start gap-4 p-6", className)}>
      <div className="flex justify-center items-center mb-8">
        <div className="bg-gradient-to-r from-cyan-400 to-red-400 rounded-full p-3">
          <Zap size={110} className="text-white" />
        </div>
      </div>
      <div className="space-y-8 mb-8">
        <h1 className="text-center text-4xl font-black">
          Welcome to <span className="uppercase text-primary font-mono">vitae</span>
        </h1>
        <p>By connecting your wallet and using OpenSea, you agree to our Terms of Service and Privacy Policy.</p>
      </div>
      <div className="flex gap-4 ">
        <Button className="w-full" variant={"secondary"}>
          Cancel{" "}
        </Button>
        <Button className="w-full" type="submit">
          Accept and sign
        </Button>
      </div>
    </form>
  );
}
