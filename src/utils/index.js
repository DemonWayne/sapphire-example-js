'use strict';

const { MessageEmbed } = require('discord.js');
const { resolveKey } = require('@sapphire/plugin-i18next');

exports.sendArgsError = async ({ message, Arguments }) => {
  const args = [];
  for (const arg of Arguments) {
    if (arg && arg.name) args.push(arg);
  }

  const cmd = message.content.trim().split(/ +/g)[0].toLowerCase().normalize();
  const { client, channel } = message;

  const firstString = `**${await resolveKey(message, 'args:use')}:**\n \`${cmd} ${args
    .map(a => (a.required ? `[${a.name}]` : `(${a.name})`))
    .join(' ')}\``;

  const lastString = [];
  for await (const a of args) {
    lastString.push(`**__\`${a.name}\`__:** \`${await resolveKey(message, `args:${a.type}`)}\``);
  }

  channel.send({
    embeds: [
      new MessageEmbed()
        .setColor('RED')
        .setDescription(`${firstString}\n\n**${await resolveKey(message, 'args:args')}:**\n${lastString.join('\n')}`)
        .setFooter({ text: `${await resolveKey(message, 'args:error')}`, iconURL: client.user.displayAvatarURL() }),
    ],
  });
};

exports.resolveDuration = duration =>
  parseInt(duration.slice(0, -1)) *
  { ms: 1, s: 1000, m: 1000 * 60, h: 1000 * 60 * 60, d: 1000 * 60 * 60 * 24 }[duration[duration.length - 1]];
