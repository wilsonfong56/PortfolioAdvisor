import { useEffect, useState } from "react";

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/")
        .then(response => response.json())
        .then(data => setMessage(data.message))
  }, []);

  return <div>{message || "Loading..."}</div>;
}

export default App;
