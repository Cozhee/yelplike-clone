<script>
import LoginAPI from "../apis/LoginAPI.js";

export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    async login() {
      const data = {
        email: this.email,
        password: this.password,
      };

      if (this.email && this.password) {
        try {
          const results = await LoginAPI.post("", data);
          const user = results.data.data.user.email;

          localStorage.setItem("user", user);
          this.$router.push("/");
        } catch (err) {
          console.log(err);
        }
      }
    },
  },
};
</script>

<template>
  <div class="container p-3 mt-5">
    <form @submit.prevent="login" class="form-group">
      <h3 class="leader mb-4">Sign in</h3>
      <div class="mb-4">
        <input
          v-model="email"
          type="email"
          id="form2Example1"
          class="form-control"
          autocomplete="off"
        />
        <label class="form-label" for="form2Example1">Email address</label>
      </div>

      <div class="mb-4">
        <input
          v-model="password"
          type="password"
          id="password-form"
          class="form-control"
          autocomplete="off"
        />
        <label class="form-label" for="password-form">Password</label>
      </div>

      <button type="submit" class="btn btn-primary btn-block mb-4">
        Sign in
      </button>

      <div class="text-center">
        <p>Not a member? <a href="#!">Register</a></p>
      </div>
    </form>
  </div>
</template>

<style scoped>
.container {
  max-width: 400px;
  margin-bottom: 200px;
}

.form-outline {
  border: 1px solid;
}
</style>