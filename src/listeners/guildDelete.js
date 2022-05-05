'use strict';

const { Listener } = require('@sapphire/framework');
const guilds = require('../models/guild');

module.exports = class extends Listener {
  async run(guild) {
    const guildDB = await guilds.findOne({ guildId: guild.id });
    if (guild && guildDB) {
      await guilds.deleteOne({ guildId: guild.id });
      this.container.logger.info(`${guild.name} removed from DataBase`);
    }
  }
};
