
const passcode = "90d258522f8b0d9d419bb347877b8b68c1bbbf72dbc5f0092888bf54a883bf2979a35c2cdc67a8a27aabb48442d9bf27d166a0251c2bcf6151505c356706c7a0"
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
