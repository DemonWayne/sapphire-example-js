'use strict';

const { Listener } = require('@sapphire/framework');
const guilds = require('../models/guild');

module.exports = class extends Listener {
  async run(guild) {
    const guildDB = await guilds.findOsne({ guildId: guild.id });
    if (guild && !guildDB) {
      await guilds.create({ guildId: guild.id });
      this.container.logger.info(`${guild.name} added to DataBase`);
    }
  }
};
