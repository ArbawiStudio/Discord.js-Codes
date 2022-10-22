const { EmbedBuilder } = require('discord.js')

client.on('messageDelete', async Message => {
    const Channel = Message.guild.channels.cache.get('')
    if(!Channel) return console.log("The Log Channel is not Found (messageDelete)")
    Channel.send({ embeds: [
        new EmbedBuilder()
           .setAuthor({ name: Message.author.tag, iconURL: Message.author.displayAvatarURL() })
           .setThumbnail(Message.author.displayAvatarURL())
           .addFields({ name: 'The Member', value: `${Message.author}`, inline: true })
           .addFields({ name: 'The Channel', value: `${Message.channel}`, inline: true })
           .addFields({ name: 'Deleted At', value: `${Message.createdAt}`, inline: true })
           .addFields({ name: 'The Message', value: `\`\`\`${Message.content || 'Not Found the Message'}\`\`\``, inline: false })
    ]}) 
})