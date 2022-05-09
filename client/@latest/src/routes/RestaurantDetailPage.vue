<script>
import RestaurantFinder from "../apis/RestaurantFinder.js";

import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
import Review from "../components/Review.vue";

export default {
  components: {
    Header,
    Footer,
    Review,
  },
  data() {
    return {
      user: null,
    };
  },
  mounted() {
    try {
      const logged_in = localStorage.getItem("user");
      if (logged_in) this.user = logged_in;
    } catch (err) {
      console.log(err);
    }
  },
};
</script>


<template>
  <div class="detail-page">
    <Header :user_account="user" />
    <div class="container">
      <Review />
    </div>
    <Footer />
  </div>
</template>



