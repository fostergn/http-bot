`use strict`;

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
    bot_values: {
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

  xit(`Can fetch data`, async () => {

    let slack_bot = new HttpBot(http_job, credentials);

    await slack_bot.fetch();

    should.exist(slack_bot, `fetch() slack_bot`);
    should.exist(slack_bot._fetch_results, `fetch() slack_bot._fetch_results`);
    should.equal(slack_bot._fetch_results.id, RECORD_ID, `slack_bot.id should be ${RECORD_ID}`);
    should.equal(slack_bot._fetch_results.field_1, `Hello World`, `slack_bot.field_1 should be 'Hello World'`);
  });

  xit(`Can parse data`, async () => {

    let expected_message_value = `:partywizard:\nHello World\n574f77bbc3731fe348d36352\nundefined\n\nno hardcoding required`;
    let slack_bot = new HttpBot(http_job, credentials);

    await slack_bot.fetch();

    await slack_bot.parse();

    should.exist(slack_bot, `parse() slack_bot`);
    should.exist(slack_bot._parse_results, `parse() slack_bot._parse_results`);
    should.exist(slack_bot._parse_results.message_value, `parse() slack_bot._parse_results.message_value`);
    should.equal(slack_bot._parse_results.message_value, expected_message_value, `message_value should be ${expected_message_value}`);
  });

  xit(`Can execute`, async () => {

    let expected_result_data = `{"attachments":[{"color":"#ff0000","mrkdwn_in":["text"],"text":":partywizard:\\nHello World\\n574f77bbc3731fe348d36352\\nundefined\\n\\nno hardcoding required"}]}`;
    let slack_bot = new HttpBot(http_job, credentials);

    await slack_bot.fetch();
    await slack_bot.parse();
    await slack_bot.execute();

    should.exist(slack_bot, `execute() slack_bot`);
    should.exist(slack_bot._execute_results, `execute() slack_bot._execute_results`);
    should.exist(slack_bot._execute_results.data, `execute() slack_bot._execute_results.data`);
    should.equal(slack_bot._execute_results.data, expected_result_data, `expected_result_data should be ${expected_result_data}`);
  });

  it(`Can BASE _execute`, async () => {

    let expected_result_data = `{"attachments":[{"color":"#ff0000","mrkdwn_in":["text"],"text":":partywizard:\\nHello World\\n574f77bbc3731fe348d36352\\nundefined\\n\\nno hardcoding required"}]}`;
    let slack_bot = new HttpBot(http_job, credentials);

    await slack_bot._execute().catch((ex) => {

      console.log('EXCEPTION TIME!');
      console.log(ex);
    });

    // should.exist(slack_bot, `execute() slack_bot`);
    // should.exist(slack_bot._execute_results, `execute() slack_bot._execute_results`);
    // should.exist(slack_bot._execute_results.data, `execute() slack_bot._execute_results.data`);
    // should.equal(slack_bot._execute_results.data, expected_result_data, `expected_result_data should be ${expected_result_data}`);
  });
});
