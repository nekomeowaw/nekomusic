const { Message, PermissionFlagsBits } = require("discord.js");
const JUGNU = require("../../../handlers/Client");
const { Queue } = require("distube");

module.exports = {
  name: "pause",
  aliases: ["pu", "pj"],
  description: `หยุดคิวเซิร์ฟเวอร์ปัจจุบันชั่วคราว`,
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
    if (!queue.paused) {
      queue.pause();
      client.embed(message, `${client.config.emoji.SUCCESS} หยุดคิวชั่วคราว !!`);
    } else {
      client.embed(
        message,
        `${client.config.emoji.ERROR} หยุดคิวชั่วคราวแล้ว !!`
      );
    }
  },
};
