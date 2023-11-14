const { default: axios } = require('axios');
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

const createEmbed = ({ platform }) => {
  const exampleEmbed = new EmbedBuilder()
    .setColor('Random')
    .setTitle(platform[0].platform)
    .addFields(
      { name: `${platform[0].title}`, value: `id para buscar: ${platform[0].id}` },
      { name: `${platform[1].title}`, value: `id para buscar: ${platform[1].id}` },
      { name: `${platform[2].title}`, value: `id para buscar: ${platform[2].id}` },
      { name: `${platform[3].title}`, value: `id para buscar: ${platform[3].id}` },
      { name: `${platform[4].title}`, value: `id para buscar: ${platform[4].id}` },
      { name: `${platform[5].title}`, value: `id para buscar: ${platform[5].id}` },
      { name: `${platform[6].title}`, value: `id para buscar: ${platform[6].id}` },
      { name: `${platform[7].title}`, value: `id para buscar: ${platform[7].id}` },
      { name: `${platform[8].title}`, value: `id para buscar: ${platform[8].id}` },
      { name: `${platform[9].title}`, value: `id para buscar: ${platform[9].id}` },
      { name: `${platform[10].title}`, value: `id para buscar: ${platform[10].id}` },
      { name: `${platform[11].title}`, value: `id para buscar: ${platform[11].id}` },
      { name: `${platform[12].title}`, value: `id para buscar: ${platform[12].id}` },
      { name: `${platform[13].title}`, value: `id para buscar: ${platform[13].id}` },
      { name: `${platform[14].title}`, value: `id para buscar: ${platform[14].id}` },
      { name: `${platform[15].title}`, value: `id para buscar: ${platform[15].id}` },
      { name: `${platform[16].title}`, value: `id para buscar: ${platform[16].id}` },
      { name: `${platform[17].title}`, value: `id para buscar: ${platform[17].id}` },
      { name: `${platform[18].title}`, value: `id para buscar: ${platform[18].id}` },
      { name: `${platform[19].title}`, value: `id para buscar: ${platform[19].id}` },
      { name: `${platform[20].title}`, value: `id para buscar: ${platform[20].id}` },
      { name: `${platform[21].title}`, value: `id para buscar: ${platform[21].id}` },
      { name: `${platform[22].title}`, value: `id para buscar: ${platform[22].id}` },
      { name: `${platform[23].title}`, value: `id para buscar: ${platform[23].id}` },
      { name: `${platform[24].title}`, value: `id para buscar: ${platform[24].id}` },
    );
  return exampleEmbed;
};

module.exports = {
  data: new SlashCommandBuilder()
    .setName('filtrar-plataforma')
    .setDescription('Escribe una plataforma')
    .addStringOption(option =>
      option
        .setName('plataforma')
        .setDescription('browser o pc')
        .setRequired(true)
    )
  ,
  async execute(interaction) {
    await interaction.deferReply();
    try {
      const platform = interaction.options.getString('plataforma');
      const { data: responsePlatform } = await axios.get(`https://www.freetogame.com/api/games?platform=${platform}`);

      const embed = createEmbed({ platform: responsePlatform });
      await interaction.editReply({ embeds: [embed] });
    } catch (error) {
      await interaction.editReply('eso no es valido');
      console.log(error);
    }
  },
};