'use strict';

const _ = require('lodash');
const request = require('request');
const rp = require('request-promise-native');
const BaseBot = require('@knack/base-bot');
const formatter = require('./formatter.js');

class HttpBot extends BaseBot {

  constructor(job, credentials) {

    super(job, credentials);
  }

  static get directory() {

    return __dirname;
  }

  static serviceName() {

    return `http`;
  }

  static actions() {

    return [
      {
        displayName: `Make a HTTP request`,
        action: `request`
      },
      {
        displayName: `DO NOT SELECT THIS`,
        action: `told-you-not-to-select-this`
      }
    ];
  }

  async parse() {

    this.logger.debug(`Parsing fetch results: ${JSON.stringify(this._fetch_results)}`);

    this._fetch_results.page_url = this.job.page_url;
    this._fetch_results.parent_url = this.job.parent_url;

    // now we must format the data into our
    // we want to take bot_defition.values, and reduce everything to keyvalue pairs and pass them to the bot execute step
    let parsed_data = {};

    _.each(this.job.values, (value, key) => {

      parsed_data[key] = formatter.format(value, this._fetch_results);
    });

    // Can we not put this in a formatter.format('plain_text') call or something?
    const regex_br_tags = /<br\s*[\/]?>/ig;

    parsed_data.request_body = parsed_data.request_body.replace(regex_br_tags, '\n');

    const regex_html_tags = /(<([^>^@]+)>)/ig;

    parsed_data.request_body = parsed_data.request_body.replace(regex_html_tags, '');

    this.logger.debug(`Parsed fetch results is: ${JSON.stringify(parsed_data)}`);

    return parsed_data;
  }

  async request() {

    let request_options = {      
      method: this.job.values.request_method,
      url: this.job.values.request_url,
      headers: {
      }
    };

    let request_body = JSON.parse(this._parse_results.request_body);

    let request_content_type = _.find(this.job.values, (value, key) => {

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
