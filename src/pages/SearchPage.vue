<template>
  <div class="search-page px-4 py-6">
    <div class="max-w-7xl mx-auto">
      <!-- Header -->
      <h1 class="text-4xl font-bold text-center text-[#1a202c] mb-10">🍳 Discover Delicious Recipes</h1>

      <!-- Search Form -->
      <b-form @submit.prevent="onSearch">
        <b-row class="gy-3 mb-4">
          <b-col md="4">
            <b-form-input v-model="input" placeholder="Search for recipes..." class="rounded-xl shadow-sm py-2 px-3" />
          </b-col>
          <b-col md="2">
            <b-form-select v-model="selectedCuisine" :options="cuisinesOptions" class="rounded-xl shadow-sm" />
          </b-col>
          <b-col md="2">
            <b-form-select v-model="selectedDiet" :options="dietOptions" class="rounded-xl shadow-sm" />
          </b-col>
          <b-col md="2">
            <b-form-select v-model="selectedIntolerance" :options="intoleranceOptions" class="rounded-xl shadow-sm" />
          </b-col>
          <b-col md="2">
            <b-button type="submit" variant="primary" class="w-100 gradient-btn rounded-xl py-2">
              🔍 Search
            </b-button>
          </b-col>
        </b-row>

        <b-row class="gy-3 mb-4">
          <b-col md="6">
            <b-form-select v-model="limit" :options="limitOptions" class="rounded-xl shadow-sm" />
          </b-col>
          <b-col md="6">
            <b-form-select v-model="sort" :options="sortOptions" class="rounded-xl shadow-sm" />
          </b-col>
        </b-row>
      </b-form>

      <!-- Results -->
      <div v-if="results.length > 0">
        <h4 class="text-xl font-semibold mt-5 mb-3 text-[#2d3748]">🔎 Results</h4>
        <b-row>
          <b-col
              v-for="recipe in results"
              :key="recipe.id"
              cols="12"
              md="6"
              lg="4"
              class="d-flex"
          >
            <b-card
                :class="['mb-4 flex-fill border-0 shadow-lg hover-transform', { 'watched-recipe': watchedIds.includes(recipe.id) }]"
                :title="recipe.title"
                :img-src="recipe.image || 'https://via.placeholder.com/400x250?text=No+Image'"
                img-alt="Recipe image"
                img-top
                tag="article"
            >

            <div class="d-flex justify-content-between mb-2">
                <b-badge variant="info">{{ recipe.readyInMinutes }} min</b-badge>
              </div>
              <div class="mb-3">
                <b-badge v-if="recipe.vegetarian" variant="warning" class="me-1">Vegetarian</b-badge>
                <b-badge v-if="recipe.vegan" variant="success" class="me-1">Vegan</b-badge>
                <b-badge v-if="recipe.glutenFree" variant="danger">Gluten-Free</b-badge>
              </div>
              <router-link
                  :to="`/recipe/${recipe.id}`"
                  class="btn btn-outline-primary w-100 rounded-pill"
                  @click="markAsWatched(recipe.id)"
              >
                View Recipe
              </router-link>

            </b-card>
          </b-col>
        </b-row>
      </div>

      <div v-else-if="showResults" class="text-center text-muted mt-5">
        <p>No recipes found 😞</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { cuisinesOptions, dietOptions, intolerancesOtions } from '../assets/search-filter.js'
import store from '../store'; // Adjust path if needed

export default {
  data() {
    return {
      input: '',
      selectedCuisine: '',
      selectedDiet: '',
      selectedIntolerance: '',
      limit: 5,
      sort: '',
      cuisinesOptions: [{value: '', text: 'Cuisine'}, ...cuisinesOptions.map(c => ({value: c.toLowerCase(), text: c}))],
      dietOptions: [{value: '', text: 'Diet'}, ...dietOptions.map(d => ({value: d.toLowerCase(), text: d}))],
      intoleranceOptions: [{value: '', text: 'Intolerance'}, ...intolerancesOtions.map(i => ({
        value: i.toLowerCase(),
        text: i
      }))],
      limitOptions: [5, 10, 15],
      sortOptions: [
        {value: '', text: 'Sort by'},
        {value: 'time', text: 'By Time'},
        {value: 'popularity', text: 'By Popularity'}
      ],

      results: [],
      watchedIds: [],
      showResults: false
    }
  },

  methods: {
    async onSearch() {
      this.showResults = true;
      const params = {
        query: this.input,
        cuisine: this.selectedCuisine,
        diet: this.selectedDiet,
        intolerance: this.selectedIntolerance,
        sort: this.sort,
        limit: this.limit
      };

      try {
       const {data} = await axios.get(`${store.server_domain}/recipes/search`, {
          params,
          withCredentials: true
        });

        this.results = data;

        localStorage.setItem("lastSearch", JSON.stringify({
          input: this.input,
          selectedCuisine: this.selectedCuisine,
          selectedDiet: this.selectedDiet,
          selectedIntolerance: this.selectedIntolerance,
          limit: this.limit,
          sort: this.sort
        }));

      } catch (err) {
        console.error("Search failed:", err);
        this.results = [];
      }
    },

    async markAsWatched(recipeId) {
      try {
        await axios.post(`${store.server_domain}/users/addWatched`, { recipeId }, { withCredentials: true });

        // Optionally update the watchedIds locally
        if (!this.watchedIds.includes(recipeId)) {
          this.watchedIds.push(recipeId);
        }
      } catch (err) {
        console.error("Failed to mark as watched:", err);
      }
    }
  },
    async mounted() {
      if (!store.username) {
        alert("You must be logged in to use the search page.");
        this.$router.push("/login");
        return;
      }

      const lastSearch = localStorage.getItem("lastSearch");
      if (lastSearch) {
        const parsed = JSON.parse(lastSearch);
        this.input = parsed.input;
        this.selectedCuisine = parsed.selectedCuisine;
        this.selectedDiet = parsed.selectedDiet;
        this.selectedIntolerance = parsed.selectedIntolerance;
        this.limit = parsed.limit;
        this.sort = parsed.sort;
        await this.onSearch();
      }

      // ✅ Get watched recipe IDs
      try {
      const {data} = await axios.get(`${store.server_domain}/users/watchedIds`, {
        withCredentials: true
      });

        this.watchedIds = data;
      } catch (error) {
        console.error("Failed to load watched IDs", error);
      }
    }
  }


</script>

<style scoped>
.search-page {
  background: linear-gradient(to right, #fdfbfb, #ebedee);
  min-height: 100vh;
  font-family: 'Poppins', sans-serif;
}

.gradient-btn {
  background: linear-gradient(90deg, #00c9ff, #92fe9d);
  border: none;
  color: white;
  font-weight: bold;
  transition: transform 0.2s ease;
}

.gradient-btn:hover {
  transform: scale(1.05);
}

.hover-transform {
  transition: transform 0.2s ease;
}

.hover-transform:hover {
  transform: translateY(-5px);
}

b-card {
  border-radius: 16px;
  overflow: hidden;
}

b-badge {
  font-size: 0.75rem;
  padding: 0.35em 0.6em;
}

.watched-recipe {
  opacity: 0.85;
  border: 2px solid #10b981;
  box-shadow: 0 0 12px rgba(16, 185, 129, 0.3);
  position: relative;
}

.watched-recipe::before {
  content: '👁️ Watched';
  position: absolute;
  top: 8px;
  right: 12px;
  background: #10b981;
  color: white;
  font-size: 0.7rem;
  padding: 2px 6px;
  border-radius: 6px;
}

</style>
