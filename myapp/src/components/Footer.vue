<template>
  <footer>
    <p>{{ copyright }}</p>
  </footer>
</template>

<script>
export default {
  data() {
    return {
      copyright: "Copyright @ 2023"
    };
  }
};
</script>
<style scoped>
footer {
  background: #222;
  padding: 6px;
  margin-top: 180px;
}
p {
  color: lightgreen;
  text-align: center;
}
</style>
