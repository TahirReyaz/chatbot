"use server";

import { sql } from "@vercel/postgres";
import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export const sendMessage = async (
  prevState: void | undefined,
  formData: FormData,
  chatId?: string,
  userId?: string
) => {
  try {
    const message: string = (formData.get("input") as string) || "";

    //  LoggedIn user with new chat -> create a chat and navigate to chat page with new chatid
    if (!chatId && userId) {
      const newChat = await createNewChat(message.substring(0, 10), userId);
      console.log({ newChat });
    }
    // Existing chat -> store the message in chat and the send to groq
    if (chatId && userId) {
      const newMessage = await saveMessage(message, userId, chatId);
      console.log({ newMessage });
    }
    // User not loggedIn -> just send the message
    if (!chatId && !userId) {
    }

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
    const newMsg = await sql`
      INSERT INTO messages (content, userid, chat) VALUES (${content}, ${userid}, ${chat})
    `;
    return newMsg;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const createNewChat = async (title: string, userid: string) => {
  try {
    const newChat = await sql`
      INSERT INTO chats (title, userid) VALUES (${title}, ${userid})
    `;
    return newChat;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
