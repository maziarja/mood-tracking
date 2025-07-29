"use server";

import { auth } from "@/config/auth";
import cloudinary from "@/config/cloudinary";
import connectDB from "@/config/database";
import MoodEntries from "@/models/moodEntries";
import User from "@/models/user";

export async function deleteAccount(formData: FormData) {
  await connectDB();
  const session = await auth();
  if (!session) throw new Error("You need to login first");

  const email = formData.get("email");
  const verifyDelete = formData.get("verifyDelete");

  //   validation
  if (email !== session.user?.email) {
    return {
      error: {
        email: "The email does not match",
      },
    };
  }
  if (verifyDelete !== "delete my account") {
    return {
      error: {
        verifyDelete: "The verification text does not match",
      },
    };
  }

  if (email === session.user.email && verifyDelete === "delete my account") {
    // Delete profile picture from cloudinary
    const user = await User.findOne({ email });
    if (user && "image" in user) {
      const isCloudinaryImage =
        user.image?.split("/").at(2) === "res.cloudinary.com";
      if (isCloudinaryImage) {
        const userImage = user.image.split("/").at(-1)?.split(".").at(0);
        await cloudinary.uploader.destroy("mood-tracking/" + userImage);
      }
    }
    // Delete user entries from DB
    await MoodEntries.findOneAndDelete({ userId: session.user.id });

    // Delete user from DB
    await User.findByIdAndDelete({ _id: session.user.id });
  }

  return {
    success: true,
  };
}
