<template>
  <el-form ref="form" :model="$store.state.values" label-width="180px">
    <h2>Knackbot</h2>
    <el-form-item
      prop="name"
      label="Activity Name">
      <el-input v-model="$store.state.values.name"></el-input>
    </el-form-item>
    <el-form-item
      prop="url"
      placeholder="Request Url"
      label="Request Url">
      <el-input v-model="$store.state.values.url"></el-input>
    </el-form-item>
    <el-form-item
      label="Request Content Type">
      <el-select
        v-model="$store.state.values.requestContentType"
        placeholder="Content Type">
        <el-option
          label="application/json"
          value="application/json"></el-option>
        <el-option
          label="application/x-www-form-urlencoded"
          value="application/x-www-form-urlencoded"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item
      prop="body"
      label="Body">
      <el-input
        type="textarea"
        v-model="$store.state.values.body"></el-input>
    </el-form-item>
    <el-form-item
      label="Method">
      <el-select
        v-model="$store.state.values.method"
        placeholder="Method">
        <el-option
          label="GET"
          value="get"></el-option>
        <el-option
          label="POST"
          value="post"></el-option>
        <el-option
          label="PUT"
          value="put"></el-option>
        <el-option
          label="DELETE"
          value="delete"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">Create</el-button>
      <el-button @click="resetForm('ruleForm')">Reset</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  module.exports = {

    methods: {
      submitForm () {},
      resetForm () {}
    },
    mounted () {

      console.log(`mounted request`)
    }
  }
</script>

<style scoped lang="scss">
  form {
    width: 100%;
  }
  .el-form-item__content > div {
    width: 100%;
  }
  label.el-form-item__label {
    display: block;
  }
</style>