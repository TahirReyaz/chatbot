"use server";

import { sql } from "@vercel/postgres";
import Groq from "groq-sdk";
import { revalidatePath } from "next/cache";

import { Chat, Message } from "@/app/lib/definitions";
import { redirect } from "next/navigation";
import {
  ChatCompletionAssistantMessageParam,
  ChatCompletionUserMessageParam,
} from "groq-sdk/resources/chat/completions.mjs";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export const sendMessage = async (
  message: string,
  chatId?: string,
  userid?: string,
  messsageList?: Message[]
) => {
  let newChatId = chatId;
  try {
    //  LoggedIn user with new chat -> create a chat and navigate to chat page with new chatid
    if (!chatId && userid) {
      const newChat = await createNewChat(message.substring(0, 20), userid);
      newChatId = newChat.id;
      await saveMessage(message, userid, newChat.id);

      const botResponse = await getReponseFromBot(newChatId, userid);
      await saveMessage(botResponse, "bot", newChat.id);
      redirect(`/chat/${newChatId}`);
    }
    // Existing chat -> store the message in chat and the send to groq
    else if (chatId && userid) {
      await saveMessage(message, userid, chatId);
      // This revalidatePath isn't working but the at the end is working don't know why
      revalidatePath(`/chat/${chatId}`);

      const botResponse = await getReponseFromBot(chatId, userid);

      await saveMessage(botResponse, "bot", chatId);
      revalidatePath(`/chat/${chatId}`);
    }
    // User not logged in
    else {
      const botResponse = await getReponseFromBot(
        undefined,
        undefined,
        messsageList
      );
      return botResponse;
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

export const getReponseFromBot = async (
  chatId?: string,
  userid?: string,
  messageList?: Message[]
) => {
  let botResponse = "",
    messages: Message[] = [];

  if (chatId && userid) {
    messages = await getMessageList(chatId);
  } else if (messages) {
    messages = messageList || [];
  }

  const groqMessages: (
    | ChatCompletionUserMessageParam
    | ChatCompletionAssistantMessageParam
  )[] = messages.map((dbMessage) => ({
    role: dbMessage.userid === "bot" ? "assistant" : "user",
    content: dbMessage.content,
    name: userid,
  }));
  const completion = await groq.chat.completions.create({
    messages: groqMessages,
    model: "mixtral-8x7b-32768",
  });

  botResponse = completion.choices[0]?.message?.content || "";

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

export const deleteChat = async (chatId: string) => {
  try {
    await sql`
      DELETE FROM chats WHERE id=${chatId}
    `;
    revalidatePath("/");
  } catch (error) {
    throw error;
  }
};
