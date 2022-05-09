<script>
import Header from "../components/Header.vue";
import Signup from "../components/Signup.vue";
import Footer from "../components/Footer.vue";

export default {
  components: {
    Header,
    Signup,
    Footer,
  },
};
</script>


<template>
  <div class="sign-up">
    <Header />
    <div class="container">
      <Signup />
    </div>
    <Footer />
  </div>
</template>