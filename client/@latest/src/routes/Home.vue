<script>
import Header from "../components/Header.vue";
import AddRestaurant from "../components/AddRestaurant.vue";
import Showcase from "../components/Showcase.vue";
import Footer from "../components/Footer.vue";

import RestaurantFinder from "../apis/RestaurantFinder.js";

export default {
  components: {
    Header,
    AddRestaurant,
    Showcase,
    Footer,
  },
  data() {
    return {
      user: null,
      reviewed_restaurants: [],
      admin: false,
    };
  },
  async mounted() {
    try {
      const logged_in = localStorage.getItem("user");
      if (logged_in) this.user = logged_in;
      const results = await RestaurantFinder.get("/");
      const { data } = results;
      this.reviewed_restaurants = data.data.restaurants;

      if (this.user === "h3champ@gmail.com") {
        this.admin = true;
      } else {
        this.admin = false;
      }
    } catch (err) {
      console.log(err);
    }
  },
  methods: {
    deleteRestaurant(id) {
      RestaurantFinder.delete(`/${id}`);
      this.reviewed_restaurants.forEach((restaurant, index) => {
        if (restaurant.id === id) {
          this.reviewed_restaurants.splice(index, 1);
          console.log(
            `Removed: ${restaurant.name}\nLocation: ${restaurant.location}\nID: ${id}`
          );
        }
      });
    },
    async updateRestaurants() {
      try {
        const result = await RestaurantFinder.get("/");
        console.log(result);
        const {
          data: { data },
        } = result;
        const listOfRestaurants = data.restaurants;
        const last = listOfRestaurants[listOfRestaurants.length - 1];
        this.reviewed_restaurants.unshift(last);
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>



<template>
  <div class="home">
    <Header :user_account="user" />
    <Showcase />
    <AddRestaurant @updated="updateRestaurants" />

    <div class="container">
      <div
        class="
          row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5
        "
      >
        <div
          class="col mt-4 justify-content-center"
          v-for="(item, index) in reviewed_restaurants"
          :key="index"
        >
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">{{ item.name }}</h5>
              <p class="card-text">{{ item.location }}</p>
              <p class="card-text">database ID: {{ item.id }}</p>
            </div>
            <div class="card-footer bg-light text-center">
              <button
                v-if="admin"
                class="btn btn-sm btn-rounded"
                @click="deleteRestaurant(item.id)"
              >
                Delete
              </button>
              <router-link
                class="btn btn-sm btn-rounded"
                :to="{ name: 'About', params: { id: item.id } }"
                >View</router-link
              >
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<style scoped>
.btn {
  background-color: #6f42c1;
  color: white;
  margin: 4px;
}

.card:hover {
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
}

.background-picture {
  object-fit: contain;
}
</style>