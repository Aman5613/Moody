import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  // apiKey: "AIzaSyBy7XbyRcv9OoouL2T_C_f4JQsselX6bsI",
});

const detectEmotion = async (bufferFile) => {
  const base64AudioFile = bufferFile.toString("base64");

  const contents = [
    {
      text: `
        Analyze the given audio and identify:
        1. Emotion (one word) from: [neutral, happy, sad, angry, fearful, disgusted, surprised]
        2. Song title 
        3. Artist name 

        Respond only in this JSON format and nothing else:

        {
          "emotion": "word",
          "title": "--song title--",
          "artist": "--artist name--"
        }
      `,
    },
    {
      inlineData: {
        mimeType: "audio/mp3",
        data: base64AudioFile,
      },
    },
  ];

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: contents,
  });

  return response;
};

export default detectEmotion;