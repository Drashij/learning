<template>
  <header>
    <h1>{{title}}</h1>
  </header>

</template>

<script>
export default {

  data() {
    return {
      title:'vue wizard'
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
</script>
<style scoped>
header{
    background: lightgreen;
    padding: 10px;
}
h1{
    color: #222;
    text-align: center;
}
</style>
