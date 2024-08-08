

const API = {
  GetChatbotResponse: async (socket, message, setInputState) => {
    if (message) {
      socket.send(message)
      setInputState(false)
    }
    return new Promise((resolve, reject) => {
      socket.onmessage = (e) => {
        resolve(e.data)
        setInputState(true)
      }
      socket.onerror = (e) => {
        alert("Invalid Passcode")
        reject(new Error(e));
      }
    })
  }
};

export default API;
