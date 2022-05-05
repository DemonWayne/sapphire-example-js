'use strict';

const { Command } = require('@sapphire/framework');
const { sendLocalized } = require('@sapphire/plugin-i18next');
const infractions = require('../../models/infractions');
const { sendArgsError, resolveDuration } = require('../../utils');

module.exports = class extends Command {
  constructor(context, options) {
    super(context, {
      ...options,
      description: 'Mute command',
      preconditions: ['GuildOnly', 'modOnly'],
    });
  }

  async messageRun(message, args) {
    const Arguments = [
      { name: 'member', type: 'user', required: true },
      { name: 'duration', type: 'duration', required: true },
      { name: 'reason', type: 'reason', required: false },
    ];

    const member = await args.pick('member').catch(() => sendArgsError({ message, Arguments }));
    if (!member) return;
    const durationString = await args.pick('duration').catch(() => sendArgsError({ message, Arguments }));
    if (!durationString) return;
    const reason = await args.repeat('string').catch('None');

    const duration = resolveDuration(durationString);

    if (!member.moderatable) {
      sendLocalized(message, {
        keys: 'mute:erorr',
      });
      return;
    }

    if (member.isCommunicationDisabled()) {
      sendLocalized(message, {
        keys: 'mute:erorr_muted',
        formatOptions: { timestamp: `<t:${Math.ceil(member.communicationDisabledUntil / 1000)}:F>` },
      });
      return;
    }

    member.timeout(duration, `${reason} by ${message.author.tag}`);

    await infractions.create({
      guildId: message.guildId,
      user: member.id,
      staff: message.member.id,
      expiresAt: Date.now() + duration,
      reason: reason.toString(),
    });

    sendLocalized(message, {
      keys: 'mute:success',
      formatOptions: {
        user: member.toString(),
        timestamp: `<t:${Math.ceil((Date.now() + duration) / 1000)}:F>`,
      },
    });
  }
};
