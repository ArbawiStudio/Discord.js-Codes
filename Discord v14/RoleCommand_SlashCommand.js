/*
 
/role add <member> <role>
/role remove <member> <role>
/role multiple [All / Bots / Humans] [Add / Remove] <role>  


>> ✅ Role Highest Position Error

*/


const { ApplicationCommandOptionType, ApplicationCommandType } = require('discord.js')

client.on('ready', async() => {
    await client.application.commands.set([
        {
            name: 'role',
            description: 'Role Config',
            type: ApplicationCommandType.ChatInput,
            options: [
                {
                    name: 'add',
                    description: 'Add Role to Member',
                    type: ApplicationCommandOptionType.Subcommand,
                    options: [
                        { 
                            name: 'member', 
                            description: 'Select the Member', 
                            type: ApplicationCommandOptionType.User, 
                            required: true 
                        },
                        { 
                            name: 'role', 
                            type: ApplicationCommandOptionType.Role, 
                            description: 'Select the Role', 
                            required: true 
                        }
                    ]
                },
                {
                    name: 'remove',
                    description: 'Remove Role from Member',
                    type: ApplicationCommandOptionType.Subcommand,
                    options: [
                        {
                            name: 'member',
                            description: 'Select the Member',
                            type: ApplicationCommandOptionType.User,
                            required: true
                        },
                        {
                            name: 'role',
                            description: 'Select the Role',
                            type: ApplicationCommandOptionType.Role,
                            required: true
                        }
                    ]
                },
                {
                    name: 'multiple',
                    description: 'Add/Remove Role from Members',
                    type: ApplicationCommandOptionType.Subcommand,
                    options: [
                        {
                            name: 'pick_type',
                            description: 'Pick a type',
                            type: ApplicationCommandOptionType.String,
                            choices: [
                                {
                                    name: 'All',
                                    value: 'All',
                                },
                                {
                                    name: 'Bots',
                                    value: 'Bots'
                                },
                                {
                                    name: 'Humans',
                                    value: 'Humans'
                                }
                            ],
                            required: true
                        },
                        {
                            name: 'add_or_remove',
                            description: 'Pick a type',
                            type: ApplicationCommandOptionType.String,
                            choices: [
                                {
                                    name: 'Add',
                                    value: 'Add'
                                },
                                {
                                    name: 'Remove',
                                    value: 'Remove'
                                }
                            ],
                            required: true
                        },
                        {
                            name: 'role',
                            description: 'Select the Role',
                            type: ApplicationCommandOptionType.Role,
                            required: true
                        }
                    ]
                }
            ]
        }
    ])
})

client.on('interactionCreate', async Interaction => {
    if(!Interaction.isChatInputCommand()) return;
    if(Interaction.commandName === 'role') {
        switch(Interaction.options.getSubcommand()) {
            case 'add' : {
                const Member = Interaction.options.getMember('member')
                const Role = Interaction.options.getRole('role')
                if(Interaction.member.roles.highest.position >= Role.position && Interaction.guild.ownerId !== Interaction.member.id) return Interaction.reply({ content: `🙄 - This role is higher than yours`, ephemeral: true })
                await Member.roles.add(Role)
                Interaction.reply({ content: `${Role} has been added to ${Member.user.username}` })
            }
            break;
            case 'remove' : {
                const Member = Interaction.options.getMember('member')
                const Role = Interaction.options.getRole('role')
                if(Interaction.member.roles.highest.position >= Role.position && Interaction.guild.ownerId !== Interaction.member.id) return Interaction.reply({ content: `🙄 - This role is higher than yours`, ephemeral: true })
                await Member.roles.remove(Role)
                Interaction.reply({ content: `${Role} has been removed from ${Member.user.username}` })
            }
            break;
            case 'multiple' : {
                const PickType = Interaction.options.getString('pick_type')
                const Options = Interaction.options.getString('add_or_remove')
                const Role = Interaction.options.getRole('role')
                const MembersCount = Interaction.guild.members.cache.filter((Member) => Member.user.bot).size;
                if(Interaction.member.roles.highest.position >= Role.position && Interaction.guild.ownerId !== Interaction.member.id) return Interaction.reply({ content: `🙄 - This role is higher than yours`, ephemeral: true })

                if(PickType === 'All') {
                    if(Options === 'Add') {
                        await Interaction.guild.members.cache.forEach((Member) => {
                            Member.roles.add(Role)
                        })
                        Interaction.reply({ content: `${Role} has been added to **${Interaction.guild.members.cache.size}** ${MembersCount > 1 ? 'Member' : 'Members & Bot'}` })
                    } else if(Options === 'Remove') {
                        await Interaction.guild.members.cache.forEach((Member) => {
                            Member.roles.remove(Role)
                        })
                        Interaction.reply({ content: `${Role} has been removed from **${Interaction.guild.members.cache.size}** ${MembersCount > 1 ? 'Member' : 'Members & Bot'}` })
                    }
                } else if(PickType === 'Bots') {
                    if(Options === 'Add') {
                        await Interaction.guild.members.cache.filter((Member) => Member.user.bot).forEach((Members) => {
                            Members.roles.add(Role)
                        })
                        Interaction.reply({ content: `${Role} has been added to **${MembersCount}** Bot` })
                    } else if(Options === 'Remove') {
                        await Interaction.guild.members.cache.filter((Member) => Member.user.bot).forEach((Members) => {
                            Members.roles.remove(Role)
                        })
                        Interaction.reply({ content: `${Role} has been removed from **${MembersCount}** Bot` })
                    }
                } else if(PickType === 'Humans') {
                    if(Options === 'Add') {
                        await Interaction.guild.members.cache.filter((Member) => !Member.user.bot).forEach((Members) => {
                            Members.roles.add(Role)
                        })
                        Interaction.reply({ content: `${Role} has been added to **${Interaction.guild.members.cache.filter(Member => !Member.user.bot).size}** Bot` })
                    } else if(Options === 'Remove') {
                        await Interaction.guild.members.cache.filter((Member) => !Member.user.bot).forEach((Members) => {
                            Members.roles.remove(Role)
                        })
                        Interaction.reply({ content: `${Role} has been removed from **${Interaction.guild.members.cache.filter(Member => !Member.user.bot).size}** Bot` })
                    }
                }
            }
        }
    }
})