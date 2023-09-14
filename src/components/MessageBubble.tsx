import OpenAI from "openai";

interface IProps {
  message: OpenAI.Chat.Completions.ChatCompletionMessage;
  blink?: boolean;
}

function MessageBubble({ message, blink }: IProps) {
  return (
    <div
      className={`message rounded-lg py-2 px-6 mb-4 ${
        message.role === "assistant"
          ? "assistant bg-blue-100 border-blue-100 self-start"
          : "user bg-green-200 border-green-200 self-end"
      }`}
    >
      <span>{message.content}</span>
      {blink && (
        <span className="w-2.5 bg-gray-600 h-4 inline-block -mb-0.5 align-baseline blink"></span>
      )}
    </div>
  );
}

export default MessageBubble;
