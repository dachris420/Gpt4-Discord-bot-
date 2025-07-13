const { REST, Routes } = require('discord.js');
require('dotenv').config();

const commands = [
  {
    name: 'gpt',
    description: 'Frage an GPT-4 stellen',
    options: [
      {
        name: 'prompt',
        description: 'Was soll GPT beantworten?',
        type: 3, // STRING
        required: true
      }
    ]
  }
];

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

(async () => {
  try {
    console.log('⏳ Registriere Slash-Command...');
    await rest.put(
      Routes.applicationCommands(process.env.CLIENT_ID),
      { body: commands }
    );
    console.log('✅ Slash-Command erfolgreich registriert!');
  } catch (error) {
    console.error('❌ Fehler:', error);
  }
})();
