<template>
  <div class="page_container">
    首页
  </div>
</template>

<script>
  import { apiDemo } from '@/api/apiDemo'
  import { mapGetters } from 'vuex'
  export default {
    name: 'index',
    computed: {
      ...mapGetters(['size', 'initData'])
    },
    data () {
      return {
        table_list: [

        ],
      }
    },
    methods: {

    }
  }
</script>

<style lang="scss">

</style>
