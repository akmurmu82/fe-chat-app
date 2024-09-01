import { useState } from "react";

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");

  const handleLogin = () => {
    if (username) {
      onLogin(username);
    }
  };

  return (
    <div>
      <h2>Enter your username to join the chat</h2>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Enter your username"
      />
      <button onClick={handleLogin}>Join Chat</button>
    </div>
  );
};

export default Login;
