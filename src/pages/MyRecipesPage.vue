<template>
  <div class="myrecipes-container">
    <RecipePreviewList
        ref="myrecipes"
        title="My Recipes"
        :recipes="myRecipes"
        class="MyRecipes"
    />
  </div>
</template>

<script>
import axios from 'axios';
import RecipePreviewList from '../components/RecipePreviewList.vue';

export default {
  components: {
    RecipePreviewList
  },
  data() {
    return {
      myRecipes: []
    };
  },
  async created() {
    try {
      const [recipesResponse, watchedResponse] = await Promise.all([
        axios.get("http://localhost:80/users/myRecipes", { withCredentials: true }),
        axios.get("http://localhost:80/users/lastWatched", {
          params: { limit: 10 },
          withCredentials: true
        })
      ]);

      const watchedIds = new Set(watchedResponse.data.map(r => r.id));

      this.myRecipes = recipesResponse.data.map(r => ({
        id: r.recipeId,
        name: r.title,
        time: r.preparationTime,
        popularity: 0,
        glutenFree: r.glutenFree || false,
        vegetarian: r.vegetarian || false,
        vegan: r.vegan || false,
        mainImage: r.imageUrl,
        wasWatched: watchedIds.has(r.recipeId)
      }));
    } catch (error) {
      console.error("Failed to load recipes or watched data:", error);
    }
  }

};
</script>

<style scoped lang="scss">
.myrecipes-container {
  max-width: 1200px;
  margin: 4rem auto;
  padding: 2rem;
  background: linear-gradient(to right, #f8fafc, #eef2f7);
  border-radius: 16px;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.06);
  font-family: 'Poppins', sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.MyRecipes {
  width: 100%;
}
</style>

