const Discord = require("discord.js");
const {
  EMBED_COLOR
} = require("../../config");

module.exports = {
  name: "ping",
  description: "says ping!",
  execute(message, args) {
    const mpermission = message.channel.permissionsFor(message.client.user);
    if (!message.guild.me.hasPermission(["SEND_MESSAGES"]) || !mpermission.has(["SEND_MESSAGES"])) return;
    var ping = Date.now() - message.createdTimestamp + " ms";
    const embed = new Discord.MessageEmbed()
      .setTitle(`Pong!`)
      .addField("📶 Latency", `\`${ping}\``, true)
      .setColor(EMBED_COLOR);
    message.channel.send(embed).catch(console.error);
  }
};