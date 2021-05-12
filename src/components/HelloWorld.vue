<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <div id="nav">
      <router-link
        :to="{
          name: 'Conditions',
          params: { id: 1 },
        }"
        >Conditions</router-link
      >
      |
      <a href="javascript:void(0)" title="Cerrar sesión" @click="logOut">
        <span class="text-icon">Cerrar sesión</span></a
      >
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  methods: {
    logOut() {
      localStorage.removeItem("token");
      this.$router.push({ name: "Login" });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
