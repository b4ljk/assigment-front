"use client";
import { Label } from "@/components/ui/label";
import { parseAsBoolean, useQueryState } from "next-usequerystate";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { SettingsType } from "./layout";
import ProfileComponent from "./(profile)";
import { useCallback } from "react";
import ThemeComponent from "./(theme)";
import { GreetingComponent } from "./(profile)/greeting";

export default function SettingsPage() {
  const [name, setName] = useQueryState("state") as [SettingsType, (value: SettingsType) => void];
  const [firstLogin, setFirstLogin] = useQueryState("firstlogin", parseAsBoolean.withDefault(false));

  const [parent] = useAutoAnimate();

  const data = useCallback((name: SettingsType) => {
    switch (name) {
      case "profile":
        return <ProfileComponent />;
      case "theme":
        return <ThemeComponent />;
      default:
        return <ProfileComponent />;
    }
  }, []);

  return (
    <div ref={parent} className="max-w-screen-2xl">
      {data(name)}
      <GreetingComponent setOpen={setFirstLogin} open={firstLogin} />
    </div>
  );
}
