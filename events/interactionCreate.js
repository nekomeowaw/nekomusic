const client = require("../index");
const { cooldown, check_dj, databasing } = require("../handlers/functions");
const { emoji } = require("../settings/config");
const {
  ApplicationCommandOptionType,
  PermissionsBitField,
} = require("discord.js");

client.on("interactionCreate", async (interaction) => {
  // Slash Command Handling
  if (interaction.isCommand()) {
    await interaction.deferReply().catch((e) => {});
    await databasing(interaction.guildId, interaction.user.id);
    const cmd = client.commands.get(interaction.commandName);
    if (!cmd)
      return client.embed(
        interaction,
        `${emoji.ERROR} \`${interaction.commandName}\` ไม่พบคำสั่ง `
      );
    const args = [];
    for (let option of interaction.options.data) {
      if (option.type === ApplicationCommandOptionType.Subcommand) {
        if (option.name) args.push(option.name);
        option.options?.forEach((x) => {
          if (x.value) args.push(x.value);
        });
      } else if (option.value) args.push(option.value);
    }
    interaction.member = interaction.guild.members.cache.get(
      interaction.user.id
    );

    if (cmd) {
      // checking user perms
      let queue = client.distube.getQueue(interaction.guild.id);
      let voiceChannel = interaction.member.voice.channel;
      let botChannel = interaction.guild.members.me.voice.channel;
      let checkDJ = await check_dj(client, interaction.member, queue?.songs[0]);
      if (
        !interaction.member.permissions.has(
          PermissionsBitField.resolve(cmd.userPermissions)
        )
      ) {
        return client.embed(
          interaction,
          `คุณไม่ได้รับอนุญาตให้ใช้ \`${cmd.name}\` คำสั่ง!!`
        );
      } else if (
        !interaction.guild.members.me.permissions.has(
          PermissionsBitField.resolve(cmd.botPermissions)
        )
      ) {
        return client.embed(
          interaction,
          `ฉันไม่ได้รับอนุญาตให้เรียกใช้ \`${cmd.name}\` คำสั่ง!!`
        );
      } else if (cooldown(interaction, cmd)) {
        return client.embed(
          interaction,
          ` คุณอยู่ในคูลดาวน์ รอสักครู่ \`${cooldown(
            interaction,
            cmd
          ).toFixed()}\` วินาที`
        );
      } else if (cmd.inVoiceChannel && !voiceChannel) {
        return client.embed(
          interaction,
          `${emoji.ERROR} คุณต้องเข้าร่วมช่องเสียง`
        );
      } else if (
        cmd.inSameVoiceChannel &&
        botChannel &&
        !botChannel?.equals(voiceChannel)
      ) {
        return client.embed(
          interaction,
          `${emoji.ERROR} คุณต้องเข้าร่วม ${botChannel} ช่องเสียง`
        );
      } else if (cmd.Player && !queue) {
        return client.embed(interaction, `${emoji.ERROR} เพลงไม่เล่น`);
      } else if (cmd.djOnly && checkDJ) {
        return client.embed(
          interaction,
          `${emoji.ERROR} คุณไม่ใช่ดีเจและคุณไม่ใช่ผู้ขอเพลง..`
        );
      } else {
        cmd.run(client, interaction, args, queue);
      }
    }
  }

  // Context Menu Handling
  if (interaction.isContextMenuCommand()) {
    await interaction.deferReply({ ephemeral: true }).catch((e) => {});
    const command = client.commands.get(interaction.commandName);
    if (command) command.run(client, interaction);
  }

  // button handling
  if (interaction.isButton()) {
    await interaction.deferUpdate().catch((e) => {});
  }
  // menu handling
  if (interaction.isAnySelectMenu()) {
    await interaction.deferUpdate().catch((e) => {});
  }
});
