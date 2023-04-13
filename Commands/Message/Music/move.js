const { Message, PermissionFlagsBits } = require("discord.js");
const JUGNU = require("../../../handlers/Client");
const { Queue } = require("distube");

module.exports = {
  name: "move",
  aliases: ["mv", "nvs"],
  description: `ย้ายเพลงในคิว`,
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
    let position = Number(args[1]);
    if (!songIndex || !position) {
      return client.embed(
        message,
        `${client.config.emoji.ERROR} การใช้งานที่ไม่ถูกต้อง :: ${prefix}ย้าย <songindex> <targetindex>`
      );
    }
    if (position >= queue.songs.length || position < 0) position = -1;
    if (songIndex > queue.songs.length - 1) {
      return client.embed(
        message,
        ` **เพลงสุดท้ายในคิวมี Index: \`${queue.songs.length}\`**`
      );
    } else if (position === 0) {
      return client.embed(message, `**ไม่สามารถย้ายเพลงก่อนที่จะเล่นเพลง!**`);
    } else {
      let song = queue.songs[songIndex];
      //remove the song
      queue.songs.splice(songIndex);
      //Add it to a specific Position
      queue.addToQueue(song, position);
      client.embed(
        message,
        `📑 ย้ายแล้ว **${
          song.name
        }** ไปที่ **\`${position}th\`** วางทันทีหลังจากนั้น **_${
          queue.songs[position - 1].name
        }_!**`
      );
    }
  },
};
