const Discord = require("discord.js");
const client = new Discord.Client();
const { TOKEN, PREFIX, EMBED_COLOR, MONGO_URL } = require("./config.js")
const mongoose = require('mongoose');
const { readdirSync } = require("fs");
const { join } = require("path");

client.login(TOKEN);
client.commands = new Discord.Collection();

mongoose.connect(MONGO_URL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (error) => error
    ? console.log('Failed to connect to db!')
    : console.log('Connected to db!'));

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
  console.log(`On 📡 ${client.channels.cache.size} Channels!`);
  console.log(`On 🌎 ${client.guilds.cache.size} Servers!`);
  console.log(`With 👥 ${client.users.cache.size} Users!`)
});
client.on("warn", info => console.log(info));
client.on("error", console.error);

const generalCommandFiles = readdirSync(join(__dirname, "commands/general")).filter(file =>
  file.endsWith(".js")
);
for (const file of generalCommandFiles) {
  const command = require(join(__dirname, "commands/general", `${file}`));
  client.commands.set(command.name, command);
}

client.on("message", async message => {
  if (!message.guild) return;
  if (message.author.bot) return;
  const mpermission = message.channel.permissionsFor(message.client.user);
  if (!message.guild.me.hasPermission(["SEND_MESSAGES"]) || !mpermission.has(["SEND_MESSAGES"])) return;
  if (message.content.startsWith(PREFIX)) {
    const args = message.content
      .slice(PREFIX.length)
      .trim()
      .split(" ");
    const command = args.shift().toLowerCase();
    if (!client.commands.has(command)) return;
    try {
      client.commands.get(command).execute(message, args, client);
    } catch (error) {
      console.error(error); {
        const embed = new Discord.MessageEmbed()
          .setTitle("Command Error")
          .setDescription("⚠️ There was an error executing that command!")
          .setColor(EMBED_COLOR);
        return message.channel.send(embed).catch(console.error);
      }
    }
  }
});

module.exports = client;

require("./dashboard/app.js");