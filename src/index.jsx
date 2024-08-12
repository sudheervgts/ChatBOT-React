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
  const [passcode , setPasscode] = useState(null);
  const [inputDisabled, setInputDisabled] = useState(false);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    async function getPasscode() {
      if (!passcode) {
        const value = prompt("Enter Passcode");
        if (value !== "" && value != null) {
          setPasscode(value);
        }
      }
    }
    getPasscode().then(r => null);
  }, []);

  useEffect(() => {
    async function loadWelcomeMessage() {
      if (passcode) {
        const socket = await new WebSocket(`ws://127.0.0.1:8000/v1/chat/?sec-websocket-authorization=${passcode}`)
        setSocket(socket)
        setMessages([
          <BotMessage
              key={messages.length + 1}
              fetchMessage={async () => await API.GetChatbotResponse(socket, null, setInputDisabled)}
          />
        ]);
      }
    }
    if (passcode) {
      loadWelcomeMessage();
    }
  }, [passcode]);  // Trigger this effect when passcode changes


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
