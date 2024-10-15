"use server";

import { z } from "zod";
import { AuthError } from "next-auth";
import { sql } from "@vercel/postgres";
import bcrypt from "bcrypt";

import { getUser, signIn } from "@/auth";
import { ResultCode } from "../utils";

export const createUser = async (
  email: string,
  hashedPassword: string,
  salt: string
) => {
  const existingUser = await getUser(email);

  if (existingUser) {
    return {
      type: "error",
      resultCode: ResultCode.UserAlreadyExists,
    };
  } else {
    await sql`
    INSERT INTO chatusers (email, password, salt) 
    VALUES (${email}, ${hashedPassword}, ${salt})
  `;

    return {
      type: "success",
      resultCode: ResultCode.UserCreated,
    };
  }
};

interface Result {
  type: string;
  resultCode: ResultCode;
}

export const signup = async (
  email: string,
  password: string
): Promise<Result | undefined> => {
  const salt = await bcrypt.genSalt(8);

  const hashedPassword = await bcrypt.hash(password, salt);

  try {
    const result = await createUser(email, hashedPassword, salt);

    if (result.resultCode === ResultCode.UserCreated) {
      await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
    }

    return result;
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return {
            type: "error",
            resultCode: ResultCode.InvalidCredentials,
          };
        default:
          return {
            type: "error",
            resultCode: ResultCode.UnknownError,
          };
      }
    } else {
      return {
        type: "error",
        resultCode: ResultCode.UnknownError,
      };
    }
  }
};

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
}
