'use strict';

const _ = require('lodash');

class Formatter {

  formatTextArea(template, data) {

    let message = `${template}`;

    _.each(data, function(val, key) {

      if (key.indexOf('_raw') > -1) {

        return;
      }

      message = message.replace(new RegExp('{' + key + '}', 'g'), val);
    });

    // id
    message = message.replace(new RegExp('{record_id}', 'g'), data.id);

    // page url
    const page_url = data.page_url || '';

    message = message.replace(new RegExp('{page_url}', 'g'), page_url);

    // parent
    const parent_url = data.parent_url || '';

    message = message.replace(new RegExp('{parent_url}', 'g'), parent_url);

    // remove missing or deleted fields
    message = message.replace(new RegExp(/{field_\d+}/g), '');

    return message;
  }

  format(type, template, data) {

    switch (type) {

      case 'textarea':

        return this.formatTextArea(template, data);
    }
  };
}

module.exports = new Formatter();
