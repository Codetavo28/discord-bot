const { default: axios } = require('axios');
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');


const createEmbed = ({ country, weather }) => {
  const aaa = encodeURIComponent(country.translations.spa.common);
  console.log(weather.weather[0].icon);
  let population = (parseInt(country.population)).toLocaleString();
  const exampleEmbed = new EmbedBuilder()
    .setColor('Random')
    .setTitle(country.name.common)
    .setURL(`https://es.wikipedia.org/wiki/${aaa}`)
    .setDescription('Datos en tiempo real')
    .setThumbnail(`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`)
    .addFields(
      { name: 'Capital', value: `${country.capital[0]}`, inline: true },
      { name: 'Poblacion', value: `${population}`, inline: true },
      { name: 'Region', value: `${country.region}`, inline: true },
      { name: 'Clima', value: `${weather.weather[0].main}`, inline: true },
      { name: 'Temperatura', value: `${weather.main.temp}`, inline: true }
    )
    .setImage(country.flags.png);
  return exampleEmbed;
};

module.exports = {
  data: new SlashCommandBuilder()
    .setName('buscar-pais')
    .setDescription('Busca un pais de tu preferencia')
    .addStringOption(option =>
      option
        .setName('pais')
        .setDescription('escribe un pais')
        .setRequired(true)
    )
  ,
  async execute(interaction) {
    await interaction.deferReply();
    try {
      const country = interaction.options.getString('pais');
      const { data: responseCountry } = await axios.get(`https:restcountries.com/v3.1/name/${country}`);
      const { data: responseWeather } = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${responseCountry[0].latlng[0]}&lon=${responseCountry[0].latlng[1]}&appid=bab0fa0164cf958fbeeb3b6a59f25f6f&units=metric`);
      const embed = createEmbed({ country : responseCountry[0], weather : responseWeather });
      await interaction.editReply({ embeds: [embed] });
    } catch (error) {
      await interaction.editReply('Ese pais no existe, pendejo!');
      console.log(error);
    }
  },
};