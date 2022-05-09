<script>
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";

export default {
  data() {
    return {
      renderComponent: true,
    };
  },
  components: {
    Header,
    Footer,
  },
  methods: {},
};
</script>



<template>
  <div>
    <router-view></router-view>
  </div>
</template>


