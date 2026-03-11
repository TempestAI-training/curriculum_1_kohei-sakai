import "./chatbox.css"
import {useState} from "react";
import ChatForm from "./ChatForm"
import Message from "./Message"

type MessageType = {
  text: string;
  sender: "user" | "assistant";
  timestamp: number;
};

function Screen() {
  const[mode,setMode] = useState<"start" | "chat">("start");
  const[content,setContent] = useState("");
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [conversationId, setConversationId] = useState<string | null>(null);

  const handleSave = async (newMessage: string) => {
    const userMessage: MessageType = {
      text: newMessage,
      sender: "user",
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMessage]);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          content: newMessage,
          conversation_id: conversationId
        })
      });

      const data = await response.json();

      const botMessage: MessageType = {
        text: data.content,
        sender: data.role as "assistant",
        timestamp: new Date(data.created_at).getTime()
      };

      setConversationId(data.conversation_id);
      setMessages(prev => [...prev, botMessage]);

    } catch (error) {
      console.error("エラー:", error);
    }
  };
  
  if (mode === "start") {
    return(
      <div className="card">
        <p className="gray smallestFont textLeft">Politics Study</p>
        <h3 className="textLeft">早苗さんの政策について学ぼう！</h3>
        <p className="gray smallFont textLeft">任意のお問い合わせに対して早苗さんの考えを返答します。</p>
        <button className="button" onClick = {() => setMode("chat")}>
          チャットを始める
        </button>
      </div>
    )
  } else {
    return(
      <div className="card">
        <div className="chatHeader">
          <p className="gray smallestFont textLeft">政策chatbot</p>
          <button className="buckButton right" onClick= {() => setMode("start")}>
            戻る
          </button>
        </div>

        <div className="messages">
          {messages.map((msg, index) => (
            <Message
              key={index}
              content={msg.text}
              sentFrom={msg.sender}
              timestamp={msg.timestamp}
            />
          ))}
        </div>

        <ChatForm
          content={content}
          setContent={setContent}
          onSave = {handleSave}
        />

      </div>
    )
  }
}

export default Screen;