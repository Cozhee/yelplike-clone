<script>
import RestaurantFinder from "../apis/RestaurantFinder.js";

import BaseAPI from "../apis/BaseAPI.js";

export default {
  data() {
    return {
      restaurant: {},
      restaurant_id: 0,
      price_range: "",
      user: null,
      review_text: null,
      email: null,
      reviews: [],
      date: "",
    };
  },
  components: {},
  async mounted() {
    this.date = Date();
    this.restaurant_id = this.$route.params.id;

    // Get restaurant with id
    const results = await RestaurantFinder.get(`/${this.restaurant_id}`);
    const { data } = results;
    this.restaurant = data.data.restaurant;
    const price = this.restaurant.price_range;

    // Get review with restaurant id
    const whoKnows = await BaseAPI.get("/review", {
      params: {
        restaurant_id: this.restaurant_id,
      },
    });
    const { data: review } = whoKnows;
    this.reviews = review.review;

    // display price_range int into dollar symbols
    if (price === 1) {
      this.price_range = "$";
    } else if (price === 2) {
      this.price_range = "$$";
    } else if (price === 3) {
      this.price_range = "$$$";
    } else if (price === 4) {
      this.price_range = "$$$$";
    } else {
      this.price_range = "$$$$$";
    }

    // Get logged_in user to update user state
    try {
      const logged_in = localStorage.getItem("user");
      if (logged_in) this.user = logged_in;
    } catch (err) {
      console.log(err);
    }
  },
  methods: {
    async createReview() {
      if (this.user) {
        try {
          const account = {
            email: this.user,
          };

          const result = await BaseAPI.post("/user", account);
          const { data } = result;
          this.id = data.user.user_id;

          if (this.review_text) {
            const theData = {
              user_id: this.id,
              review: this.review_text,
              restaurant_id: this.restaurant_id,
            };
            const user_review = await BaseAPI.post("/review", theData);

            const stateData = {
              email: this.user,
              review: this.review_text,
              restaurant_id: this.restaurant_id,
            };
            this.reviews.unshift(stateData);
          }
        } catch (err) {
          console.log(err);
        }
      } else {
        this.user = "Anonymous";

        const theData = {
          user_id: null,
          review: this.review_text,
          restaurant_id: this.restaurant_id,
        };

        this.reviews.unshift(theData);
        const user_review = await BaseAPI.post("/review", theData);
      }

      this.review_text = "";
    },
    formatDate(dateString) {
      const date = new Date(dateString);
      return date.toLocaleDateString();
    },
    placeholderDate() {
      const date = new Date();
      return date.toLocaleDateString();
    },
  },
};
</script>


<template>
  <div class="detail-page">
    <div class="container mt-4">
      <div class="row justify-content-center">
        <div class="d-flex justify-content-center">
          <div class="card text-center">
            <div class="card-header">
              {{ restaurant.location }}
            </div>
            <div class="card-body">
              <h1 class="card-title">{{ restaurant.name }}</h1>
            </div>
            <div class="card-footer text-muted">
              Price range: {{ price_range }}
            </div>
          </div>
        </div>
      </div>

      <form @submit.prevent="createReview">
        <div class="row justify-content-center mt-5">
          <div class="col-12 col-sm-10 col-md-8 col-lg-6">
            <div class="review-form">
              <label for="exampleFormControlTextarea1" class="form-label"
                >Leave a review</label
              >
              <textarea
                v-model="review_text"
                class="form-control"
                rows="3"
                type="submit"
              ></textarea>
            </div>
            <button type="submit" class="col-12 btn">Post review</button>
          </div>
        </div>
      </form>
    </div>

    <div class="container mt-5">
      <div
        v-for="(item, index) in reviews"
        :key="index"
        class="card card-review mb-4 p-1"
      >
        <div class="row d-flex justify-content-center">
          <div class="col-12 col-md-8">
            <span>
              <img
                src="https://mdbcdn.b-cdn.net/img/new/standard/city/044.webp"
                class="card-img-top"
                alt="Skyscrapers"
              />
            </span>

            <h5 v-if="item.email" class="card-title lead">
              {{ item.email }} said...
            </h5>
            <h5 v-else class="card-title lead anon">Anonymous said...</h5>

            <p class="mt-3">
              {{ item.review }}
            </p>

            <p v-if="item.date_created" class="card-footer date-created">
              Posted: {{ formatDate(item.date_created) }}
            </p>
            <p v-else class="card-footer date-created">
              Posted: {{ placeholderDate() }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped>
.container-fluid {
  background-color: rgb(226, 175, 66);
}

.text-box {
  max-width: 700px;
}

.card-header {
  background-color: #6f42c1 !important;
  color: white;
}

.btn {
  background-color: #ffc107 !important;
}

.card-img-top {
  border-radius: 50%;
  height: 69px;
  width: 69px;
}

.card-title {
  display: inline-block;
  margin-left: 15px;
}

.card-review {
  border: none;
  box-shadow: none;
}

.date-created {
  background-color: #272725 !important;
  color: white !important;
}

.anon {
  font-style: italic;
}
</style>
