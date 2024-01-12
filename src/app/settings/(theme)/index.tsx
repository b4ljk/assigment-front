import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import { ModeToggle } from "./toggler";

export default function ThemeComponent() {
  return (
    <div>
      <Label className="text-2xl font-bold">Night mode</Label>
      <div className="flex gap-12 mt-8 font-medium items-center">
        <p>Night mode</p>
        <ModeToggle />
      </div>
    </div>
  );
}
