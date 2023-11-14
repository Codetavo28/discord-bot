const { SlashCommandBuilder, inlineCode } = require('discord.js');
const { getUserMention } = require('../../utils/discordUtils');
const db = require('../../database');
const { getUser } = require('../../utils/dbUtils');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('editar-usuario')
    .setDescription('edita tu usuario!')
    .addStringOption(option =>
      option
        .setName('nombre')
        .setDescription('Tu nombre')
        .setRequired(true)
    ),
  async execute(interaction) {
    const discordId = interaction.user.id;
    const name = interaction.options.getString('nombre');
    try {
      const userOld = getUser(discordId);

      if (!userOld) {
        return await interaction.reply(`${getUserMention(discordId)} tu usuario no existe, bro`);
      }

      const editStatement = `
        UPDATE users
        SET name = ?
        WHERE user_id = ?
        `;
      db.prepare(editStatement).run(name, discordId);
      const userUpdated = getUser(discordId);

      await interaction.reply(`${getUserMention(discordId)} tu nombre ha sido actualizado a: ${inlineCode(userUpdated.name)}`);
    } catch (error) {
      console.log(error);
    }
  },
};