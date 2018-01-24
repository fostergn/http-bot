<div class="bot-credentials-input" id="credentials-http-bot">
    <div class="full-padding gray-bg">
    <p>Add credentials from your HTTP Request below.</p>
  </div>
  <form class="form-modal sixhundred bottom-margin">
    <div class="clearfix view-input">
      <label for="bot_name">Integration Name</label>
      <input id="bot_name" name="bot_name" type="text">
    </div>
    <div class="clearfix view-input">
      <label for="scheme">Scheme</label>
      <select id="scheme" name="scheme" style="width: 400px;">
        <option value=""></option>
        <option value="basic">Basic</option>
        <option value="bearer">Bearer</option>
      </select>
    </div>
    <div class="clearfix view-input">
      <label for="credentials">Credentials</label>
      <input id="credentials" name="credentials" type="text">
    </div>
  </form>
</div>