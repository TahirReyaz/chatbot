"use server";

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

export const saveMessage = async () => {
  try {
  } catch (error) {
    console.error(error);
    throw error;
  }
};
