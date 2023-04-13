const { Message, PermissionFlagsBits } = require("discord.js");
const JUGNU = require("../../../handlers/Client");
const { Queue } = require("distube");

module.exports = {
  name: "loop",
  aliases: ["lp", "lop"],
  description: `สลับคิว/เพลง/ปิดโหมดเล่นซ้ำ`,
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
    let loopmode = args[0];
    let mods = ["song", "s", "queue", "q", "off"];
    if (!mods.includes(loopmode)) {
      return client.embed(
        message,
        `การใช้งานที่ไม่ถูกต้อง :: \`\`\`${mods.join(" ' ")}\`\`\``
      );
    }
    if (loopmode === "off") {
      await queue.setRepeatMode(0);
      return client.embed(
        interaction,
        `** ${client.config.emoji.ERROR} ปิดใช้งานลูป!! **`
      );
    } else if (loopmode === "song" || loopmode === "s") {
      await queue.setRepeatMode(1);
      return client.embed(
        interaction,
        `** ${client.config.emoji.SUCCESS} เปิดใช้งานลูปเพลงแล้ว!! **`
      );
    } else if (loopmode === "queue" || loopmode === "q") {
      await queue.setRepeatMode(2);
      return client.embed(
        interaction,
        `** ${client.config.emoji.SUCCESS} เปิดใช้งานการวนรอบคิว!! **`
      );
    }
  },
};
