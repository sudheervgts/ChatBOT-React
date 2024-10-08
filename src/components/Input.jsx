import React, { useState } from "react";

export default function Input({ onSend, canShowInput }) {
  const [text, setText] = useState("")

  const handleInputChange = e => {
    setText(e.target.value);
  };

  const handleSend = e => {
    e.preventDefault();
    onSend(text);
    setText("");
  };


  return (
    <div className="input">
      <form onSubmit={handleSend}>
        <input type="text"
               onChange={handleInputChange}
               value={text}
               placeholder="Enter your message here"
               hidden={!canShowInput}
        />
      </form>
    </div>
  );
}
