'use strict';

const _ = require('lodash');
const request = require('request');
const rp = require('request-promise-native');
const BaseBot = require('../../base-bot/src/base-bot.js');
const formatter = require('./formatter.js');

class HttpBot extends BaseBot {

  constructor(job, credentials) {

    super(job, credentials);
  }

  static get directory() {

    return __dirname;
  }

  static get serviceName() {

    return `http`;
  }

  static get displayName() {

    return 'HTTP Request';
  }

  async parse() {

    this.logger.debug(`Parsing fetch results: ${JSON.stringify(this._fetch_results)}`);

    this._fetch_results.page_url = this.job.page_url;
    this._fetch_results.parent_url = this.job.parent_url;

    // now we must format the data into our "bot_definition"
    // we want to take bot_defition.values, and reduce everything to keyvalue pairs and pass them to the bot execute step
    let parsed_data = {};

    _.each(this.job.bot_definition.values, (bot_value) => {

      parsed_data[bot_value.key] = formatter.format(bot_value.type, this.job.bot_values[bot_value.key], this._fetch_results);
    });

    // Can we not put this in a formatter.format('plain_text') call or something?
    const regex_br_tags = /<br\s*[\/]?>/ig;

    parsed_data.request_body = parsed_data.request_body.replace(regex_br_tags, '\n');

    const regex_html_tags = /(<([^>^@]+)>)/ig;

    parsed_data.request_body = parsed_data.request_body.replace(regex_html_tags, '');

    this.logger.debug(`Parsed results are: ${JSON.stringify(this.parsed_data)}`);

    return parsed_data;
  }

  async execute() {

    let request_options = {      
      method: _.find(this.job.bot_values, (value, key) => {

        return key === 'request_method'
      }),
      url: _.find(this.job.bot_values, (value, key) => {

        return key === 'request_url'
      }),
      headers: {
      }
    };

    let request_body = JSON.parse(this._parse_results.request_body);

    let request_content_type = _.find(this.job.bot_values, (value, key) => {

      return key === 'request_content_type'
    });

    if (request_content_type === 'application/x-www-form-urlencoded') {

      request_options.form = request_body;

    } else {

      request_options.json = true;
      request_options.body = request_body;
    }

    let authorization_header_scheme = _.find(this.credentials.value, (credentials_value) => {

      return credentials_value.name === 'scheme';
    }).value;

    let authorizaton_header_value = _.find(this.credentials.value, (credentials_value) => {

      return credentials_value.name === 'credentials';
    }).value;

    
    request_options.headers.Authorization = `${authorization_header_scheme} ${authorizaton_header_value}`;

    this.logger.debug(`Requestion options are ${JSON.stringify(request_options)}`);

    return rp(request_options);
  }
};

module.exports = HttpBot;
