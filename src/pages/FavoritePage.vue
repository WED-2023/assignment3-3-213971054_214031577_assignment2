<template>
  <div class="favorites-container">
    <div class="favorites-wrapper">
      <h1 class="favorites-title">⭐ Your Favorite Recipes</h1>
      <RecipePreviewList
          title=""
          :recipes="mappedRecipes"
          class="FavortiesRecipes"
      />
      <div v-if="recipes.length === 0" class="empty-state">You haven't added any favorites yet.</div>
    </div>
  </div>
</template>

<script>
import RecipePreviewList from '../components/RecipePreviewList.vue';
import axios from 'axios';

export default {
  name: "FavoritePage",
  components: {
    RecipePreviewList
  },
  data() {
    return {
      recipes: []
    };
  },
  computed: {
    mappedRecipes() {
      return this.recipes.map(r => ({
        ...r,
        mainImage: r.image || r.mainImage || r.imageUrl || ''
      }));
    }
  },
  async created() {
    try {
      const { data } = await axios.get('http://localhost:80/users/favorites', {
        withCredentials: true
      });
      this.recipes = data;
    } catch (error) {
      console.error("Failed to load favorite recipes:", error);
    }
  }
};
</script>

<style scoped lang="scss">
.favorites-container {
  background: linear-gradient(to bottom, #f8fafc, #eef2f7);
  min-height: 100vh;
  padding: 4rem 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.favorites-wrapper {
  width: 100%;
  max-width: 1200px;
  background: #ffffff;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.08);
}

.favorites-title {
  font-size: 2.5rem;
  font-weight: 800;
  color: #0f172a;
  text-align: center;
  margin-bottom: 2rem;
}

.empty-state {
  text-align: center;
  font-size: 1.2rem;
  color: #64748b;
  margin-top: 2rem;
}
</style>
