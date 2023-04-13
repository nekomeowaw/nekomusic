const {
  CommandInteraction,
  PermissionFlagsBits,
  ApplicationCommandType,
} = require("discord.js");
const JUGNU = require("../../../handlers/Client");
const { Queue } = require("distube");

module.exports = {
  name: "autoresume",
  description: `ตั้งค่าการทำงานต่ออัตโนมัติในเซิร์ฟเวอร์ของคุณ`,
  userPermissions: PermissionFlagsBits.ManageGuild,
  botPermissions: PermissionFlagsBits.EmbedLinks,
  category: "Settings",
  cooldown: 5,
  type: ApplicationCommandType.ChatInput,
  cooldown: 5,
  inVoiceChannel: false,
  inSameVoiceChannel: true,
  Player: false,
  djOnly: false,

  /**
   *
   * @param {JUGNU} client
   * @param {CommandInteraction} interaction
   * @param {String[]} args
   * @param {Queue} queue
   */
  run: async (client, interaction, args, queue) => {
    // Code
    let data = await client.music.get(`${interaction.guild.id}.autoresume`);
    if (data === true) {
      await client.music.set(`${interaction.guild.id}.autoresume`, false);
      client.embed(
        interaction,
        `** ${client.config.emoji.ERROR} ปิดใช้งานระบบดำเนินการต่ออัตโนมัติ **`
      );
    } else {
      await client.music.set(`${interaction.guild.id}.autoresume`, true);
      client.embed(
        interaction,
        `** ${client.config.emoji.SUCCESS} เปิดใช้งานระบบดำเนินการต่ออัตโนมัติ **`
      );
    }
  },
};
