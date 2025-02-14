import React, { useState } from "react";
import axios from "axios";

function App() {
  const [file, setFile] = useState(null);
  const [summary, setSummary] = useState("");

  const uploadFile = async () => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await axios.post("http://127.0.0.1:5000/upload", formData);
    setSummary(response.data.summary);
  };

  return (
    <div>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={uploadFile}>Upload</button>
      <p>{summary}</p>
    </div>
  );
}

export default App;
