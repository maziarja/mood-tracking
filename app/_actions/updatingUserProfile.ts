"use server";

import { auth } from "@/config/auth";
import cloudinary from "@/config/cloudinary";
import User from "@/models/user";
import { revalidatePath } from "next/cache";

export async function updatingUserProfile(formData: FormData) {
  const session = await auth();

  const imageFile = formData.get("image") as File;
  const name = formData.get("name");

  if (imageFile.name === "undefined") {
    if (session && session.user) {
      await User.findByIdAndUpdate(session.user.id, {
        name,
      });
    }
    revalidatePath("/");
    return { success: true };
  }

  // Delete last profile picture from cloudinary
  const user = await User.findById(session?.user && session?.user.id);
  if (user && "image" in user) {
    const isCloudinaryImage =
      user.image?.split("/").at(2) === "res.cloudinary.com";
    if (isCloudinaryImage) {
      const userImage = user.image.split("/").at(-1)?.split(".").at(0);
      await cloudinary.uploader.destroy("mood-tracking/" + userImage);
    }
  }

  // Upload new profile picture
  if (!["image/jpeg", "image/png"].includes(imageFile.type)) {
    return {
      error: "Unsupported file type. Please upload a PNG or JPEG",
    };
  }

  if (imageFile.size > 250 * 1024) {
    return {
      error: "Image must be less than 250KB.",
    };
  }

  const imageBuffer = Buffer.from(await imageFile.arrayBuffer());
  const base64 = imageBuffer.toString("base64");
  const dataUri = `data:${imageFile.type};base64,${base64}`;

  const result = await cloudinary.uploader.upload(dataUri, {
    folder: "mood-tracking",
  });

  if (session && session.user) {
    await User.findByIdAndUpdate(session.user.id, {
      name,
      image: result.secure_url,
    });
  }
  revalidatePath("/");
  return { success: true };
}
