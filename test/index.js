'use strict';

const should = require(`chai`).should(); //eslint-disable-line no-unused-vars
const HttpBot = require(`../index.js`);

describe(`HttpBot`, () => {

  const RECORD_ID = `5ac5bdae87a1b333939f856b`;

  let http_job = {
    bot_type: 'http-bot',
    "account_id": "5642358f761de55247eecfa3",
    "application_id": "5aabddb3b3423c09c9525c91",
    "knack_api_key": "e83f5290-32ba-11e8-9244-45ebe4c01672",
    "object_key": "object_1",
    record_id: RECORD_ID,
    "integration_id": "5abd5db07f1d490b8add080e",
    api_uri: `http://api.knackdev.com:3000/v1/`,
    "page_url": "http://knackdavid.knackdev.com:3000/botsonbotsonbots#home/",
    "parent_url": "http://knackdavid.knackdev.com:3000/botsonbotsonbots#",
    values: {
      "request_url" : "https://hooks.slack.com/services/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",
      "request_content_type" : "application/json",
      "name" : "some name",
      "request_body" : "{\n\"text\": \"record rule test field_1: {field_1}\"\n}",
      "request_method" : "POST",
      "action": "request"
    },
    "integration": {
      "_id" : "5ac5c41f87a1b333939f85ce",
      "account_id" : "5642358f761de55247eecfa3",
      "application_id" : "5aabddb3b3423c09c9525c91",
      "type" : "bot",
      "name" : "HTTP BIN POST",
      "service" : "http",
      "credential_id" : "5ac5c41e6394f71237a3be8a",
      "__v" : 0
    }
  };

  let credentials = {
    "_id": "5abd5daf6394f71237a3be89",
    value: [
      {
        name: `scheme`,
        value: `Basic`
      },
      {
        name: `credentials`,
        value: `QUM4ZGE5Yzc4OTFiZWYzNGMyNjcwOTcxMGJhZTMwNTc4YjpmY2YwNmE0ODAxNmZlODNkMzA4OGI4YjcxODJlYjkxMQ==`
      },
    ],
    "name": "my credential name goes here",
    "bot_type": "http",
    "application_id": "5aabddb3b3423c09c9525c91",
    "account_id": "5642358f761de55247eecfa3",
    "type": "credentials"
  }

  it(`Can fetch data`, async () => {

    let http_bot = new HttpBot(http_job, credentials);

    should.exist(http_bot, `http_bot`);

    let results = await http_bot.fetch();

    should.exist(results, `fetch() http_bot`);
    should.equal(results.id, RECORD_ID, `http_bot.id should be ${RECORD_ID}`);
    should.equal(results.field_1, `Hello World`, `http_bot.field_1 should be 'Hello World'`);
  });

  it(`Can parse data`, async () => {

    let http_bot = new HttpBot(http_job, credentials);

    should.exist(http_bot, `parse() http_bot`);

    http_bot._fetch_results = await http_bot.fetch();

    should.exist(http_bot._fetch_results, `parse() http_bot._fetch_results`);

    http_bot._parse_results = await http_bot.parse();

    should.exist(http_bot._parse_results, `parse() http_bot._parse_results`);
    should.exist(http_bot._parse_results.request_body, `parse() http_bot._parse_results.request_body`);
  });

  it(`Can BASE _execute`, async () => {

    let http_bot = new HttpBot(http_job, credentials);

    should.exist(http_bot, `http_bot`);

    let results = await http_bot._execute()

    should.exist(http_bot, `execute() http_bot`);
    should.exist(http_bot._execute_results, `execute() http_bot._execute_results`);
  });
});
