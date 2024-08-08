const API = {
  GetChatbotResponse: async (message) => {
    return new Promise(function (resolve, reject) {
      if (message === "hi") resolve("Welcome to chatbot!");
      else resolve("echo : " + message);
    });
  }
};

export default API;
