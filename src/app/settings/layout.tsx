"use client";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Lock, User, Bell, Globe, Moon, ShieldAlert, Info } from "lucide-react";

import React, { useEffect, useMemo } from "react";
import { useQueryState, parseAsString } from "next-usequerystate";
import { Button } from "@/components/ui/button";

export type SettingsType = "profile" | "password" | "notification" | "language" | "theme" | "terms" | "about";

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
  const [name, setName] = useQueryState("state", {
    history: "push",
    defaultValue: "profile",
  }) as [SettingsType, (value: SettingsType) => void];

  const data = useMemo(() => {
    return [
      {
        title: "Profile",
        description: "User profile",
        icon: <User />,
        url: "profile",
      },
      {
        title: "Night mode",
        description: "Change color mode",
        url: "theme",
        icon: <Moon />,
      },
    ];
  }, []);

  return (
    <div className="lg:pl-8 pt-0">
      <div className="flex justify-between my-4">
        <Label className="text-xl font-bold font-mono">User settings</Label>
      </div>
      <div className="flex min-h-[650px]">
        <div className="bg-white dark:bg-slate-900 p-4 rounded-md flex flex-col gap-2">
          {data.map((item, index) => (
            <Button
              variant={"ghost"}
              className={cn(
                "self-stretch   rounded-lg justify-start items-center gap-4 inline-flex p-4 px-6 py-9",
                name === item.url ? "bg-slate-700" : ""
              )}
              key={index}
              onClick={() => {
                setName(item.url as SettingsType);
              }}
            >
              <div
                className={cn("w-10 h-10 relative rounded-lg", name === item.url ? "bg-primary/20" : "bg-slate-800")}
              >
                <div className="w-6 h-6 left-[8px] top-[8px] absolute">
                  {React.cloneElement(item.icon, {
                    className: cn(
                      item.icon.props.className,
                      name === item.url ? "dark:text-primary text-black" : "text-gray-400"
                    ),
                  })}
                </div>
              </div>
              <div className="flex-col justify-start items-start gap-2.5 inline-flex">
                <div className="text-zinc-900 dark:text-white text-base font-bold leading-normal">{item.title}</div>
                <div className="text-slate-500 text-sm font-normal leading-normal">{item.description}</div>
              </div>
            </Button>
          ))}
        </div>
        <div className="flex-1 bg-white dark:bg-slate-900 ml-6 rounded-md p-6">{children}</div>
      </div>
    </div>
  );
}
