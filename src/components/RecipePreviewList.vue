<template>
  <div class="recipe-preview-list">
    <h3>{{ title }}:</h3>
    <div class="recipe-grid" v-if="recipesToRender.length > 0">
      <RecipePreview
          v-for="r in recipesToRender"
          :key="r.id"
          :recipe="r"
          :id="r.id"
          @favorite="markFavorite"
      />
    </div>
    <div v-else>No recipes found</div>
  </div>
</template>

<script>
import RecipePreview from "./RecipePreview.vue";

export default {
  name: "RecipePreviewList",
  components: {
    RecipePreview,
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    path: {
      type: String,
      default: null,
    },
    sort: {
      type: String,
      default: "",
    },
    recipes: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      internalRecipes: [],
    };
  },
  computed: {
    recipesToRender() {
      return this.recipes.length > 0 ? this.recipes : this.internalRecipes;
    },
  },
  mounted() {
    if (this.path) {
      this.updateRecipes();
    }
  },
  methods: {
    async updateRecipes() {
      try {
        const response = await this.axios.get(`https://hs-da.cs.bgu.ac.il/${this.path}`, {
          withCredentials: true
        });

        let raw = response.data.recipes || response.data;
        if (!Array.isArray(raw)) raw = [];

        // Fetch watched IDs
        let watchedIds = [];
        if (!this.path.includes("lastWatched")) {
          try {
            const watchedRes = await this.axios.get("https://hs-da.cs.bgu.ac.il/users/watchedIds", {
              withCredentials: true
            });
            watchedIds = watchedRes.data;
          } catch (e) {
            console.warn("Could not fetch watched recipe IDs");
          }
        }

        if (this.sort === "By time") {
          raw.sort((a, b) => a.readyInMinutes - b.readyInMinutes);
        } else if (this.sort === "By popularity") {
          raw.sort((a, b) => (b.aggregateLikes || b.popularity || 0) - (a.aggregateLikes || a.popularity || 0));
        }

        this.internalRecipes = raw.map((r) => {
          const id = r.id || r.recipeId;
          return {
            id,
            name: r.title || r.name || "Untitled",
            time: r.time || r.readyInMinutes || r.preparationTime || 0,
            popularity: r.aggregateLikes || r.popularity || 0,
            glutenFree: r.glutenFree,
            vegetarian: r.vegetarian,
            vegan: r.vegan,
            mainImage: r.image || r.mainImage || r.imageUrl || "",
            wasWatched: watchedIds.includes(id)
          };
        });
      } catch (error) {
        console.error("Failed to load recipes:", error);
        this.internalRecipes = [];
      }
    },
  },
  watch: {
    path: "updateRecipes",
    sort: "updateRecipes",
  },
};
</script>

<style lang="scss" scoped>

h3 {
  font-size: 1.8rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 1.5rem;
  text-align: center;
}

.recipePreview {
  background: #ffffff;
  border-radius: 1rem;
  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.06);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  padding: 1rem;
  height: 100%;
}

.recipePreview:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
}


.recipe-gallery {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1.5rem;
  margin-top: 1rem;
}
.recipe-preview-list {
  padding: 2rem;

  h3 {
    font-size: 1.8rem;
    font-weight: 700;
    color: #1e293b;
    margin-bottom: 1.5rem;
    text-align: center;
  }
}

.recipe-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
}

.recipe-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  max-width: 1100px;
  margin: 0 auto;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
}

.recipe-preview-list {
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  .recipe-grid {
    width: 100%;
    max-width: 1100px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;

    @media (max-width: 1024px) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media (max-width: 640px) {
      grid-template-columns: 1fr;
    }
  }
}

</style>