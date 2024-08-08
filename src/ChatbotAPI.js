
const passcode = "4c546730303452b76d9ba73b152959f99e840f232aa408af442fd4a6da6273015293fbd8cda14af56f1fc28595d685e04b15618546b33b7e2c3fef3fbbbe85d1"
const socket = new WebSocket(`ws://13.235.166.171:8001/v1/chat/?sec-websocket-authorization=${passcode}`)

const API = {
  GetChatbotResponse: async (message) => {
    if (message) {
      socket.send(message)
    }
    return new Promise((resolve, reject) => {
      socket.onmessage = (e) => {
        resolve(e.data)
      }
    })
  }
};

export default API;
