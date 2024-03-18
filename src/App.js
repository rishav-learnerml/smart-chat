// Import necessary dependencies
import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [userInput, setUserInput] = useState("");
  const [chatMessages, setChatMessages] = useState([]);

  // OpenAI API endpoint
  const apiEndpoint = "https://api.openai.com/v1/chat/completions"; // Replace with your OpenAI GPT API endpoint

  // OpenAI API key
  const apiKey = "YOUR_API_KEY"; // Replace with your OpenAI GPT API key

  const modelName = "gpt-3.5-turbo";

  // Function to handle user input change
  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("hello", userInput);

    // Make API call to OpenAI GPT
    try {
      const response = await axios.post(
        apiEndpoint,
        {
          max_tokens: 100, // Adjust as needed
          model: modelName, // Add the 'model' parameter
          messages: [
            {
              role: "system",
              content:
                "You are a helpful assistant for Zomato chat support. When the user aska a question, respond back to him with the company name at first place",
            },
            { role: "user", content: userInput },
          ],
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
        }
      );

      // Update chat messages with the response
      setChatMessages([
        ...chatMessages,
        { type: "user", text: userInput },
        { type: "genAI", text: response.data.choices[0].message.content },
      ]);
      // Clear the input box
      setUserInput("");
    } catch (error) {
      console.error("Error making API call to OpenAI:", error);
    }
  };

  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "auto",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "8px",
        marginTop: "10%",
      }}
    >
      <div
        style={{
          minHeight: "200px",
          border: "1px solid #ccc",
          padding: "10px",
          marginBottom: "10px",
          overflowY: "auto",
        }}
      >
        {chatMessages?.map((message, index) => (
          <div
            key={index}
            style={{
              marginBottom: "5px",
              color: message.type === "genAI" ? "green" : "blue",
            }}
          >
            {message.type === "user" ? "User: " : "GenAI: "}
            {message.text}
          </div>
        ))}
      </div>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", alignItems: "center" }}
      >
        <input
          type="text"
          value={userInput}
          onChange={handleInputChange}
          placeholder="Type your message..."
          style={{
            flex: "1",
            padding: "8px",
            marginRight: "10px",
            borderRadius: "4px",
            border: "1px solid #ccc",
          }}
        />
        <button
          type="submit"
          style={{
            padding: "8px",
            borderRadius: "4px",
            background: "#007BFF",
            color: "#fff",
            border: "none",
            cursor: "pointer",
          }}
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default App;
