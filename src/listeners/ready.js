'use strict';

const { Listener } = require('@sapphire/framework');

module.exports = class extends Listener {
  run(client) {
    this.container.logger.info(`Bot started and authorized as ${client.user.tag}`);
  }
};
