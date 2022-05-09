<script>
import SignUpAPI from "../apis/SignUpAPI.js";

export default {
  data() {
    return {
      email: "",
      password: "",
      password_check: "",
    };
  },
  methods: {
    createAccount() {
      if (
        this.email &&
        this.password &&
        this.password_check &&
        this.password == this.password_check
      ) {
        const data = {
          email: this.email,
          password: this.password,
          password_check: this.password_check,
        };

        SignUpAPI.post("", data);
        console.log(
          `email: ${this.email}\npassword:${this.password}\npassword_check:${this.password_check}`
        );

        const user = this.email;
        localStorage.setItem("user", user);
        this.$router.push({ name: "Home" });
      } else {
        console.log("Information entered incorrectly");
      }
    },
  },
};
</script>

<template>
  <div class="container p-3 mt-5 align-items-center">
    <form class="form-group align-items-center">
      <h3 class="leader mb-4">Register</h3>

      <div class="mb-4">
        <input
          v-model="email"
          type="email"
          class="form-control"
          id="form-email"
        />
        <label class="form-label" for="form-email">Email address</label>
      </div>

      <div class="mb-4">
        <input v-model="password" type="password" class="form-control" />
        <label class="form-label" for="form2Example2">Password</label>
      </div>

      <div class="mb-4">
        <input v-model="password_check" type="password" class="form-control" />
        <label class="form-label" for="form2Example2">Retype password</label>
      </div>

      <!-- Submit button -->
      <button
        @click="createAccount"
        type="button"
        class="btn btn-primary btn-block mb-4"
      >
        Register
      </button>
    </form>
  </div>
</template>

<style scoped>
.container {
  max-width: 400px;
  margin-bottom: 200px;
}
</style>