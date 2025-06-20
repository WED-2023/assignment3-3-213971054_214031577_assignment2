<template>
  <div class="recipe-preview">
    <!-- Favorite Button -->
    <i ref="starIcon"
       class="glyphicon glyphicon-star-empty custom-checkbox"
       @click.stop.prevent="handleFavoriteClick"
    ></i>

    <router-link
        :to="{ name: 'recipe', params: { recipeId: id } }"
        class="card-link"
    >
      <div class="card">
        <div class="card_image">
          <img :src="recipeImageUrl" />
        </div>
        <div class="card_content">
          <h2 class="card_title">{{ recipe.name }}</h2>
          <div v-if="recipe.wasWatched" class="watched-badge">👁️ Watched</div>
          <div class="card_text">
            <ul class="recipe-overview">
              <li>
                <img src="../assets/timer.png" alt="timer" />
                {{ recipe.time }} minutes
              </li>
              <li>
                <img src="https://static.vecteezy.com/system/resources/previews/000/422/468/original/like-icon-vector-illustration.jpg" alt="likes" />
                {{ recipe.popularity }}
              </li>
              <li v-if="recipe.glutenFree">🚫 Gluten-Free</li>
              <li v-if="recipe.vegetarian">🥕 Vegetarian</li>
              <li v-if="recipe.vegan">🌿 Vegan</li>
            </ul>
            <h4>Summary:</h4>
            <div class="summary" v-html="recipe.summary"></div>
          </div>
        </div>
      </div>
    </router-link>
  </div>
</template>


<script>
export default {
  // mounted() {
  //   this.axios.get(this.recipe.image).then((i) => {
  //     this.image_load = true;
  //   });
  // },
  data() {
    return {
      image_load: true,
      checkboxId: 'unique-checkbox-id-' + Math.random().toString(36).substr(2, 9), // Generate a unique checkbox id
    };
  },
  computed: {
    recipeImageUrl() {
      try {
        // Check if 'mainImage' is available and use it as the image URL
        if (this.recipe && this.recipe.mainImage) {
          return this.recipe.mainImage;
        }
      } catch (error) {
        return "../assets/" + this.recipe.image;
      }
      // Otherwise, use the 'image' property as the image URL
      return "../assets/" + this.recipe.image;
    }
  },
  methods: {
    async handleFavoriteClick() {
      try {
        const starIcon = this.$refs.starIcon;
        const isFavorite = starIcon.classList.contains('glyphicon-star');

        // Toggle UI
        starIcon.classList.toggle('glyphicon-star-empty', isFavorite);
        starIcon.classList.toggle('glyphicon-star', !isFavorite);

        // Emit to parent
        this.$emit('favorite', this.id);

        // API call
        const url = "http://localhost:80/favorites";
        const payload = { recipeId: this.id };

        if (isFavorite) {
          await this.axios.delete(url, { data: payload });
        } else {
          await this.axios.post(url, payload, { withCredentials: true });
        }
      } catch (err) {
        console.error(err.response?.data || err.message);
      }
    }
  },
  props: {
    recipe: {
      type: Object,
      required: true
    },

    id: {
      type: Number,
      required: true
    }
    // title: {
    //   type: String,
    //   required: true
    // },
    // readyInMinutes: {
    //   type: Number,
    //   required: true
    // },
    // image: {
    //   type: String,
    //   required: true
    // },
    // aggregateLikes: {
    //   type: Number,
    //   required: false,
    //   default() {
    //     return undefined;
    //   }
    // }
  }
};
</script>

<style scoped>
.card-link {
  text-decoration: none;
  color: inherit;
  display: block;
}

.card {
  width: 100%;
  max-width: 340px;
  margin: auto;
  border-radius: 16px;
  background: white;
  overflow: hidden;
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.06);
  transition: transform 0.2s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.12);
  }
}

.card_image {
  height: 200px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.card_content {
  padding: 1.2rem;

  .card_title {
    text-align: center;
    font-size: 1.4rem;
    font-weight: bold;
    color: #1f2937;
    margin-bottom: 0.75rem;
  }

  .card_text {
    font-size: 0.95rem;
    color: #475569;

    h4 {
      margin-top: 1rem;
      font-weight: 600;
      color: #334155;
    }

    .summary {
      max-height: 90px;
      overflow-y: auto;
      background: #f8fafc;
      padding: 0.6rem;
      border-radius: 8px;
      margin-top: 0.5rem;
      font-size: 0.85rem;
    }
  }
  .recipe-overview {
    list-style: none;
    padding: 0;
    margin: 0;
    margin-bottom: 1rem;

    li {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin-bottom: 0.4rem;
      font-size: 0.95rem;

      img {
        width: 20px;
        height: 20px;
      }
    }
  }
}
</style>