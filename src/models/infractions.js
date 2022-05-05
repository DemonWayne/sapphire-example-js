'use strict';

const { Schema, model } = require('mongoose');

const infractionSchema = new Schema(
  {
    guildId: { type: String, required: true },
    type: { type: Number, default: 0 },
    user: { type: String, required: true },
    staff: { type: String, required: true },
    reason: { type: String, default: 'None' },
    createdAt: { type: Date, default: new Date() },
    expiresAt: { type: Date, required: true },
  },
  { versionKey: false },
);

module.exports = model('Infraction', infractionSchema);
