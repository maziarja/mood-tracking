"use server";

import connectDB from "@/config/database";
import bcrypt from "bcrypt";
import User from "@/models/user";

export async function signUpUser(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email && !password) {
    return {
      error: {
        email: "All fields are required.",
        password: "All fields are required.",
      },
    };
  }
  if (!email) {
    return {
      error: {
        email: "All fields are required.",
      },
    };
  }
  if (!password) {
    return {
      error: {
        password: "All fields are required.",
      },
    };
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return {
      error: {
        email: "Please enter valid email address.",
      },
    };
  }

  // Password validation
  if (password.length < 8) {
    return {
      error: {
        password: "Password must be at least 8 characters.",
      },
    };
  }

  await connectDB();

  const existing = await User.findOne({ email });
  if (existing) {
    return {
      error: {
        email: "User already exists.",
      },
    };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await User.create({ email, password: hashedPassword });
    return { success: true };
  } catch (error) {
    if (typeof error === "object" && error !== null && "name" in error)
      if (error.name === "ValidationError") {
        return {
          error: {
            email: "Please enter valid email address.",
          },
        };
      }
    throw error;
  }
}
