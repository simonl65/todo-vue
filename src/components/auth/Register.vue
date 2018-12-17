<template>
  <div class="page-wrapper login-form">
    <h2 class="login-heading">Register</h2>
    <form action="#" @submit.prevent="validateBeforeSubmit">
      <!-- <div v-if="successMessage" class="success-message">{{ successMessage }}</div> -->
      <div v-if="serverErrors" class="server-error">
        <div v-for="(value, key) in serverErrors" :key="key">{{ value[0] }}</div>
      </div>

      <div class="form-control">
        <label for="name">Name</label>
        <input
          id="name"
          v-model="name"
          v-validate="'required'"
          type="text"
          name="name"
          class="login-input"
          :class="{ 'input-error': errors.has('name') }"
        >
        <span class="form-error">{{ errors.first('name') }}</span>
      </div>

      <div class="form-control">
        <label for="email">Email</label>
        <input
          id="email"
          v-model="email"
          v-validate="'required|email'"
          type="text"
          name="email"
          class="login-input"
          :class="{ 'input-error': errors.has('email') }"
        >
        <span class="form-error">{{ errors.first('email') }}</span>
      </div>

      <div class="form-control mb-more">
        <label for="password">Password</label>
        <input
          id="password"
          v-model="password"
          v-validate="'required|min:6'"
          type="password"
          name="password"
          class="login-input"
          :class="{ 'input-error': errors.has('password') }"
        >
        <span class="form-error">{{ errors.first('password') }}</span>
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
      name: "",
      email: "",
      password: "",
      serverErrors: "",
      successMessage: ""
    };
  },

  methods: {
    validateBeforeSubmit() {
      this.$validator.validateAll().then(result => {
        if (result) {
          // eslint-disable-next-line
          this.register();
        }
      });
    },

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
