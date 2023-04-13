const { Message, PermissionFlagsBits } = require("discord.js");
const JUGNU = require("../../../handlers/Client");
const { Queue } = require("distube");

module.exports = {
  name: "remove",
  aliases: ["rem", "remsong"],
  description: `ลบเพลงออกจากคิวปัจจุบัน`,
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
    let songIndex = Number(args[0]);
    if (!songIndex) {
      return client.embed(
        message,
        `** ${
          client.config.emoji.ERROR
        } โปรดระบุดัชนีเพลงระหว่าง \`0\`-\`${
          queue.songs.length - 1
        }\`**`
      );
    } else if (songIndex === 0) {
      return client.embed(
        message,
        `** ${client.config.emoji.ERROR} คุณไม่สามารถลบเพลงปัจจุบันได้ **`
      );
    } else {
      let track = queue.songs[songIndex];
      queue.songs.splice(track, track + 1);
      client.embed(
        message,
        `${client.config.emoji.SUCCESS} ลบออก \`${track.name}\` เพลงจากคิว !!`
      );
    }
  },
};
