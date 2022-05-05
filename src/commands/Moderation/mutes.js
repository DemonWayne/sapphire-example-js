'use strict';

const { Command } = require('@sapphire/framework');
const { fetch, FetchResultTypes, FetchMethods } = require('@sapphire/fetch');
const { sendArgsError } = require('../../utils');
const { MessageEmbed } = require('discord.js');
const { resolveKey } = require('@sapphire/plugin-i18next');

module.exports = class extends Command {
  constructor(context, options) {
    super(context, {
      ...options,
      description: 'Mutes list',
      preconditions: ['GuildOnly', 'modOnly'],
    });
  }

  async messageRun(message, args) {
    const Arguments = [{ name: 'member', type: 'user', required: true }];

    const member = await args.pick('member').catch(() => sendArgsError({ message, Arguments }));
    if (!member) return;

    const { mutes } = await fetch(
      'http://localhost:4000/mutes',
      {
        method: FetchMethods.Post,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          guild: message.guildId,
          user: member.id,
        }),
      },
      FetchResultTypes.JSON,
    );

    message.reply({
      embeds: [
        new MessageEmbed()
          .setTitle(`${await resolveKey(message, 'mutes:title')} ${member.displayName || member.user.username}`)
          .setDescription(mutes.slice(0, 25).join('\n')),
      ],
    });
  }
};
