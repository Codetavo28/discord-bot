const { SlashCommandBuilder } = require('discord.js');
const { getUserMention } = require('../../utils/discordUtils');
const db = require('../../database');
const { getUser } = require('../../utils/dbUtils');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('borrar-usuario')
    .setDescription('Borra tu usuario!'),
  async execute(interaction) {
    const discordId = interaction.user.id;
    try {
      const user = getUser(discordId);

      if (!user) {
        return await interaction.reply(`${getUserMention(discordId)} tu usuario no existe, bro`);
      }

      const deleteStatement = `
        DELETE FROM users
        WHERE user_id = ?
        `;
      db.prepare(deleteStatement).run(discordId);

      await interaction.reply(`${getUserMention(discordId)} tu usuario ha sido eliminado`);
    } catch (error) {
      console.log(error);
    }
  },
};