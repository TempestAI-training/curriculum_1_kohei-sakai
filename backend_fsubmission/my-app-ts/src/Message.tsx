import "./chatbox.css"

type Sender = "user" | "assistant";

type Props = {
  content: string;
  sentFrom:Sender;
  timestamp: number;
};

const Message = ({ content, sentFrom, timestamp }: Props) => {
  const date = new Date(timestamp);

  if (sentFrom === "user"){
    return (
      <div className="userMessage">
        <p className="whitegray smallestFont timestamp">
          {date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </p>
        <p className="message">{content}</p>
      </div>
    );
  } else {
    return (
      <div className="botMessage">
        <p className="gray smallestFont timestamp">
          {date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </p>
        <p className="message">{content}</p>
      </div>
    );
  }
};

export default Message;