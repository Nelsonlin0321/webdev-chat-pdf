"use client";
import { Input } from "./ui/input";
import React from "react";
import { useChat } from "ai/react";
import { Button } from "./ui/button";
import { Send } from "lucide-react";
import MessageList from "./MessageList";
import { Message } from "ai";

type Props = {
  file_key: string;
};

function extractUserQuestion(text: string): string | null {
  const regex = /QUESTION\s*->\s*(.*?)\s*\n/;
  const match = text.match(regex);
  return match ? match[1] : text;
}

const ChatComponent = ({ file_key }: Props) => {
  const { input, handleInputChange, handleSubmit, messages, isLoading } =
    useChat({ api: "/api/chat", body: { file_key } });

  const reconstructedMessages = messages.map((message) => {
    if (message.role === "user") {
      return { ...message, content: extractUserQuestion(message.content)! };
    } else {
      return message;
    }
  });
  const template_chats = [
    { id: "1", content: "Hi", role: "user" },
    { id: "2", content: "How can I help you?", role: "assistant" },
  ];

  return (
    <div className="relative max-h-screen">
      {/* header */}
      <div className="sticky top-0 inset-x-0 p-2 bg-white h-fit">
        <h3 className="text-xl font-bold">Chat Component</h3>
      </div>

      <MessageList messages={reconstructedMessages} />

      <form
        className="sticky bottom-0 inset-x-0 px-2 py-10 bg-white"
        onSubmit={handleSubmit}
      >
        <div className="flex gap-2 w-full">
          <Input
            value={input}
            onChange={handleInputChange}
            placeholder="Ask any question ..."
            className="mb-4"
          />
          <Button className="bg-blue-600" disabled={isLoading} type="submit">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ChatComponent;