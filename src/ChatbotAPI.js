

const API = {
  GetChatbotResponse: async (socket, message, setInputState) => {
    if (message) {
      socket.send(JSON.stringify({
        given_from: 'chat_box',
        query: message
      }))
      setInputState(false)
    }
    return new Promise((resolve, reject) => {
      socket.onmessage = (e) => {
        const data = JSON.parse(e.data)
        if (data.type === 'chat_end' && data?.content !== ""){
          resolve(data.content)
          setInputState(true)
        }
        else if (data.type === 'tool_end') {
          resolve(data.output.content)
          setInputState(true)
        }
      }
      socket.onerror = (e) => {
        alert("Invalid Passcode")
        reject(new Error(e));
      }
    })
  }
};

export default API;
