const {
  CommandInteraction,
  PermissionFlagsBits,
  ApplicationCommandType,
  ApplicationCommandOptionType,
} = require("discord.js");
const JUGNU = require("../../../handlers/Client");
const { Queue } = require("distube");

module.exports = {
  name: "shuffle",
  description: `สลับคิวสลับ / เลิกสับเปลี่ยน`,
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
      name: "mode",
      description: `เลือกคิวสุ่ม/ยกเลิกการสุ่ม`,
      type: ApplicationCommandOptionType.String,
      required: true,
      choices: [
        {
          name: `Shuffle`,
          value: `yes`,
        },
        {
          name: `UnShuffle`,
          value: `no`,
        },
      ],
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
    let mode = interaction.options.get("mode")?.value;
    if (mode === "yes") {
      client.shuffleData.set(`สับเปลี่ยน-${queue.id}`, queue.songs.slice(1));
      queue.shuffle();
      client.embed(
        interaction,
        `${client.config.emoji.SUCCESS} Suffled ${queue.songs.length} เพลง !!`
      );
    } else if (mode === "no") {
      if (!client.shuffleData.has(`สับเปลี่ยน-${queue.id}`)) {
        return client.embed(
          interaction,
          `${client.config.emoji.ERROR} ไม่พบคิวที่มีปัญหา !!`
        );
      } else {
        const shuffleData = client.shuffleData.get(`shuffle-${queue.id}`);
        queue.songs = [queue.songs[0], ...shuffleData];
        client.shuffleData.delete(`สับเปลี่ยน-${queue.id}`);
        client.embed(
          interaction,
          `${client.config.emoji.SUCCESS} UnSuffled ${queue.songs.length} เพลง !!`
        );
      }
    }
  },
};
