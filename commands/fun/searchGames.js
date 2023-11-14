const { default: axios } = require('axios');
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');


const createEmbed = ({ category }) => {
  const exampleEmbed = new EmbedBuilder()
    .setColor('Random')
    .setTitle(category[0].genre)
    .addFields(
      { name: `${category[0].title}`, value: `id para buscar: ${category[0].id}` },
      { name: `${category[1].title}`, value: `id para buscar: ${category[1].id}` },
      { name: `${category[2].title}`, value: `id para buscar: ${category[2].id}` },
      { name: `${category[3].title}`, value: `id para buscar: ${category[3].id}` },
      { name: `${category[4].title}`, value: `id para buscar: ${category[4].id}` },
      { name: `${category[5].title}`, value: `id para buscar: ${category[5].id}` },
      { name: `${category[6].title}`, value: `id para buscar: ${category[6].id}` },
      { name: `${category[7].title}`, value: `id para buscar: ${category[7].id}` },
      { name: `${category[8].title}`, value: `id para buscar: ${category[8].id}` },
      { name: `${category[9].title}`, value: `id para buscar: ${category[9].id}` },
      { name: `${category[10].title}`, value: `id para buscar: ${category[10].id}` },
      { name: `${category[11].title}`, value: `id para buscar: ${category[11].id}` },
      { name: `${category[12].title}`, value: `id para buscar: ${category[12].id}` },
      { name: `${category[13].title}`, value: `id para buscar: ${category[13].id}` },
      { name: `${category[14].title}`, value: `id para buscar: ${category[14].id}` },
      { name: `${category[15].title}`, value: `id para buscar: ${category[15].id}` },
      { name: `${category[16].title}`, value: `id para buscar: ${category[16].id}` },
      { name: `${category[17].title}`, value: `id para buscar: ${category[17].id}` },
      { name: `${category[18].title}`, value: `id para buscar: ${category[18].id}` },
      { name: `${category[19].title}`, value: `id para buscar: ${category[19].id}` },
      { name: `${category[20].title}`, value: `id para buscar: ${category[20].id}` },
      { name: `${category[21].title}`, value: `id para buscar: ${category[21].id}` },
      { name: `${category[22].title}`, value: `id para buscar: ${category[22].id}` },
      { name: `${category[23].title}`, value: `id para buscar: ${category[23].id}` },
      { name: `${category[24].title}`, value: `id para buscar: ${category[24].id}` },
    );
  return exampleEmbed;
};

module.exports = {
  data: new SlashCommandBuilder()
    .setName('filtrar-categoria')
    .setDescription('Escribe la categoria que desees buscar')
    .addStringOption(option =>
      option
        .setName('categoria')
        .setDescription('escribe una categoria')
        .setRequired(true)
    )
  ,
  async execute(interaction) {
    await interaction.deferReply();
    try {
      const category = interaction.options.getString('categoria');
      const { data: responseCategory } = await axios.get(`https://www.freetogame.com/api/games?category=${category}`);
      const embed = createEmbed({ category: responseCategory });
      await interaction.editReply({ embeds: [embed] });
    } catch (error) {
      await interaction.editReply('Escribe una categoria valida');
      console.log(error);
    }
  },
};