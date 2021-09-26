const { GuildMember } = require("discord.js");

module.exports = {
  name: "nowplaying",
  description: "Get the song that is currently playing.",
  async execute(interaction, player) {
    await interaction.deferReply();
    const queue = player.getQueue(interaction.guildId);
    if (!queue || !queue.playing)
      return void interaction.followUp({
        content: "No music is being played!",
      });
    const progress = queue.createProgressBar();
    const perc = queue.getPlayerTimestamp();

    return void interaction.followUp({
      embeds: [
        {
          title: "Now Playing",
          description: `**${queue.current.title}**!`,
        },
      ],
    });
  },
};
