const { Message, PermissionFlagsBits } = require("discord.js");
const JUGNU = require("../../../handlers/Client");
const { Queue } = require("distube");

module.exports = {
  name: "resume",
  aliases: ["rsume"],
  description: `เล่นเพลงที่หยุดชั่วคราวต่อในคิว`,
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
    if (queue.paused) {
      queue.resume();
      client.embed(message, `${client.config.emoji.SUCCESS} คิวดำเนินการต่อ !!`);
    } else {
      client.embed(
        message,
        `${client.config.emoji.ERROR} คิวดำเนินการต่อแล้ว !!`
      );
    }
  },
};
