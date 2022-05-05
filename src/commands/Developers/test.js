'use strict';

const { Command } = require('@sapphire/framework');
const { sendLocalized } = require('@sapphire/plugin-i18next');
const { sendArgsError } = require('../../utils');

module.exports = class extends Command {
  constructor(context, options) {
    super(context, {
      ...options,
      description: 'Test command',
      preconditions: ['devOnly'],
    });
  }

  async messageRun(message, args) {
    const Arguments = [{ name: 'string', type: 'string', required: true }];
    const arg = await args.pick('string').catch(() => sendArgsError({ message, Arguments }));
    if (!arg) return;

    sendLocalized(message, { keys: 'test:success', formatOptions: { arg: arg } });
  }
};
