<script>
export default {
  props: {
    user_account: String,
  },
  data() {
    return {
      count: 0,
    };
  },
  methods: {
    signOut() {
      localStorage.clear();
      this.$router.push({ name: "Login" });
    },
  },
};
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container">
      <router-link class="navbar-brand" :to="{ name: 'Home' }"
        >Restaurant Reviewer</router-link
      >
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navmenu"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navmenu">
        <ul class="navbar-nav ms-auto">
          <li v-if="user_account" class="nav-item">
            <a
              href="#"
              @click="signOut"
              class="nav-link users-link disabled logged-in"
              >{{ user_account }}</a
            >
          </li>
          <li v-if="user_account" class="nav-item">
            <a href="#" @click="signOut" class="nav-link users-link"
              >Sign Out</a
            >
          </li>
          <li v-if="!user_account" class="nav-item">
            <router-link class="nav-link users-link" :to="{ name: 'Signup' }"
              >Sign Up</router-link
            >
          </li>
          <li v-if="!user_account" class="nav-item">
            <router-link class="nav-link users-link" :to="{ name: 'Login' }"
              >Login</router-link
            >
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.nav-link {
  margin: 10px;
  margin-left: 0px;
}

nav-link:hover {
  background-color: #ffc107;
  border-radius: 2px;
}

.logged-in {
  color: #ffc107 !important;
}
</style>