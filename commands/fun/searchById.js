const { default: axios } = require('axios');
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

const createEmbed = ({ id }) => {
  let requirements = '';
  if (id.platform === 'Windows') {
    requirements = `${id.minimum_system_requirements.os}, ${id.minimum_system_requirements.processor}, ${id.minimum_system_requirements.memory}, ${id.minimum_system_requirements.graphics}, ${id.minimum_system_requirements.storage}`;
  } else {
    requirements = 'No posee requisitos minimos';
  }
  const exampleEmbed = new EmbedBuilder()
    .setColor('Random')
    .setTitle(`${id.title}`)
    .setURL(`${id.game_url}`)
    .setDescription(`${id.short_description}`)
    .setThumbnail(`${id.thumbnail}`)
    .addFields(
      { name: 'Genero', value: `${id.genre}`, inline: true },
      { name: 'Desarrollador', value: `${id.developer}`, inline: true },
      { name: 'Fecha de lanzamiento', value: `${id.release_date}`, inline: true },
      { name: 'Requisitos minimos', value: requirements, inline: true }
    )
    .setImage(id.screenshots[2].image);
  return exampleEmbed;
};

module.exports = {
  data: new SlashCommandBuilder()
    .setName('buscar-id')
    .setDescription('Escribe el id del juego que estes buscando')
    .addStringOption(option =>
      option
        .setName('id')
        .setDescription('escribe un id')
        .setRequired(true)
    )
  ,
  async execute(interaction) {
    await interaction.deferReply();
    try {
      const id = interaction.options.getString('id');
      const { data: responseId } = await axios.get(`https://www.freetogame.com/api/game?id=${id}`);

      const embed = createEmbed({ id: responseId });
      await interaction.editReply({ embeds: [embed] });
    } catch (error) {
      await interaction.editReply('ese id no existe');
      console.log(error);
    }
  },
};