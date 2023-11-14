const { SlashCommandBuilder } = require('discord.js');
const db = require('../../database');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('crear-nota')
    .setDescription('Crea una nota pro')
    .addStringOption(option =>
      option
        .setName('titulo')
        .setDescription('Titulo de tu nota')
        .setRequired(true)
    )
    .addStringOption(option =>
      option
        .setName('descripcion')
        .setDescription('Descripcion de tu nota')
        .setRequired(false)
    ),
  async execute(interaction) {
    try {
      const title = interaction.options.getString('titulo');
      const description = interaction.options.getString('descripcion');

      const statement = 'INSERT INTO users (title, decription, user_id) VALUES (?, ?, ?)';
      db.prepare(statement).run(title, description, interaction.user.id);
      await interaction.reply ('Nota creada');
    } catch (error){
      console.log(error);
    }
  },
};