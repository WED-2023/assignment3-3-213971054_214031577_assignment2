<template>
  <div class="container">
    <div v-if="recipe">
      <div class="recipe-header mt-3 mb-4">
        <h1>{{ recipe.name }}</h1>
        <img :src="recipe.mainImage" class="center" alt="Recipe Image" />
      </div>

      <div class="recipe-body">
        <div class="wrapper">
          <div class="wrapped">
            <div class="mb-3">
              <div class="likes-section">
                <span>Likes: {{ recipe.popularity }}</span>
                <button @click="likeRecipe" class="badge like-btn">
                  👍 Like
                </button>
              </div>
              <div>Ready in {{ recipe.time }} minutes</div>
              <div>Portions for {{ recipe.numOfPortions }} people</div>
              <div v-html="recipe.summary" class="summary"></div>
              <!-- Dietary Labels -->
              <div class="diet-labels mt-2">
                <span v-if="recipe.vegan" class="badge vegan">Vegan 🌱</span>
                <span v-else-if="recipe.vegetarian" class="badge vegetarian">Vegetarian 🥕</span>
                <span v-if="recipe.glutenFree" class="badge gluten">Gluten-Free 🌾🚫</span>
              </div>

              <!-- User Interaction Indicators -->
              <div class="user-indicators mt-3">
                <span v-if="hasWatched" class="badge watched">👀 Watched</span>
                <b-button variant="primary" @click="goToPreparation">
                  🍳 Go to Preparation Page
                </b-button>

                <button
                    class="badge favorite-btn"
                    :class="{ favorited: isFavorited }"
                    @click="toggleFavorite"
                >
                  {{ isFavorited ? "❤️ Favorited" : "🤍 Add to Favorites" }}
                </button>
              </div>

            </div>

            <div class="ingr">
              Ingredients:
              <ul>
                <li v-for="(r, index) in recipe.ingredients" :key="index + '_' + r.id">
                  {{ r.original }}
                </li>
              </ul>
            </div>

            <div class="inst">
              Instructions:
              <ol>
                <li v-for="s in recipe._instructions" :key="s.number">
                  {{ s.step }}
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      recipe: null,
      hasWatched: false,
      isFavorited: false
    };
  },

  created() {
    this.loadRecipe();
  },
  methods: {
    async likeRecipe() {
      try {
        await this.axios.post(
            `https://hs-da.cs.bgu.ac.il/recipes/${this.recipe.id}/like`,
            {},
            { withCredentials: true }
        );

        this.recipe.popularity += 1;
      } catch (err) {
        console.error("Failed to like recipe:", err);
      }
    },
    goToPreparation() {
      this.$router.push({ name: 'PreparationPage', params: { id: this.recipe.id } });
    },

    async toggleFavorite() {
      try {
        await this.axios.post('https://hs-da.cs.bgu.ac.il/users/favorites', {
          recipeId: this.recipe.id
        }, { withCredentials: true });
        this.isFavorited = true;
      } catch (err) {
        console.error("Failed to favorite recipe:", err);
      }
    },
    async loadRecipe() {
      const recipeId = this.$route.params.recipeId;
      console.log("Loading recipe ID:", recipeId);

      try {
        const response = await this.axios.get(`https://hs-da.cs.bgu.ac.il/recipes/${recipeId}`);
        const recipe = response.data;

        const _instructions = recipe.analyzedInstructions?.flatMap((fstep) => {
          if (fstep.steps?.length > 0) {
            fstep.steps[0].step = `${fstep.name || ""} ${fstep.steps[0].step}`;
          }
          return fstep.steps || [];
        }) || [];

        this.recipe = {
          id: recipe.id,
          name: recipe.title,
          time: recipe.readyInMinutes,
          mainImage: recipe.image,
          popularity: recipe.popularity,
          vegan: recipe.vegan,
          vegetarian: recipe.vegetarian,
          glutenFree: recipe.glutenFree,
          summary: recipe.summary || "",
          ingredients: recipe.extendedIngredients || [],
          _instructions,
          numOfPortions: recipe.servings || 1,
        };

        this.hasWatched = recipe.wasWatched || false;
        this.isFavorited = recipe.isFavorited || false;

        // ✅ MARK AS WATCHED
        await this.axios.post("https://hs-da.cs.bgu.ac.il/users/addWatched", {
          recipeId: this.recipe.id
        }, { withCredentials: true });

        console.log("Marked recipe as watched:", this.recipe.id);
      } catch (error) {
        console.error("Failed to load recipe:", error);
        this.$router.replace("/NotFound");
      }
    }

  }
};
</script>

<style scoped>
.like-btn {
  background-color: #009688;
  color: white;
  border: none;
  margin-left: 10px;
  cursor: pointer;
  border-radius: 12px;
  font-size: 0.9em;
  padding: 6px 10px;
}

.like-btn:hover {
  background-color: #00796b;
}

.container {
  background-color: rgba(228, 140, 40, 0.786);
  border-radius: 25px;
  padding: 20px;
}

.recipe-header {
  font-family: Verdana, Tahoma, sans-serif;
  color: white;
  text-align: center;
}

.center {
  display: block;
  margin: 20px auto;
  width: 50%;
  border-radius: 12px;
  background-color: rgba(20, 18, 15, 0.827);
}

.wrapper {
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 10px;
  flex-wrap: wrap;
}

.wrapped {
  width: 75%;
  color: white;
  font-family: cursive;
}

.mb-3 {
  margin: auto;
}

.ingr,
.inst {
  margin-top: 20px;
}

.ingr li {
  position: relative;
  margin-left: 20px;
  padding-left: 20px;
  list-style: none;
}

.ingr li:before {
  content: "";
  position: absolute;
  top: 0.6em;
  left: 0;
  height: 10px;
  width: 10px;
  background: white;
  border-radius: 50%;
}

.summary >>> a {
  color: rgba(93, 47, 179, 0.767);
  text-decoration: underline;
}

.badge {
  display: inline-block;
  padding: 6px 12px;
  margin: 4px 6px 0 0;
  border-radius: 20px;
  font-size: 0.9em;
  color: white;
}

.vegan {
  background-color: #4caf50;
}

.vegetarian {
  background-color: #8bc34a;
}

.gluten {
  background-color: #ff9800;
}

.watched {
  background-color: #03a9f4;
}

.favorite-btn {
  cursor: pointer;
  background-color: #607d8b;
  border: none;
  outline: none;
  font-family: inherit;
}

.favorite-btn.favorited {
  background-color: #e91e63;
}

</style>