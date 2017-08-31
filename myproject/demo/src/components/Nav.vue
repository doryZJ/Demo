<template>
  <div class="header-view">  
    111
    <div class="site">
      <el-dropdown trigger="click" @command="handleCommand">
        <span class="el-dropdown-link">
          {{site}} <i class="el-icon-caret-bottom el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="kingcore">kingcore</el-dropdown-item>
          <el-dropdown-item command="joboon">joboon</el-dropdown-item>
          <el-dropdown-item command="veegem">veegem</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'nav',
    data() {
      let site = window.localStorage['site']
      site = site || 'kingcore'
      return {
        site
      }
    },
    methods: {
      handleCommand(command) {
        this.site = command
        window.localStorage['site'] = command
        window.location.reload()
      }
    }
  }
</script>
<style lang="scss">
  
</style>