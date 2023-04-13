const { Message, EmbedBuilder, PermissionFlagsBits } = require("discord.js");
const JUGNU = require("../../../handlers/Client");
const { Queue } = require("distube");

module.exports = {
  name: "nowplaying",
  aliases: ["np"],
  description: `ดูว่ากำลังเล่นอะไรอยู่`,
  userPermissions: PermissionFlagsBits.Connect,
  botPermissions: PermissionFlagsBits.Connect,
  category: "Music",
  cooldown: 5,
  inVoiceChannel: false,
  inSameVoiceChannel: false,
  Player: true,
  djOnly: false,

  /**
   *
   * @param {JUGNU} client
   * @param {Message} message
   * @param {String[]} args
   * @param {String} prefix
   * @param {Queue} queue
   */
  run: async (client, message, args, prefix, queue) => {
    // Code
    let song = queue.songs[0];

    message.reply({
      embeds: [
        new EmbedBuilder()
          .setColor(client.config.embed.color)
          .setThumbnail(song.thumbnail)
          .setAuthor({
            name: `กำลังเล่น`,
            iconURL: song.thumbnail,
            url: song.url,
          })
          .setDescription(`** [${song.name}](${song.streamURL}) **`)
          .addFields([
            {
              name: `** ระยะเวลา **`,
              value: ` \`${queue.formattedCurrentTime}/${song.formattedDuration} \``,
              inline: true,
            },
            {
              name: `** ขอเพลงโดย **`,
              value: ` \`${song.user.tag} \``,
              inline: true,
            },
            {
              name: `** ศิลปิน **`,
              value: ` \`${song.uploader.name}\``,
              inline: true,
            },
          ])
          .setFooter(client.getFooter(message.author)),
      ],
    });
  },
};
