const {
  CommandInteraction,
  ApplicationCommandType,
  PermissionFlagsBits,
} = require("discord.js");
const JUGNU = require("../../../handlers/Client");
const { Queue } = require("distube");
const { links } = require("../../../settings/config");

module.exports = {
  name: "invite",
  description: `รับลิงก์คำเชิญของฉันเพื่อเพิ่มหนู`,
  userPermissions: PermissionFlagsBits.SendMessages,
  botPermissions: PermissionFlagsBits.EmbedLinks,
  category: "Information",
  cooldown: 5,
  type: ApplicationCommandType.ChatInput,
  inVoiceChannel: false,
  inSameVoiceChannel: false,
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
    client.embed(
      interaction,
      `[\`คลิกเพื่อเชิญหนู\`](${links.inviteURL.replace(
        "BOTID",
        client.user.id
      )})`
    );
  },
};
