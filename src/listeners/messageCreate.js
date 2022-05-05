'use strict';

const { Listener } = require('@sapphire/framework');
const guilds = require('../models/guild');

module.exports = class extends Listener {
  async run(message) {
    const guild = await guilds.findOne({ guildId: message.guild?.id });
    if (message.guild && !guild) {
      await guilds.create({ guildId: message.guild.id });
      this.container.logger.info(`${message.guild.name} added to DataBase`);
    }
  }
};
