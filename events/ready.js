const { ActivityType } = require("discord.js");
const client = require("../index");

client.on("ready", async () => {
  console.log(`${client.user.username} ออนไลน์แล้ว`);
  client.user.setActivity({
    name: `online 24/7 : กำลังพัฒนา`,
    type: ActivityType.Watching,
  });

  // loading database
  await require("../handlers/Database")(client);

  // loading dashboard
  require("../server");

  client.guilds.cache.forEach(async (guild) => {
    await client.updateembed(client, guild);
  });
});
