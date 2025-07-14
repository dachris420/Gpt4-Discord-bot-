const { EmbedBuilder, Colors } = require('discord.js');

class ChatGPTClient {
  constructor(apiClient, options) {
    this.apiClient = apiClient;
    this.contextData = new Map();

    const optionDefaults = {
      contextRemembering: true,
      responseType: 'embed',
      maxLength: 2000
    };

    this.options = Object.assign(optionDefaults, options);
  }

  static async init(openAIAPIKey, options) {
    if (!openAIAPIKey) {
      throw new TypeError("❌ OpenAI API Key fehlt!");
    }

    const { ChatGPTAPI } = await import('chatgpt');

    const apiClient = new ChatGPTAPI({ apiKey: openAIAPIKey });
    return new ChatGPTClient(apiClient, options);
  }

  async send(message, id) {
    try {
      console.log('🧠 Sende an OpenAI:', message);

      const response = await this.apiClient.sendMessage(message, {
        parentMessageId: id
      });

      console.log('✅ Antwort von OpenAI:', response.text);
      return response;
    } catch (err) {
      console.error('❌ Fehler bei OpenAI:', err);
      throw err;
    }
  }

  // ... (chatMessage und chatInteraction bleiben gleich)
}

module.exports = {
  ChatGPTClient
};
