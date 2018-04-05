'use strict';

const should = require(`chai`).should(); //eslint-disable-line no-unused-vars
const HttpBot = require(`../index.js`);

describe(`HttpBot`, () => {

  const RECORD_ID = `574f77bbc3731fe348d36352`;

  let http_job = {
    application_id: `574f77aea3ac2b9648426646`,
    knack_api_key: `8527f9f0-28da-11e6-b871-3931990eedb4`,
    object_key: `object_1`,
    record_id: RECORD_ID,
    api_uri: `https://api.knack.com/v1/`,
    bot_definition: {
      title: 'HTTP Bot',
      values: [
        {
          title: 'Request URL',
          key: 'request_url',
          type: 'textbox'
        },
        {
          title: 'Content Type',
          key: 'request_content_type',
          type: 'dropdown_single_select',
          options: ['application/json', 'application/x-www-form-urlencoded']
        },
        {
          title: 'Request Method',
          key: 'request_method',
          type: 'dropdown_single_select',
          options: ['GET', 'POST', 'PUT', 'DELETE']
        },
        {
          title: 'Request Body',
          key: 'request_body',
          type: 'textarea'
        }
      ]
    },
    values: {
          "request_body" : `{"To":"+1 502-592-0414","From":"+1 502-890-9540","Body":"http-bot unit test! Field 1 is: {field_1}"}`,
          "request_url": "https://api.twilio.com/2010-04-01/Accounts/AC8da9c7891bef34c26709710bae30578b/Messages.json",
          "request_method": "POST",
          "request_content_type": "application/x-www-form-urlencoded"
      }
  };

  let credentials = {
    value: [
      {
        name: `scheme`,
        value: `Basic`
      },
      {
        name: `credentials`,
        value: `QUM4ZGE5Yzc4OTFiZWYzNGMyNjcwOTcxMGJhZTMwNTc4YjpmY2YwNmE0ODAxNmZlODNkMzA4OGI4YjcxODJlYjkxMQ==`
      },
    ]
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

  it(`Can execute`, async () => {

    let expected_result_data = `{"attachments":[{"color":"#ff0000","mrkdwn_in":["text"],"text":":partywizard:\\nHello World\\n574f77bbc3731fe348d36352\\nundefined\\n\\nno hardcoding required"}]}`;
    let http_bot = new HttpBot(http_job, credentials);

    should.exist(http_bot, `http_bot`);

    http_bot._fetch_results = await http_bot.fetch();

    should.exist(http_bot._fetch_results, `parse() http_bot._fetch_results`);

    http_bot._parse_results = await http_bot.parse();

    should.exist(http_bot._parse_results, `parse() http_bot._parse_results`);

    let results = await http_bot.execute();

    should.exist(results, `execute() results`);
  });

  it(`Can BASE _execute`, async () => {

    let http_bot = new HttpBot(http_job, credentials);

    should.exist(http_bot, `http_bot`);

    let results = await http_bot._execute()

    should.exist(http_bot, `execute() http_bot`);
    should.exist(http_bot._execute_results, `execute() http_bot._execute_results`);
  });
});
