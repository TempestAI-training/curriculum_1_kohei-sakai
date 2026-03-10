import React from "react";
import "./chatbox.css"

type Props = {
  content: string;
  setContent: React.Dispatch<React.SetStateAction<string>>;
  onSave: (message:string) => void;
};

const ChatForm = ({content,setContent,onSave}:Props) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    onSave(content);
    setContent("");
  };

  return (
    <form className="wrapper" onSubmit={handleSubmit}>
      <input
        className="chatInput"
        type = "text"
        value ={content}
        onChange = {(e) => setContent(e.target.value)}
        placeholder="例）天気や交通など、気になることを入力"
      />
      <button type="submit" className="sendButton">送信</button>
    </form>
  );
};

export default ChatForm;