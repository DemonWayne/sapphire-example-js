'use strict';

const { Listener } = require('@sapphire/framework');

module.exports = class extends Listener {
  run(error) {
    const warning = error.stack;
    this.container.logger.error(warning);
  }
};
