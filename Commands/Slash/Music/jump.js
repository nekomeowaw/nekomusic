const {
  CommandInteraction,
  PermissionFlagsBits,
  ApplicationCommandType,
  ApplicationCommandOptionType,
} = require("discord.js");
const JUGNU = require("../../../handlers/Client");
const { Queue } = require("distube");

module.exports = {
  name: "jump",
  description: `jump to a song in queue`,
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
      name: "index",
      description: `ข้ามไปยังเพลงในคิว`,
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
    let index = interaction.options.getNumber("index");
    let song = queue.songs[index];
    if (index > queue.songs.length - 1 || index < 0) {
      return client.embed(
        interaction,
        `${
          client.config.emoji.ERROR
        } **ตำแหน่งต้องอยู่ระหว่าง \`0\` และ \`${
          queue.songs.length - 1
        }\`!**`
      );
    } else {
      queue.jump(index).then((q) => {
        client.embed(
          interaction,
          `** ${client.config.emoji.SUCCESS} ข้ามไปที่เพลง [\`${song.name}\`](${song.url}) **`
        );
      });
    }
  },
};
