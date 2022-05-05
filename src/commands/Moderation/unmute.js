'use strict';

const { Command } = require('@sapphire/framework');
const { sendLocalized } = require('@sapphire/plugin-i18next');
const { sendArgsError } = require('../../utils');
const infractions = require('../../models/infractions');

module.exports = class extends Command {
  constructor(context, options) {
    super(context, {
      ...options,
      description: 'Unmute command',
      preconditions: ['GuildOnly', 'modOnly'],
    });
  }

  async messageRun(message, args) {
    const Arguments = [{ name: 'member', type: 'user', required: true }];
    const member = await args.pick('member').catch(() => sendArgsError({ message, Arguments }));
    if (!member) return;

    if (!member.isCommunicationDisabled()) {
      sendLocalized(message, {
        keys: 'unmute:erorr_nomute',
      });
      return;
    }

    const mute = await infractions.find({
      guildId: message.guild.id,
      user: member.id,
    });

    await infractions.deleteOne(mute.pop());

    member.timeout(null, `Unmuted by ${message.author.tag}`);

    sendLocalized(message, {
      keys: 'unmute:success',
      formatOptions: {
        user: member.toString(),
      },
    });
  }
};
