<script>
import Header from "../components/Header.vue";
import Login from "../components/Login.vue";
import Footer from "../components/Footer.vue";

export default {
  components: {
    Header,
    Login,
    Footer,
  },
};
</script>


<template>
  <div class="log-in">
    <Header />
    <div class="container">
      <Login />
    </div>
    <Footer />
  </div>
</template>