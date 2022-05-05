'use strict';
require('dotenv').config();
require('@sapphire/plugin-logger/register');
require('@sapphire/plugin-i18next/register');
require('@sapphire/plugin-api/register');
const { client } = require('./structures/Client');

new client().login(process.env.DISCORD_TOKEN);
