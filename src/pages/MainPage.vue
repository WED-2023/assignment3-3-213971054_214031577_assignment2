<template>
  <div class="main-page">
    <!-- Hero Banner -->
    <div class="hero-section">
      <h1 class="headline">🍽️ <span class="gradient-text">Discover Delicious Recipes</span></h1>
      <p class="subheadline">Curated meals, your taste — instantly.</p>
      <button class="cta-btn" @click="updateRecipes">🔀 Shuffle Recipes</button>
    </div>

    <!-- Main Grid Layout -->
    <section class="grid-layout" :class="{ expanded: isLoggedIn }">
      <!-- Recipes Section -->
      <div class="recipes-section">
        <h2 class="section-title">✨ Random Recipes</h2>
        <RecipePreviewList
            ref="randomList"
            class="recipe-gallery"
            path="recipes/random"
        />

        <h2 class="section-title">📌 Recently Watched</h2>
        <div class="watched-wrapper">
          <RecipePreviewList
              path="users/lastWatched"
              class="recipe-gallery"
              :class="{ blur: !isLoggedIn }"
              disabled
          />
          <div class="login-prompt" v-if="!isLoggedIn">
            🔒 Please log in to view your watched recipes.
          </div>
        </div>
      </div>

      <!-- Login Section -->
      <transition name="fade">
        <div class="auth-section glass-box" v-if="!isLoggedIn">
          <LoginPage />
        </div>
      </transition>
    </section>
  </div>
</template>

<script>
import RecipePreviewList from "../components/RecipePreviewList.vue";
import LoginPage from "./LoginPage.vue";

export default {
  components: { RecipePreviewList, LoginPage },
  computed: {
    isLoggedIn() {
      return this.$root.store?.username;
    },
  },
  methods: {
    updateRecipes() {
      this.$refs.randomList.updateRecipes();
    },
  },
};
</script>

<style scoped lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&display=swap');

.main-page {
  background: linear-gradient(to bottom, #f9fafb, #f1f5f9);
  padding: 3rem 1.5rem;
  font-family: 'Inter', sans-serif;
  color: #1f2937;
}

// === Hero Section ===
.hero-section {
  text-align: center;
  margin-bottom: 4rem;

  .headline {
    font-size: 3.5rem;
    font-weight: 800;
    margin-bottom: 0.75rem;

    .gradient-text {
      background: linear-gradient(90deg, #06b6d4, #3b82f6);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }

  .subheadline {
    font-size: 1.25rem;
    color: #64748b;
    font-weight: 500;
  }

  .cta-btn {
    margin-top: 2rem;
    padding: 0.9rem 2.4rem;
    background: linear-gradient(135deg, #3b82f6, #06b6d4);
    border: none;
    border-radius: 9999px;
    color: white;
    font-weight: 600;
    font-size: 1.1rem;
    box-shadow: 0 12px 24px rgba(59, 130, 246, 0.25);
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      transform: scale(1.05);
      box-shadow: 0 14px 30px rgba(59, 130, 246, 0.35);
    }
  }
}

// === Layout Grid ===
.grid-layout {
  display: grid;
  grid-template-columns: 1fr 350px;
  gap: 2rem;

  @media (max-width: 960px) {
    grid-template-columns: 1fr;
  }

  &.expanded {
    grid-template-columns: 1fr;
  }
}

// === Section Titles ===
.section-title {
  font-size: 1.75rem;
  font-weight: 700;
  color: #0f172a;
  margin: 2.5rem 0 1rem;
}

// === Recipe Cards ===
.recipe-gallery {
  background: #ffffff;
  border-radius: 1.25rem;
  padding: 1.5rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0 14px 40px rgba(0, 0, 0, 0.08);
  }
}

.watched-wrapper {
  position: relative;
  margin-top: 1.25rem;
}

.blur {
  filter: blur(4px);
  pointer-events: none;
  user-select: none;
}

.login-prompt {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.92);
  border-radius: 1.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 1.05rem;
  color: #475569;
  text-align: center;
  z-index: 10;
}

// === Auth Section ===
.auth-section {
  padding: 2rem;
  border-radius: 1.5rem;
  transition: all 0.3s ease;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
}

.glass-box {
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(200, 200, 200, 0.25);
}

// === Transition for Login Section ===
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.4s ease;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>