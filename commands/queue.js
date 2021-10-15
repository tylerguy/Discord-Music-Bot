const { GuildMember } = require("discord.js");

module.exports = {
  name: "queue",
  description: "View the queue of current songs!",

  async execute(interaction, player) {
 
        var queue = player.getQueue(interaction.guildId);
          if (typeof(queue) != 'undefined') {
            trimString = (str, max) => ((str.length > max) ? `${str.slice(0, max - 3)}...` : str);
              return void interaction.reply({
                embeds: [
                  {
                    title: 'Now Playing',
                    description: trimString(`The Current song playing is **${queue.current.title}**! \n \n **${queue}**! `, 4095),
                  }
                ]
              })
          } else {
            return void interaction.reply({
              content: 'There is no song in the queue!'
            })
          }
    }
  
};
