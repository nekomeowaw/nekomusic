const {
  Message,
  ActionRowBuilder,
  StringSelectMenuBuilder,
  EmbedBuilder,
  PermissionFlagsBits,
} = require("discord.js");
const JUGNU = require("../../../handlers/Client");
const { Queue } = require("distube");
const { numberEmojis } = require("../../../settings/config");

module.exports = {
  name: "search",
  aliases: ["sr", "find"],
  description: `ค้นหาเพลงตามชื่อ`,
  userPermissions: PermissionFlagsBits.Connect,
  botPermissions: PermissionFlagsBits.Connect,
  category: "Music",
  cooldown: 5,
  inVoiceChannel: true,
  inSameVoiceChannel: true,
  Player: false,
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
    let query = args.join(" ");
    if (!query) {
      return client.embed(message, `กรุณาระบุชื่อเพลงเพื่อค้นหา`);
    }

    let res = await client.distube.search(query, {
      limit: 10,
      retried: true,
      safeSearch: true,
      type: "video",
    });
    let tracks = res
      .map((song, index) => {
        return `\`${index + 1}\`) [\`${song.name}\`](${song.url}) \`[${
          song.formattedDuration
        }]\``;
      })
      .join("\n\n");

    let embed = new EmbedBuilder()
      .setColor(client.config.embed.color)
      .setTitle(`\`${query}\` ผลการค้นหา`)
      .setDescription(tracks.substring(0, 3800))
      //   .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
      .setFooter(client.getFooter(message.author));

    let menuraw = new ActionRowBuilder().addComponents([
      new StringSelectMenuBuilder()
        .setCustomId("search")
        .setPlaceholder(`คลิกเพื่อดูเพลงที่ดีที่สุด`)
        .addOptions(
          res.map((song, index) => {
            return {
              label: song.name.substring(0, 50),
              value: song.url,
              description: `คลิกเพื่อเล่นเพลง`,
              emoji: numberEmojis[index + 1],
            };
          })
        ),
    ]);

    message
      .reply({ embeds: [embed], components: [menuraw] })
      .then(async (msg) => {
        let filter = (i) => i.user.id === message.author.id;
        let collector = await msg.createMessageComponentCollector({
          filter: filter,
        });
        const { channel } = message.member.voice;
        collector.on("collect", async (interaction) => {
          if (interaction.isStringSelectMenu()) {
            await interaction.deferUpdate().catch((e) => {});
            if (interaction.customId === "search") {
              let song = interaction.values[0];
              client.distube.play(channel, song, {
                member: message.member,
                textChannel: message.channel,
              });
            }
          }
        });
      });
  },
};
