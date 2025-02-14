import React, { useState } from "react";
import axios from "axios";

function App() {
  const [file, setFile] = useState(null);
  const [summary, setSummary] = useState("");

  const uploadFile = async () => {
    if (!file) {
      alert("Please select a file before uploading.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    const response = await axios.post("http://127.0.0.1:5000/upload", formData);
    setSummary(response.data.summary);
  };

  return (
    <div style={{ textAlign: "center", padding: "20px", maxWidth: "600px", margin: "auto" }}>
      <h1>Document Summarizer</h1>
      <p>Upload a document, and the AI will summarize it for you.</p>

      <input 
        type="file" 
        onChange={(e) => setFile(e.target.files[0])} 
        style={{ marginBottom: "10px" }} 
      />
      <br />
      <button 
        onClick={uploadFile} 
        style={{ padding: "8px 15px", cursor: "pointer", fontSize: "16px" }}
      >
        Upload & Summarize
      </button>

      {summary && (
        <div style={{ marginTop: "20px", textAlign: "left", background: "#f9f9f9", padding: "10px", borderRadius: "5px" }}>
          <h2>Summary</h2>
          <p>{summary}</p>
        </div>
      )}
    </div>
  );
}

export default App;
 