'use strict';

const { Precondition } = require('@sapphire/framework');
const { sendLocalized } = require('@sapphire/plugin-i18next');

module.exports = class extends Precondition {
  async run(message) {
    const devs = this.container.client.options.devs;
    return devs.includes(message.author.id)
      ? this.ok()
      : this.error(await sendLocalized(message, { keys: 'preconditions:dev' }));
  }
};
