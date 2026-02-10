import {useState} from "react";
import './App.css';
import MemoForm from "./MemoForm"

function App() {
  const [isVisible,setIsVisible] = useState(true);

  const [title,setTitle] = useState("");
  const [content,setContent] = useState("");
  const [tag,setTag] = useState("");

  const handleSave = () => {
    console.log("保存するメモ:", {
      title: title,
      content: content,
      tag: tag,
    });
  };

  return (
    <div className="App">
      <h2>簡易メモアプリケーション</h2>

      <p>
        このアプリでは、タイトル・内容・タグを入力してメモを作成できます。
      </p>

      <button
        onClick={() =>
          console.log("このアプリはメモ管理用のReactアプリです")
        }
      >
        このアプリについて
      </button>
      
      <br />

      <button onClick={() => setIsVisible(!isVisible)}>
        フォーム表示切替
      </button>

      {isVisible && <MemoForm
        title={title}
        setTitle={setTitle}
        content={content}
        setContent={setContent}
        tag={tag}
        setTag={setTag}
        onSave={handleSave}
        />}
    </div>
  );
}

export default App;
