const { Message, PermissionFlagsBits } = require("discord.js");
const JUGNU = require("../../../handlers/Client");
const { Queue } = require("distube");

module.exports = {
  name: "seek",
  aliases: ["sk"],
  description: `ค้นหาเพลงปัจจุบันแล้ว`,
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
    let seek = Number(args[0]);
    if (!seek) {
      return client.embed(message, `โปรดระบุระยะเวลาการค้นหาเป็นวินาที`);
    } else {
      queue.seek(seek);
      client.embed(
        message,
        `${client.config.emoji.SUCCESS} กำลังหา \`${seek}\` วินาที !!`
      );
    }
  },
};
