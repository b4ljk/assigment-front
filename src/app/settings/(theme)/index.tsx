import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export default function ThemeComponent() {
  return (
    <div>
      <Label className="text-2xl font-bold">Night mode</Label>
      <div className="flex gap-12 mt-8 font-medium">
        <p>Night mode</p>
        <Switch checked={true} />
      </div>
    </div>
  );
}
