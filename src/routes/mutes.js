'use strict';

const { methods, Route } = require('@sapphire/plugin-api');
const { RateLimitManager } = require('@sapphire/ratelimits');
const infractions = require('../models/infractions');

module.exports = class extends Route {
  timeForRateLimit = 5 * 1000;

  RateLimitManager = new RateLimitManager(5 * 1000, 1);

  constructor(context, options) {
    super(context, {
      ...options,
      route: 'mutes',
    });
  }

  async [methods.GET](_request, response) {
    // TODO HTML RESPONSE
    const guild = '941315013510037514';
    const mutes = await infractions.find({ guildId: guild, type: 0 });
    response.text(
      `${mutes
        .map(
          mute =>
            `${mute.user} | ${mute.reason} | ${mute.createdAt.toLocaleString()} | ${mute.expiresAt.toLocaleString()}`,
        )
        .join('\n')}`,
    );
  }

  async [methods.POST](_request, response) {
    console.log(_request.body);
    const { guild, user } = _request.body;
    const mutes = await infractions.find({ guildId: guild, type: 0, user: user });
    response.json({
      mutes: mutes.map(
        mute => `${mute.reason} | ${mute.createdAt.toLocaleString()} | ${mute.expiresAt.toLocaleString()}`,
      ),
    });
  }
};
