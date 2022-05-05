'use strict';

const { Precondition } = require('@sapphire/framework');
const guilds = require('../models/guild');
const { sendLocalized } = require('@sapphire/plugin-i18next');

module.exports = class extends Precondition {
  async run(message) {
    const guild = await guilds.findOne({ guildId: message.guildId });
    return message.member.permissions.has(8n) || guild.modRoles.includes(message.author.id)
      ? this.ok()
      : this.error(await sendLocalized(message, { keys: 'preconditions:mod' }));
  }
};
