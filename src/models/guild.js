'use strict';

const { Schema, model } = require('mongoose');

const GuildSchema = new Schema(
  {
    guildId: { type: String, required: true },
    language: { type: String, default: 'ru-RU' },
    modRoles: { type: Array, default: [] },
  },
  { versionKey: false },
);

module.exports = model('Guild', GuildSchema);
