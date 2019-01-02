<template>
  <div class="page-wrapper login-form">
    <h2 class="login-heading">Register</h2>
    <form action="#">
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
  name: "Register",

  data() {
    return {
      name: "",
      email: "",
      password: "",
      serverErrors: "",
      successMessage: ""
    };
  },

  methods: {
    // validateBeforeSubmit() {
    //   this.$validator.validateAll().then(result => {
    //     if (result) {
    //       // eslint-disable-next-line
    //       this.register();
    //     }
    //   });
    // },

    register() {
      this.$store
      .dispatch("register", {
        name: this.name,
        email: this.email,
        password: this.password
      })
      .then(() => {
        this.successMessage = "Registered Successfully!";
        this.$router.push({
          name: "login",
          params: { dataSuccessMessage: this.successMessage }
        });
        this.$toast.success({
          title: this.successMessage,
          message: "You can login here"
        });
      })
      .catch(error => {
        this.serverErrors = Object.values(error.response.data.errors);
      });
    }
  }
};
</script>
