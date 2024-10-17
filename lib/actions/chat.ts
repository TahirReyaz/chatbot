"use server";

import { sql } from "@vercel/postgres";
import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export const sendMessage = async (
  prevState: void | undefined,
  formData: FormData
) => {
  try {
    const message: string = (formData.get("input") as string) || "";
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: message || "",
        },
      ],
      model: "llama3-8b-8192",
    });
    console.log(chatCompletion.choices[0]?.message?.content || "");
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const saveMessage = async (
  content: string,
  userid: string,
  chat: string
) => {
  try {
    sql`
      INSERT INTO messages (content, userid, chat) VALUES (${content}, ${userid}, ${chat})
    `;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const createNewChat = async (title: string, userid: string) => {
  try {
    sql`
      INSERT INTO chats (title, userid) VALUES (${title}, ${userid})
    `;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
