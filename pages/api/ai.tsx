import { NextApiRequest, NextApiResponse } from "next";
import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      // req.bodyからメッセージを取得
      const { message } = req.body;

      // OpenAI APIにクエリを投げる
      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "###出力形式 JSON{title,ingredients,steps}",
          },
          {
            role: "user",
            content: message,
          },
        ],
      });

      console.log(completion);
      // console.log(completion.choices[0].message.content);

      // 応答をクライアントに送信
      res.status(200).json({ message: completion.choices[0].message.content });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  } else {
    // POSTリクエストでない場合は、405 Method Not Allowedを返す
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
