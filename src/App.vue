<template>
  <div id="app">
    <b-navbar toggleable="lg" type="dark" class="modern-navbar">
      <b-container class="nav-inner">
        <b-navbar-brand to="/" tag="router-link" class="brand">🍲 RecipeApp</b-navbar-brand>

        <b-navbar-toggle target="nav-collapse" />

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav class="main-links">
            <b-nav-item to="/" tag="router-link">Home</b-nav-item>
            <b-nav-item to="/search" tag="router-link">Search</b-nav-item>
            <b-nav-item to="/about" tag="router-link">About</b-nav-item>
          </b-navbar-nav>

          <b-navbar-nav class="ml-auto user-section">
            <template v-if="!store.username">
              <b-nav-text>Hello Guest</b-nav-text>
              <b-nav-item to="/login" tag="router-link">Login</b-nav-item>
              <b-nav-item to="/register" tag="router-link">Register</b-nav-item>
            </template>

            <template v-else>
              <div class="user-dropdown" @click="toggleDropdown">
                <img src="https://i.pravatar.cc/40" alt="avatar" class="avatar" />
                <div class="dropdown-content" v-if="showDropdown">
                  <router-link :to="{ name: 'favorites' }">❤ Favorites</router-link>
                  <router-link :to="{ name: 'myrecipes' }">🍳 Private</router-link>
                  <router-link :to="{ name: 'family' }">👨‍👩‍👧 La Familia</router-link>
                  <router-link :to="{ name: 'MealPlan' }">🗓️ Meal Plan</router-link> <!-- ✅ New link -->
                </div>
              </div>

              <b-nav-text class="username">{{ store.username }}</b-nav-text>
              <b-button size="sm" variant="outline-light" @click="logout">Logout</b-button>
              <b-button size="sm" variant="success" class="ml-2" @click="showModal = true">
                + New Recipe
              </b-button>
              <b-modal v-model="showModal" title="Create New Recipe" hide-footer>
                <createRecipeModal @formSubmitted="showModal = false" />
              </b-modal>
            </template>
          </b-navbar-nav>
        </b-collapse>
      </b-container>
    </b-navbar>

    <router-view />
  </div>
</template>


<script>
import { ref, getCurrentInstance } from 'vue';
import createRecipeModal from './components/createRecipeModal.vue';

export default {
  name: 'App',
  components: { createRecipeModal },
  setup() {
    const showModal = ref(false);
    const showDropdown = ref(false);
    const instance = getCurrentInstance();
    const store = instance.appContext.config.globalProperties.store;
    const toast = instance.appContext.config.globalProperties.toast;
    const router = instance.appContext.config.globalProperties.$router;

    const logout = () => {
      store.logout();
      toast("Logout", "User logged out successfully", "success");
      router.push("/").catch(() => {});
    };

    const toggleDropdown = () => {
      showDropdown.value = !showDropdown.value;
    };

    return { showModal, store, logout, showDropdown, toggleDropdown };
  }

};
</script>

<style lang="scss">
#app {
  font-family: 'Inter', sans-serif;
  background-color: #f4f7fc;
  min-height: 100vh;
  color: #1e293b;
}

.modern-navbar {
  background: linear-gradient(to right, #6366f1, #3b82f6);
  padding: 0.7rem 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 8px 20px rgba(59, 130, 246, 0.15);
}

.nav-inner {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.brand {
  font-size: 1.6rem;
  font-weight: 800;
  color: white !important;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.main-links b-nav-item {
  font-weight: 600;
  color: #e0f2fe !important;
  margin-right: 1rem;
}

.user-section {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.username {
  font-weight: 700;
  color: #fefefe;
}

.user-dropdown {
  position: relative;
  cursor: pointer;

  .avatar {
    width: 36px;
    height: 36px;
    border-radius: 999px;
    border: 2px solid #ffffff;
    object-fit: cover;
  }

  .dropdown-content {
    position: absolute;
    top: 48px;
    right: 0;
    background-color: #ffffff;
    border-radius: 12px;
    box-shadow: 0 12px 28px rgba(0, 0, 0, 0.1);
    min-width: 200px;
    overflow: hidden;
    z-index: 1000;

    a {
      display: block;
      padding: 12px 18px;
      font-weight: 500;
      color: #1f2937;
      text-decoration: none;
      transition: background 0.2s ease;

      &:hover {
        background-color: #f3f4f6;
      }
    }
  }


}

b-button {
  font-weight: 600;
  border-radius: 999px;
  padding: 6px 16px;
  transition: all 0.25s ease-in-out;
}

b-button:hover {
  transform: translateY(-2px);
  opacity: 0.95;
}
</style>
