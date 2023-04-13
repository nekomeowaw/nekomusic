const {
  CommandInteraction,
  PermissionFlagsBits,
  ApplicationCommandType,
} = require("discord.js");
const JUGNU = require("../../../handlers/Client");
const { Queue } = require("distube");

module.exports = {
  name: "removedupes",
  description: `ลบเพลงที่ซ้ำกันออกจากคิว`,
  userPermissions: PermissionFlagsBits.Connect,
  botPermissions: PermissionFlagsBits.Connect,
  category: "Music",
  cooldown: 5,
  type: ApplicationCommandType.ChatInput,
  inVoiceChannel: true,
  inSameVoiceChannel: true,
  Player: true,
  djOnly: true,

  /**
   *
   * @param {JUGNU} client
   * @param {CommandInteraction} interaction
   * @param {String[]} args
   * @param {Queue} queue
   */
  run: async (client, interaction, args, queue) => {
    // Code
    let msg = await interaction.followUp(
      `** ${client.config.emoji.time} กำลังลบรายการที่ซ้ำกัน 🎧 เพลงจาก Queue Wait **`
    );
    let tracks = queue.songs;
    const newtracks = [];
    for (let i = 0; i < tracks.length; i++) {
      let exists = false;
      for (j = 0; j < newtracks.length; j++) {
        if (tracks[i].url === newtracks[j].url) {
          exists = true;
          break;
        }
      }
      if (!exists) {
        newtracks.push(tracks[i]);
      }
    }
    //clear the Queue
    queue.delete();
    //now add every not dupe song again
    await newtracks.map((song, index) => {
      queue.addToQueue(song, index);
    });

    msg.edit(
      `** ${client.config.emoji.SUCCESS} ลบแล้ว 🎧 \`${newtracks.length}\` เพลงซ้ำจากคิว **`
    );
  },
};
