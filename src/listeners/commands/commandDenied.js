'use strict';

const { Listener } = require('@sapphire/framework');
const { sendLocalized } = require('@sapphire/plugin-i18next');

module.exports = class extends Listener {
  async run(error, cmd) {
    const { message, command } = cmd;
    if (error.precondition.name === 'NSFW') {
      await sendLocalized(message, { keys: 'preconditions:nsfw' });
      return;
    }
    if (error.precondition.name === 'Cooldown') {
      const timeLeft = parseInt(error.context.remaining) / 1000;
      await sendLocalized(message, {
        keys: 'preconditions:cooldown',
        formatOptions: {
          sec: timeLeft.toFixed(1),
          cmd: command.name,
        },
      });
    }
  }
};
