<template>
  <ul>
    <li v-for="item in lanList">
      <router-link to="/index">
        <img :src="item.icon" alt="">
      </router-link>
    </li>
  </ul>
</template>
<script>
  import { mapGetters,mapActions } from 'vuex'
  import types from '../vuex/type'
  export default {
    name: 'language',
    data() {
      return {
      }
    },
    computed: {
      ...mapGetters({
        lanList: types.G_lanList
      })
    },
    methods: {
      ...mapActions({
        getLanList: types.A_lanList
      })
    },
    mounted() {
      this.getLanList()
    }
  }
</script>