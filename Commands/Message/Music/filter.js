const {
  Message,
  ActionRowBuilder,
  StringSelectMenuBuilder,
  EmbedBuilder,
  PermissionFlagsBits,
} = require("discord.js");
const JUGNU = require("../../../handlers/Client");
const { Queue } = require("distube");

module.exports = {
  name: "filter",
  aliases: ["fl", "filters"],
  description: `ตั้ง Filter ในคิวตามชื่อ`,
  userPermissions: PermissionFlagsBits.Connect,
  botPermissions: PermissionFlagsBits.Connect,
  category: "Music",
  cooldown: 5,
  inVoiceChannel: true,
  inSameVoiceChannel: true,
  Player: true,
  djOnly: true,

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

    const filters = Object.keys(client.config.filters);

    const row = new ActionRowBuilder().addComponents([
      new StringSelectMenuBuilder()
        .setCustomId("filter-menu")
        .setPlaceholder("คลิกเพื่อเลือก Filters ..")
        .addOptions(
          [
            {
              label: `Off`,
              description: `คลิกเพื่อปิดการใช้งาน Filter`,
              value: "off",
            },
            filters
              .filter((_, index) => index <= 22)
              .map((value) => {
                return {
                  label: value.toLocaleUpperCase(),
                  description: `คลิกเพื่อตั้งค่า ${value} Filter`,
                  value: value,
                };
              }),
          ].flat(Infinity)
        ),
    ]);

    let msg = await message.reply({
      embeds: [
        new EmbedBuilder()
          .setColor(client.config.embed.color)
          .setTitle(`เลือกเพื่อเปิดใช้งาน Filters ...`)
          .setFooter(client.getFooter(message.author))
          .setDescription(
            `> คลิกที่เมนูแบบเลื่อนลงด้านล่างและเลือก Filter ในการเพิ่มตัวกรองในคิว !!`
          ),
      ],
      components: [row],
    });
    const collector = await msg.createMessageComponentCollector({
      // filter: (i) => i.user.id === message.author.id,
      time: 60000 * 10,
    });
    collector.on("collect", async (interaction) => {
      if (interaction.isStringSelectMenu()) {
        await interaction.deferUpdate().catch((e) => {});
        if (interaction.customId === "filter-menu") {
          if (interaction.user.id !== message.author.id) {
            return interaction.followUp({
              content: `คุณไม่ใช่ผู้เขียนการโต้ตอบนี้`,
              ephemeral: true,
            });
          }
          let filter = interaction.values[0];
          if (filter === "off") {
            queue.filters.clear();
            interaction.followUp({
              content: `${client.config.emoji.SUCCESS} คิว Filter ปิด !!`,
              ephemeral: true,
            });
          } else {
            if (queue.filters.has(filter)) {
              queue.filters.remove(filter);
            } else {
              queue.filters.add(filter);
            }
            interaction.followUp({
              content: `${
                client.config.emoji.SUCCESS
              } |คิวปัจจุบัน Filter: \`${queue.filters.names.join(", ")}\``,
              ephemeral: true,
            });
          }
        }
      }
    });
  },
};
