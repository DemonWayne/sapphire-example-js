'use strict';

const { Argument, Resolvers } = require('@sapphire/framework');
const { isNullish } = require('@sapphire/utilities');

module.exports = class duration extends Argument {
  run(parameter, context) {
    const { value } = Resolvers.resolveString(parameter, context.message.guild);

    if (!isNullish(value) && ['ms', 's', 'm', 'h', 'd'].some(t => value.endsWith(t)) && parseInt(value.slice(0, -1))) {
      return this.ok(value);
    }

    return this.error({
      context,
      parameter,
      message: 'The specified argument is not a term.',
      identifier: 'StringNotDuration',
    });
  }
};
