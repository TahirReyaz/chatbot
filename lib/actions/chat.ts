"use server";

import { sql } from "@vercel/postgres";
import Groq from "groq-sdk";
import { revalidatePath } from "next/cache";

import { Chat, Message } from "@/app/lib/definitions";
import { redirect } from "next/navigation";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export const sendMessage = async (
  message: string,
  chatId?: string,
  userid?: string
) => {
  let newChatId = chatId;
  try {
    //  LoggedIn user with new chat -> create a chat and navigate to chat page with new chatid
    const botResponse = await getReponseFromBot(message);
    if (!chatId && userid) {
      const newChat = await createNewChat(message.substring(0, 10), userid);
      newChatId = newChat.id;
      await saveMessage(message, userid, newChat.id);
      await saveMessage(botResponse, "bot", newChat.id);
      redirect(`/chat/${newChatId}`);
    }
    // Existing chat -> store the message in chat and the send to groq
    if (chatId && userid) {
      await saveMessage(message, userid, chatId);
      await saveMessage(botResponse, "bot", chatId);
      revalidatePath(`/chat/${chatId}`);
    }
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
      INSERT INTO messages (content, userid, chat) 
      VALUES (${content}, ${userid}, ${chat})
      RETURNING *
    `;
    return newMsg.rows[0];
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const createNewChat = async (title: string, userid: string) => {
  try {
    const newChat = await sql`
      INSERT INTO chats (title, userid) 
      VALUES (${title}, ${userid})
      RETURNING *
    `;
    return newChat.rows[0];
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getChatList = async (userid: string) => {
  try {
    const list = await sql`
      SELECT * FROM chats WHERE userid=${userid}
    `;
    return list.rows as Chat[];
  } catch (error) {
    throw error;
  }
};

export const getReponseFromBot = async (input: string) => {
  const chatCompletion = await groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content: input || "",
      },
    ],
    model: "llama3-8b-8192",
  });
  const botResponse = chatCompletion.choices[0]?.message?.content || "";
  return botResponse;
};

export const getMessageList = async (chatId: string) => {
  try {
    const list = await sql`
      SELECT * FROM messages WHERE chat=${chatId}
    `;
    return list.rows as Message[];
  } catch (error) {
    throw error;
  }
};
