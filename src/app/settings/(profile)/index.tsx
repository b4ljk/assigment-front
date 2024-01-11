"use client";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UploadCloud } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { GetProfileType, ProfileType } from "./type";
import { useMutation, useQuery } from "@tanstack/react-query";
import { changeProfile, getProfile } from "./api";
import toast from "react-hot-toast";
import { useAuthStore } from "@/lib/stores";

export default function ProfileComponent() {
  const fileInput = useRef<HTMLInputElement>(null);
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<ProfileType>();
  const authStore = useAuthStore();
  const [file, setFile] = useState<File | null>(null);
  const [image, setImage] = useState(null);

  const { data } = useQuery<GetProfileType>({
    queryKey: ["profile"],
    queryFn: async () => {
      const response = await getProfile();
      return response.data;
    },
    enabled: authStore.isLogged,
  });

  const mutation = useMutation({
    mutationFn: (data: ProfileType) => changeProfile(data),
  });

  const { mutateAsync, isPending } = mutation;

  useEffect(() => {
    if (data) {
      setValue("email", data.email || "");
      setValue("phone", data.phone || "");
    }
  }, [data]);

  const onSubmit = async (data: ProfileType) => {
    toast.promise(mutateAsync(data), {
      loading: "Saving...",
      success: "Saved!",
      error: (err) => {
        return (err as any).response?.data?.message || "Something went wrong";
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex justify-between items-center">
        <Label className="text-2xl font-bold">Profile</Label>
        <Button type="submit" loading={isPending}>
          Save
        </Button>
      </div>
      <div className="flex items-center gap-6">
        <Avatar className="w-36 h-36 mt-6">
          <AvatarImage src={"https://github.com/shadcn.png"} alt="@shadcn" />
          <AvatarFallback>PFP</AvatarFallback>
        </Avatar>
        <div className="h-full flex flex-col gap-4 justify-around">
          <p className="text-xl font-bold">Profile picture</p>
          <div className="flex items-center">
            <Button
              onClick={() => {
                fileInput.current?.click();
              }}
              variant="outline"
              className="flex items-center border-primary bg-white dark:bg-slate-800 px-6 gap-2 py-2"
            >
              <UploadCloud className="text-primary" />
              <p className="text-primary">Change</p>
            </Button>
            <input
              ref={fileInput}
              type="file"
              className="hidden"
              accept="image/*"
              onChange={(e) => {
                if (e.target.files) {
                  if (!e.target.files[0]) return;
                  setFile(e.target.files[0]);
                  setImage(URL.createObjectURL(e.target.files[0]) as any);
                }
              }}
            />
            <Button variant={"ghost"}>Delete</Button>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-8 mt-10">
        <div>
          <Label className="text-muted-foreground">Email</Label>
          <Input
            type="email"
            className="w-full mt-2"
            {...register("email", {
              required: "Email is required",
            })}
          />
          <p className="text-sm font-bold text-red-600">{errors.email?.message}</p>
        </div>
        <div>
          <Label className="text-muted-foreground">Phone</Label>
          <Input
            type="tel"
            className="w-full mt-2"
            {...register("phone", {
              required: "Phone is required",
            })}
          />
          <p className="text-sm font-bold text-red-600">{errors.phone?.message}</p>
        </div>
      </div>
    </form>
  );
}
