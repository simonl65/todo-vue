<template>
  <div class="page-wrapper login-form">
    <h2 class="login-heading">Register</h2>
    <form action="#" @submit.prevent="register">
      <div class="form-control">
        <label for="name">Name</label>
        <input
          id="name"
          v-model="name"
          type="text"
          name="name"
          class="login-input"
        >
      </div>

      <div class="form-control">
        <label for="email">Email</label>
        <input
          id="email"
          v-model="email"
          type="text"
          name="email"
          class="login-input"
        >
      </div>

      <div class="form-control mb-more">
        <label for="password">Password</label>
        <input
          id="password"
          v-model="password"
          type="password"
          name="password"
          class="login-input"
        >
      </div>

      <div class="form-control">
        <button type="submit" class="btn-submit">Create Account</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name    : "",
      email   : "",
      password: "",
    }
  },

  methods: {
    register() {
      this.$store.dispatch("register", {
        name    : this.name,
        email   : this.email,
        password: this.password
      })
      .then(() => {
        this.$router.push({ name: "login" })
      })
    }
  }
}
</script>
