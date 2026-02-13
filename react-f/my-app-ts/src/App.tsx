import './App.css';
import {useState} from "react";
import Screen from "./chatbox";

function App() {
  const [content,setContent] = useState("");

  return (
    <div className="App">
      <header className="App-header">
        <Screen />
      </header>
    </div>
  );
}

export default App;