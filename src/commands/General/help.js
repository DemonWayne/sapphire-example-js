'use strict';

const { Command } = require('@sapphire/framework');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Command {
  constructor(context, options) {
    super(context, {
      ...options,
      description: 'Help command',
    });
  }

  messageRun(message) {
    const commandsWithoutSort = this.container.stores.get('commands');

    const isDev = this.container.client.options.devs.includes(message.author.id);
    const fields = [];
    commandsWithoutSort.forEach(cmd => {
      if (!cmd.name || cmd.preconditions.entries.some(p => p.name === 'devOnly' && !isDev)) return;
      const field = fields.find(f => f.name === cmd.category);
      if (!field) {
        fields.push({ name: cmd.category, value: `${cmd.enabled ? '🟢' : '🔴'} ${cmd.name} - ${cmd.description}` });
      } else {
        field.value += `\n${cmd.enabled ? '🟢' : '🔴'} ${cmd.name} - ${cmd.description}`;
      }
    });

    message.reply({ embeds: [new MessageEmbed().setTitle('Help').setFields(fields)] });
  }
};
