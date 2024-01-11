"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import Image from "next/image";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Button } from "../ui/button";
import Icon from "../icon";
import { Menu } from "lucide-react";
import { LoginDialog } from "./dialog";
import { MetaMaskProvider } from "@metamask/sdk-react";
import { useAuthStore } from "@/lib/stores";
import LogoutComponent from "./log-out";

const Header = () => {
  const [opened, setOpened] = useState(false);
  const { isLogged } = useAuthStore();

  return (
    <header className="sticky inset-x-0 top-0 z-50 border-b border-b-gray-200 backdrop-blur-md bg-white dark:bg-black dark:border-b-slate-700 bg-opacity-25">
      <nav className="flex items-center justify-between px-6 py-4 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <Link href="/">
            <div className="-m-1.5 p-1.5">
              <h1 className="font-mono font-black text-xl text-primary uppercase">vitae</h1>
            </div>
          </Link>
        </div>
        <div className="hidden lg:flex gap-5">
          <Link href="#" className="font-bold">
            Features
          </Link>
          <Link href="#" className="font-bold">
            Team
          </Link>
          <Link href="#" className="font-bold">
            Discord
          </Link>
          <Link href="#" className="font-bold">
            Articles
          </Link>
        </div>
        <div className="flex lg:hidden">
          <Button variant="outline" onClick={() => setOpened(true)}>
            <Menu />
          </Button>
        </div>

        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          {!isLogged ? <LoginDialog /> : <LogoutComponent />}
        </div>
      </nav>
      {/* mobile */}
      <Dialog open={opened} onOpenChange={setOpened}>
        <DialogContent>
          <div className="flex flex-col justify-center h-full px-4 pt-6 pb-10 overflow-y-auto bg-white dark:bg-slate-700">
            <div className="flex gap-5">
              <Link href="#" className="font-bold">
                Features
              </Link>
              <Link href="#" className="font-bold">
                Team
              </Link>
              <Link href="#" className="font-bold">
                Discord
              </Link>
              <Link href="#" className="font-bold">
                Articles
              </Link>
            </div>
            <div className=" pt-4 border-t w-full border-t-gray-200 mt-4">
              {!isLogged ? <LoginDialog /> : <LogoutComponent />}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </header>
  );
};

export default Header;
