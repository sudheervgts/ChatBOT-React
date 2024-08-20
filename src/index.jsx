import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

import BotMessage from "./components/BotMessage";
import UserMessage from "./components/UserMessage";
import Messages from "./components/Messages";
import Input from "./components/Input";

import API from "./ChatbotAPI";

import "./styles.css";
import Header from "./components/Header";

function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [sessionId , setSessionID] = useState(null);
  const [inputDisabled, setInputDisabled] = useState(false);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    async function getSessionID() {
      if (!sessionId) {
        const value = prompt("Enter Session ID");
        if (value !== "" && value != null) {
          setSessionID(value);
        }
      }
    }
    getSessionID().then(r => null);
  }, []);

  useEffect(() => {
    async function loadWelcomeMessage() {
      if (sessionId) {
        const socket = await new WebSocket(`ws://13.235.166.171:8001/v2/chat/${sessionId}/`)
        setSocket(socket)
        setMessages([
          <BotMessage
              key={messages.length + 1}
              fetchMessage={async () => await API.GetChatbotResponse(socket, null, setInputDisabled)}
          />
        ]);
      }
    }
    if (sessionId) {
      loadWelcomeMessage().then((r => null));
    }
  }, [sessionId]);


  const send = async text => {
    const newMessages = messages.concat(
      <UserMessage key={messages.length + 1} text={text} />,
      <BotMessage
        key={messages.length + 2}
        fetchMessage={async () => await API.GetChatbotResponse(socket,text, setInputDisabled)}
      />
    );
    setMessages(newMessages);
  };

  return (
    <div className="chatbot">
      <Header />
      <Messages messages={messages} />
      <Input onSend={send} canShowInput={inputDisabled} />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<Chatbot />, rootElement);
