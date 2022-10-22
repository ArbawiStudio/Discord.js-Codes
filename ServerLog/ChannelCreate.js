const { AuditLogEvent, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js')

client.on('channelCreate', async Channel => {
    const Log = Channel.guild.channels.cache.get('')
    if(!Log) return console.log("The Log Channel is not Found (channelCreate)")

    if(Channel.type === ChannelType.GuildText) {
        var ChType = '`Text Channel`'
    } else if(Channel.type === ChannelType.GuildVoice) {
        var ChType = '`Voice Channel`'
    } else if(Channel.type === ChannelType.GuildCategory) {
        var ChType = '`Category Channel`'
    } else if(Channel.type === ChannelType.GuildAnnouncement) {
        var ChType = '`Announcement Channel`'
    } else if(Channel.type === ChannelType.GuildStageVoice) {
        var ChType = '`Voice Stage Channel`'
    } else if(Channel.type === ChannelType.PrivateThread) {
        var ChType = '`Private Thread`'
    } else if(Channel.type === ChannelType.PublicThread) {
        var ChType = '`Public Thread`'
    }

    Channel.guild.fetchAuditLogs({ type: AuditLogEvent.ChannelCreate }).then((T) => {
        const MemberID = T.entries.first().executor.id;
        const Member = `<@${MemberID}>`;
        Log.send({ embeds: [
            new EmbedBuilder()
               .setAuthor({ name: Channel.guild.name, iconURL: Channel.guild.iconURL() })
               .setTitle('▸ Channel Create ◂')
               .addFields({ name: 'Created By', value: `${Member}`, inline: true })
               .addFields({ name: 'Created At', value: `<t:${parseInt(Channel.createdAt / 1000)}:f>`, inline: true })
               .addFields({ name: 'Channel Type', value: `${ChType}`, inline: true })
        ],
        components: [
            new ActionRowBuilder() .setComponents(new ButtonBuilder() .setStyle(ButtonStyle.Link) .setLabel('Channel') .setURL(Channel.url))
        ]})
    })
})