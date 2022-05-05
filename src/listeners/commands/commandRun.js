'use strict';

const { Listener } = require('@sapphire/framework');
const { resolveKey } = require('@sapphire/plugin-i18next');

module.exports = class extends Listener {
  async run(message, cmd) {
    this.container.logger.info(
      await resolveKey(message, 'console:command', {
        author: message.author.tag,
        cmd: cmd.name,
      }),
    );
  }
};
