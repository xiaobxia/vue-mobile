<template>
  <div>
    <mt-header title="基金"/>
    <div class="content-body">
      <div class="card" @click="toPath('/page/myNetValueLine')">
        <div class="content">
          <i class="fas fa-chart-line"></i>
        </div>
        <div class="bottom">净值曲线</div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'Fund',
  data () {
    return {
    }
  },
  mounted () {
    this.initPage()
  },

  methods: {
    initPage () {

    },
    toPath (path) {
      this.$router.push(path)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .content-body{
    padding: 30px;
  }
</style>
