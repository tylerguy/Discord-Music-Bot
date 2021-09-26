const { GuildMember } = require("discord.js");

module.exports = {
  name: "pause",
  description: "Pause current song!",
  async execute(interaction, player) {
    if (
      !(interaction.member instanceof GuildMember) ||
      !interaction.member.voice.channel
    ) {
      return void interaction.reply({
        content: "You are not in a voice channel!",
        ephemeral: true,
      });
    }

    if (
      interaction.guild.me.voice.channelId &&
      interaction.member.voice.channelId !==
        interaction.guild.me.voice.channelId
    ) {
      return void interaction.reply({
        content: "You are not in my voice channel!",
        ephemeral: true,
      });
    }
    if (!interaction.member.roles.cache.has("889708483325362248")) {
      {
        return void interaction.reply({
          content: "You don't have the required role to use this command",
          ephemeral: true,
        });
      }
    }

    await interaction.deferReply();
    const queue = player.getQueue(interaction.guildId);
    if (!queue || !queue.playing)
      return void interaction.followUp({
        content: "No music is being played!",
      });
    const success = queue.setPaused(true);
    return void interaction.followUp({
      content: success ? "Paused!" : "Something went wrong!",
    });
  },
};
