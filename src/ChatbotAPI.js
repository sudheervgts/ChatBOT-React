

const API = {
  GetChatbotResponse: async (socket, message, setInputState) => {
    if (message) {
      socket.send(message)
      setInputState(true)
    }
    return new Promise((resolve, reject) => {
      socket.onmessage = (e) => {
        resolve(e.data)
        setInputState(false)
      }
      socket.onerror = (e) => {
        alert("Invalid Passcode")
        reject(new Error(e));
      }
    })
  }
};

export default API;
