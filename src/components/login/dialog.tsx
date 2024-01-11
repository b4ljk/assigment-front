import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Wallet, Wallet2 } from "lucide-react";
import Image from "next/image";
import { signInWithMetamask } from "./api";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export function LoginDialog() {
  const router = useRouter();
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="font-mono font-bold">CONNECT WALLET</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[450px] p-12">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Wallet />
            <p className="font-mono text-2xl font-bold">CONNECT WALLET</p>
          </DialogTitle>
          <DialogDescription>Please choose a wallet to connect.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Button
            className="dark:bg-white py-6 gap-3 justify-start px-12 font-mono font-bold"
            onClick={async () => {
              await signInWithMetamask().then((isFirstlogin: boolean) => {
                router.push(`/settings?firstlogin=${isFirstlogin}`);
              });
            }}
          >
            <Image src="/metamask.svg" width={36} height={36} alt="metamask icon" />
            METAMASK
          </Button>
          <Button className="dark:bg-white py-6 gap-3 justify-start px-12 font-mono font-bold">
            <Image src="/coinbase.svg" width={36} height={36} alt="metamask icon" />
            COINBASE WALLET
          </Button>
          <Button className="dark:bg-white py-6 gap-3 justify-start px-12 font-mono font-bold">
            <Wallet2 strokeWidth={3} size={36} />
            WALLET CONNECT
          </Button>
        </div>
        <DialogFooter>
          <p className="text-muted-foreground text-center text-sm">
            By using Clrfl, you agree to our Terms of Service and our Privacy Policy.
          </p>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
