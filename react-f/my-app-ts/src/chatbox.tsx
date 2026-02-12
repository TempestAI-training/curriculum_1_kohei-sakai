import "./chatbox.css"
import {useState} from "react";
import ChatForm from "./ChatForm"
import Message from "./Message"

type MessageType = {
  text: string;
  sender: "user" | "bot";
  timestamp: number;
};

function Screen() {
  const[mode,setMode] = useState<"start" | "chat">("start");
  const[content,setContent] = useState("");
  const [messages, setMessages] = useState<MessageType[]>([]);

  const handleSave = (newMessage: string) => {
    const userMessage: MessageType = {
      text: newMessage,
      sender: "user",
      timestamp: Date.now()
    };

    const botMessage: MessageType = {
      text: "高市さんは日本の総理大臣です。",
      sender: "bot",
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMessage,botMessage]);
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