import { useState, useEffect } from "react";

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/api")
      .then((res) => res.text())
      .then(setMessage);
  }, []);

  return <>{message}</>;
}

export default App;
