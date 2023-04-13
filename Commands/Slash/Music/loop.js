const {
  CommandInteraction,
  PermissionFlagsBits,
  ApplicationCommandType,
  ApplicationCommandOptionType,
} = require("discord.js");
const JUGNU = require("../../../handlers/Client");
const { Queue } = require("distube");

module.exports = {
  name: "loop",
  description: `สลับลูปเพลง/คิว/ปิดระบบ`,
  userPermissions: PermissionFlagsBits.Connect,
  botPermissions: PermissionFlagsBits.Connect,
  category: "Music",
  cooldown: 5,
  type: ApplicationCommandType.ChatInput,
  inVoiceChannel: true,
  inSameVoiceChannel: true,
  Player: true,
  djOnly: true,
  options: [
    {
      name: "loopmode",
      description: `เลือกโหมดลูป`,
      type: ApplicationCommandOptionType.String,
      required: true,
      choices: [
        {
          name: "Track",
          value: `1`,
        },
        {
          name: "Queue",
          value: `2`,
        },
        {
          name: "Off",
          value: `0`,
        },
      ],
    },
  ],

  /**
   *
   * @param {JUGNU} client
   * @param {CommandInteraction} interaction
   * @param {String[]} args
   * @param {Queue} queue
   */
  run: async (client, interaction, args, queue) => {
    // Code
    let loopmode = Number(interaction.options.getString("loopmode"));
    await queue.setRepeatMode(loopmode);
    if (queue.repeatMode === 0) {
      return client.embed(
        interaction,
        `** ${client.config.emoji.ERROR} ปิดใช้งานลูป!! **`
      );
    } else if (queue.repeatMode === 1) {
      return client.embed(
        interaction,
        `** ${client.config.emoji.SUCCESS} เปิดใช้งานลูปเพลงแล้ว!! **`
      );
    } else if (queue.repeatMode === 2) {
      return client.embed(
        interaction,
        `** ${client.config.emoji.SUCCESS} เปิดใช้งานการวนรอบคิว!! **`
      );
    }
  },
};
