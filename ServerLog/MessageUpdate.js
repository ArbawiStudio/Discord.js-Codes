const { EmbedBuilder } = require('discord.js')

client.on('messageUpdate', async(OldMessage, NewMessage) => {
    const Channel = OldMessage.guild.channels.cache.get('')
    if(!Channel) return console.log("The Log Channel is not Found (messageUpdate)")
    Channel.send({ embeds: [
        new EmbedBuilder()
           .setAuthor({ name: OldMessage.author.tag, iconURL: OldMessage.author.displayAvatarURL() })
           .setThumbnail(OldMessage.author.displayAvatarURL())
           .addFields({ name: 'The Member', value: `${OldMessage.author}`, inline: true })
           .addFields({ name: 'The Channel', value: `${OldMessage.channel}`, inline: true })
           .addFields({ name: 'Updated At', value: `<t:${parseInt(OldMessage.createdAt)}:f>`, inline: true })
           .addFields({ name: 'Old Message', value: `\`\`\`${OldMessage.content}\`\`\``, inline: true })
           .addFields({ name: 'New Message', value: `\`\`\`${NewMessage.content}\`\`\``, inline: true })
    ]})
})