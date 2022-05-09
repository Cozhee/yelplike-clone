<script>
import RestaurantsFinder from "../apis/RestaurantFinder.js";

export default {
  data() {
    return {
      name: "",
      location: "",
      price_range: "Price Range",
    };
  },
  emits: {
    updated(payload) {
      if (payload.name && payload.location && payload.price_range) {
        return true;
      } else {
        return false;
      }
    },
  },
  methods: {
    async submitRestaurantForm() {
      const data = {
        name: this.name,
        location: this.location,
        price_range: this.price_range,
      };

      if (this.name && this.location && this.price_range >= 1) {
        try {
          await RestaurantsFinder.post("/", data);
          this.$emit("updated", data);
        } catch (err) {
          console.log(err);
        }
      } else {
        return false;
      }

      this.name = "";
      this.location = "";
      this.price_range = "";
    },
  },
};
</script>

<template>
  <div class="container-fluid" style="width: 75%">
    <form @submit.prevent="submitRestaurantForm" class="my-5">
      <h3 class="text-center">
        Add your restaurant name, location, and price here
      </h3>
      <div class="row">
        <div class="input-group mb-6">
          <div class="col col-md-6 col-lg-4 h-100">
            <input
              v-model="name"
              type="text"
              class="form-control h-100"
              placeholder="Restaurant name"
            />
          </div>

          <div class="col-12 col-md-6 col-lg-4 d-flex">
            <span class="input-group-text">@</span>
            <input
              v-model="location"
              type="text"
              class="form-control h-100"
              placeholder="Location"
            />
          </div>

          <div class="col-12 col-md-6 col-lg-2">
            <select
              v-model="price_range"
              class="h-100 form-select text-center"
              aria-placeholder="Price Range"
            >
              <option selected>Price Range</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
          <button
            type="submit"
            class="col-12 col-md-6 col-lg-2 btn btn-warning"
          >
            Submit
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<style scoped>
.container {
  max-width: 40%;
}
</style>