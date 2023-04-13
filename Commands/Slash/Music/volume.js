const {
  CommandInteraction,
  PermissionFlagsBits,
  ApplicationCommandType,
  ApplicationCommandOptionType,
} = require("discord.js");
const JUGNU = require("../../../handlers/Client");
const { Queue } = require("distube");

module.exports = {
  name: "volume",
  description: `เปลี่ยนปริมาณของคิวปัจจุบัน`,
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
      name: "amount",
      description: `ให้ปริมาณปริมาณเป็นตัวเลข`,
      type: ApplicationCommandOptionType.Number,
      required: true,
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
    let volume = interaction.options.getNumber("amount");
    if (volume > 250) {
      return client.embed(
        interaction,
        `${client.config.emoji.ERROR} ให้ปริมาณปริมาณระหว่าง 1 - 250  !!`
      );
    } else {
      await queue.setVolume(volume);
      client.embed(
        interaction,
        `${client.config.emoji.SUCCESS} ระดับเสียง ตั้งเป็น ${queue.volume}% !!`
      );
    }
  },
};
