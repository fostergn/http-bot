<template>
  <section class="form">
    <label>SAMPLE INPUT: {{ $store.state.sampleInput }}</span></label>
    <form v-on:submit.prevent="">
      <div class="some_fake_key">
        <div class="field">
          <label class="label">Name</label>
          <div class="control">
            <input v-model="$store.state.return_value.name" class="input" type="text" placeholder="Text input">
            <p>name is: {{ $store.state.return_value.name }}</p>
          </div>
        </div>
        <div>
          <div>
            <label class="label">Content Type: (should just be a header like postman does)</label>
            <select v-model="$store.state.return_value.request_content_type">
              <option value="application/json">application/json</option>
              <option value="application/x-www-form-urlencoded">application/x-www-form-urlencoded</option>
            </select>
            <span>Selected content_type: {{ $store.state.return_value.request_content_type }}</span>
          </div>
        </div>
        <div>
          <span>Headers</span>
        </div>
        <div class="col">
          <div class="key-value-group" style="float: left;">
            <input class="key" type="text" style="width: 200px;" />
            <input class="value" type="text" style="width: 200px;" />
            <a href="#" class="btn selector tiny light-gray">Add Field</a>
            <ul class="selector-list fancy-scrollbar fields-subject display-none">
              <li><a><span>Field Name</span></a></li>
            </ul>
          </div>
          <div class="buttons key-value-buttons" style="float: right;">
            <a class="icon icon-remove-button btn-remove" title="Remove this key"></a>
            <a class="icon icon-add-button btn-add" title="Add a new Key"></a>
          </div>
        </div>
        <div>
          <div class="col">
            <span>Method</span>
            <select v-model="$store.state.return_value.request_method">
              <option value="GET">GET</option>
              <option value="POST">POST</option>
              <option value="PUT">PUT</option>
              <option value="DELETE">DELETE</option>
            </select>
            <span>Selected request_method: {{ $store.state.return_value.request_method }}</span>
          </div>
        </div>
      </div>
     <div class="field is-grouped">
      <div class="control">
        <button id="btn_integration_submit" class="button">
          Submit
        </button>
      </div>
    </div>
    </form>
  </section>
</template>

<script>

module.exports = {

  mounted: function() {

    console.log(`HTTP RULES COMPONENT IS MOUNTED`);
  }
}
</script>

