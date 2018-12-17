<template>
  <div class="login-form">
    <h2 class="login-heading">Login</h2>

    <form action="#" @submit.prevent="login">
      <div class="form-control">
        <label for="email">Email</label>
        <input id="username" v-model="username" type="email" name="username" class="login-input">
      </div>

      <div class="form-control mb-more">
        <label for="password">Password</label>
        <input id="password" v-model="password" type="password" name="password" class="login-input">
      </div>

      <div class="form-control">
        <button type="submit" class="btn-submit">Login</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "Login",

  data() {
    return {
      username: "",
      password: ""
    };
  },

  methods: {
    login() {

      // Call to Vuex:
      this.$store.dispatch("retrieveToken", {
        username: this.username,
        password: this.password
      })
      .then( () => {
        this.$router.push({ name: 'todo' })
      })
    }
  }
};
</script>

<style scoped>
</style>
