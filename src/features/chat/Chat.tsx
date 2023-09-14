import { useAppDispatch, useAppSelector } from "@src/hooks";
import { FormEvent, useMemo, useState } from "react";
import OpenAI from "openai";

import Button from "@components/Button";
import MessageBubble from "@components/MessageBubble";
import ResponseWaitor from "@components/ResponseWaitor";

import {
  LOCAL_STORAGE_API_TOKEN,
  LOCAL_STORAGE_EXPIRE_AT,
} from "@constants/localStorage";

import { appendMessage, waitForResponse, wakeUp, reset } from "./chatSlice";
import { clearApiKey } from "@features/apiKey/apiKeySlice";

function Chat() {
  const dispatch = useAppDispatch();
  const apiKey = useAppSelector((state) => state.apiKey.value) as string;
  const openai = useMemo(
    () => new OpenAI({ apiKey, dangerouslyAllowBrowser: true }),
    [apiKey]
  );
  const { messages, waitingOnResponse } = useAppSelector((state) => state.chat);

  const [newMessage, setNewMessage] = useState("");
  const [curResponse, setCurResponse] = useState("");

  const sendMessage = async (e: FormEvent) => {
    e.preventDefault();

    const message: OpenAI.Chat.ChatCompletionMessage = {
      role: "user",
      content: newMessage,
    };
    let response = "";

    dispatch(waitForResponse());
    dispatch(appendMessage(message));
    setNewMessage("");

    try {
      const stream = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [...messages, message],
        stream: true,
      });

      for await (const chunk of stream) {
        response += chunk?.choices?.[0]?.delta?.content ?? "";
        setCurResponse(response);
      }

      dispatch(appendMessage({ role: "assistant", content: response }));
    } catch (e: any) {
      if (e?.status === 429 || e?.status === 401) signOut();
    }

    setCurResponse("");
    dispatch(wakeUp());
  };

  const signOut = () => {
    dispatch(clearApiKey());
    dispatch(reset());

    localStorage.removeItem(LOCAL_STORAGE_API_TOKEN);
    localStorage.removeItem(LOCAL_STORAGE_EXPIRE_AT);
  };

  return (
    <div className="w-screen h-screen bg-gray-50 flex flex-col">
      <div className="bg-gray-800 flex justify-center items-center p-4 relative">
        <span className="text-lg text-white text-bold">Chat bot</span>
        <button
          className="absolute right-8 text-sm text-blue-400"
          onClick={signOut}
        >
          Sign out
        </button>
      </div>

      <div className="w-full max-w-screen-lg flex-1 m-auto p-8 my-4 pb-20">
        <div className="flex flex-col">
          {messages.map((message, index) => (
            <MessageBubble key={index} message={message} />
          ))}
          {curResponse && (
            <>
              <MessageBubble
                message={{ role: "assistant", content: curResponse }}
                blink={true}
              />
            </>
          )}

          {!curResponse && waitingOnResponse && <ResponseWaitor />}
        </div>
      </div>

      <div className="fixed inset-x-0 bottom-0 bg-gray-200">
        <form
          className="max-w-screen-lg m-auto w-full p-4 flex space-x-4 justify-center items-center"
          onSubmit={sendMessage}
        >
          <input
            id="message"
            type="text"
            autoComplete="off"
            className="border rounded-md p-2 flex-1 border-gray-300"
            placeholder="Your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <Button type="submit" disabled={!newMessage || waitingOnResponse}>
            Send
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Chat;
