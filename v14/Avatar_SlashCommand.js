const { SlashCommandBuilder, ChatInputCommandInteraction, Client, EmbedBuilder } = require('discord.js')


module.exports = {
    data: new SlashCommandBuilder()
       .setName('avatar')
       .setDescription('Show Your Avatar or Anyone Avatar')
       .addUserOption((User) => User.setName('user').setDescription('Choose the User or Enter the ID').setRequired(false)),
    
    /**
     * @param { Client } Client
     * @param { ChatInputCommandInteraction } Interaction
     */

    run: async(Client, Interaction) => {
        const User = Interaction.options.getUser('user') || Interaction.user;
        const Embed = new EmbedBuilder()
           .setAuthor(User.tag, User.displayAvatarURL())
           .setTitle('Avatar Link')
           .setURL(User.displayAvatarURL({ size: 4096 }))
           .setImage(User.displayAvatarURL({ size: 4096 }))
           .setFooter(`Requested by ${Interaction.user.tag}`, Interaction.user.displayAvatarURL())
        Interaction.reply({ embeds: [Embed] })
    }
}