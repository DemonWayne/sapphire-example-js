'use strict';

const { SapphireClient } = require('@sapphire/framework');
const mongoose = require('mongoose');
const guild = require('../models/guild');

exports.client = class extends SapphireClient {
  constructor() {
    super({
      disableMentionPrefix: true,
      defaultPrefix: '/',
      devs: ['481344295354368020'],
      partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
      intents: ['GUILDS', 'GUILD_MEMBERS', 'GUILD_MESSAGES', 'GUILD_VOICE_STATES'],
      sweepers: { messages: { lifetime: 60, interval: 120 } },
      i18n: {
        fetchLanguage: async context => {
          if (!context.guild) return 'ru-RU';

          const guildSettings = await guild.findOne({ guildId: context.guild?.id });
          if (!guildSettings || !guildSettings.language) return 'ru-RU';
          return guildSettings.language;
        },
      },
      auth: {
        id: process.env.CLIENT_ID,
        secret: process.env.CLIENT_SECRET,
        cookie: 'SAPPHIRE_AUTH',
        redirect: 'http://localhost:4000',
        scopes: ['identify'],
        transformers: [],
      },
      prefix: '',
      origin: '*',
      listenOptions: {
        port: 4000,
      },
    });
  }

  connectDatabase() {
    mongoose.connect(
      process.env.DATABASE_URL,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
      err => {
        if (err) throw err;
        this.logger.info('[Database] MongoDB connected successfully.');
      },
    );
  }

  login() {
    this.connectDatabase();
    return super.login(process.env.DISCORD_TOKEN);
  }
};
