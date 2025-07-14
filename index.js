const { Client, GatewayIntentBits, Events } = require('discord.js');
const { ChatGPTClient } = require('./src/ChatGPTClient');
require('dotenv').config();

// Bot-Client initialisieren
const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages]
});

// GPT-Client initialisieren
const gpt = new ChatGPTClient(process.env.OPENAI_API_KEY, {
  contextRemembering: true,
  responseType: 'embed',
  maxLength: 2000
});

// Sobald Bot online ist
client.once(Events.ClientReady, () => {
  console.log(`🤖 Logged in as ${client.user.tag}`);
});

// Slash-Befehle behandeln
client.on(Events.InteractionCreate, async interaction => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === 'gpt') {
    const input = interaction.options.getString('prompt');
    if (!input) {
      return await interaction.reply({
        content: '❌ Bitte gib eine Eingabe an.',
        ephemeral: true
      });
    }

    try {
      await gpt.chatInteraction(interaction, input);
    } catch (err) {
      console.error('Fehler bei GPT:', err);
      await interaction.reply({
        content: '⚠️ Ein Fehler ist aufgetreten.',
        ephemeral: true
      });
    }
  }
});

// Bot einloggen
client.login(process.env.DISCORD_TOKEN);
