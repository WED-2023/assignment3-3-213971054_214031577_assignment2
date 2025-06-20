<template>
  <div class="meal-plan-page">
    <h1>🍽️ My Meal Plan</h1>

    <div v-if="plan.length === 0" class="empty">
      No recipes added to the plan.
    </div>

    <!-- Meal-plan cards -->
    <div v-for="recipe in plan" :key="recipe.id" class="recipe-card">
      <img :src="recipe.image" alt="Recipe image" />

      <div class="details">
        <h3>{{ recipe.title }}</h3>
        <p>
          ⏱️ {{ recipe.readyInMinutes }} min •
          🍽️ {{ recipe.servings }} servings
        </p>

        <!-- Progress bar -->
        <b-progress :value="progress(recipe.id)" height="20px">
          <b-progress-bar
              :value="progress(recipe.id)"
              :variant="progressVariant(recipe.id)"
          >
            {{ completedCount(recipe.id) }}/{{ recipe.totalSteps }}
          </b-progress-bar>

        </b-progress>

        <button
            class="btn btn-danger mt-2"
            @click="remove(recipe.id)"
        >
          ❌ Remove
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const plan = ref([]);

/* ---------- Initial load ---------- */
onMounted(async () => {
  try {
    const { data } = await axios.get("http://localhost:80/users/meal-plan", {
      withCredentials: true,
    });

    // Inject totalSteps for each recipe
    plan.value = data.map((recipe) => {
      const steps = recipe.analyzedInstructions?.flatMap(i => i.steps || []);
      return {
        ...recipe,
        totalSteps: steps?.length || 0,
      };
    });
  } catch (err) {
    console.error("Failed to load meal plan:", err);
  }
});


/* ---------- Helpers ---------- */
const completedStepsArr = (id) =>
    JSON.parse(localStorage.getItem(`prep_${id}`) || '{}').steps || [];

const completedCount = (id) => completedStepsArr(id).filter(Boolean).length;

const progress = (id) => {
  const r = plan.value.find((p) => p.id === id);
  const total = r?.totalSteps || 1;
  return Math.round((completedCount(id) / total) * 100);
};

const progressVariant = (id) => {
  const pct = progress(id);
  if (pct === 100) return 'success';
  if (pct >= 50) return 'warning';
  return 'danger';
};

/* ---------- Remove ---------- */
const remove = async (id) => {
  try {
    await axios.delete(
        `http://localhost:80/users/meal-plan/${id}`,
        { withCredentials: true }
    );
    plan.value = plan.value.filter((r) => r.id !== id);
  } catch (err) {
    console.error('Failed to remove from meal plan:', err);
  }
};
</script>

<style scoped>
.meal-plan-page {
  max-width: 900px;
  margin: 2rem auto;
  padding: 1rem;
}

.empty {
  margin: 2rem 0;
  font-size: 1.1rem;
  color: #666;
  text-align: center;
}

/* Card layout */
.recipe-card {
  display: flex;
  margin: 1rem 0;
  background: #f8f9fa;
  border-radius: 10px;
  padding: 1rem;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
}

.recipe-card img {
  width: 140px;
  height: 100px;
  object-fit: cover;
  border-radius: 8px;
  margin-right: 1rem;
}

.details h3 {
  margin-bottom: 0.3rem;
}
</style>
