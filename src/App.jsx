import { useState } from "react";
import "./App.css";
import Chat from "./Chat";
import Login from "./Login";
import Profile from "./Profile";

function App() {
  const [username, setUsername] = useState("");
  const [view, setView] = useState("chat"); // Can be 'chat' or 'profile'

  const handleLogin = (username) => {
    setUsername(username);
    setView("chat");
  };
  return (
    <div className="App">
      <h1>Chat App</h1>
      {!username ? (
        <Login onLogin={handleLogin} />
      ) : view === "chat" ? (
        <Chat username={username} />
      ) : (
        <Profile username={username} />
      )}
      {username && (
        <button onClick={() => setView(view === "chat" ? "profile" : "chat")}>
          {view === "chat" ? "View Profile" : "Back to Chat"}
        </button>
      )}
    </div>
  );
}

export default App;
