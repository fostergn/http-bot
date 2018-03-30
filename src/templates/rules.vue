<section class="form">
  <form v-on:submit.prevent="console.log('VUE FORM DATA STRINGIFIED IS:');console.log(JSON.stringify(form));">
    <div class="some_fake_key">
      <div>
        <span>
          Integration details (just showing we CAN pass data, something like object/fields more useful):
        </span>
        <span> {{ integration}} </span>
      </div>
      <div class="field">
        <label class="label">Name</label>
        <div class="control">
          <input v-model="form.name" class="input" type="text" placeholder="Text input">
          <p>name is: {{ form.name }}</p>
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
          <select v-model="form.request_method">
            <option value="GET">GET</option>
            <option value="POST">POST</option>
            <option value="PUT">PUT</option>
            <option value="DELETE">DELETE</option>
          </select>
          <span>Selected request_method: {{ form.request_method }}</span>
        </div>
      </div>
    </div>
   <div class="field is-grouped">
    <div class="control">
      <button class="button">
        Submit
      </button>
    </div>
  </div>
  </form>
</section>
