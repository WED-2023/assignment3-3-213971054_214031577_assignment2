<template>
  <div class="preparation-container" v-if="recipe">
    <h1>{{ recipe.title }}</h1>
    <img :src="recipe.image" alt="Recipe Image" class="recipe-img" />

    <!-- Info -->
    <div class="info">
      <p><strong>Time:</strong> {{ recipe.readyInMinutes }} min</p>
      <p><strong>Servings:</strong> {{ recipe.servings * portionMultiplier }}</p>

      <button @click="doublePortions" class="btn btn-secondary">
        🔁 Double Portions
      </button>
      <button @click="resetProgress" class="btn btn-warning">
        🔄 Reset
      </button>
      <button @click="addToMealPlan" class="btn btn-success">
        ➕ Add to Meal Plan
      </button>

    </div>

    <!-- Ingredients -->
    <div class="ingredients">
      <h3>🧂 Ingredients:</h3>
      <ul>
        <li v-for="(ing, i) in adjustedIngredients" :key="i">
          <template v-if="hasAmount(ing)">
            {{ formatAmount(ing.amount * portionMultiplier) }}
            {{ ing.unit }} – {{ ing.name }}
          </template>
          <template v-else>
            {{ ing.original }}
          </template>
        </li>
      </ul>
    </div>

    <!-- Steps -->
    <div class="steps">
      <h3>📋 Steps:</h3>
      <div
          v-for="(step, i) in steps"
          :key="i"
          class="step"
          :class="{ done: completedSteps[i] }"
      >
        <input
            type="checkbox"
            :id="'step' + i"
            v-model="completedSteps[i]"
        />
        <label :for="'step' + i">{{ step }}</label>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
import axios from 'axios';
import { useRoute } from 'vue-router';

const { params } = useRoute();
const id = params.id;

const recipe = ref(null);
const portionMultiplier = ref(1);
const adjustedIngredients = ref([]);
const steps = ref([]);
const completedSteps = ref([]);

const storageKey = `prep_${id}`;

/* ---------- Helpers ---------- */
const hasAmount = ing => ing?.amount !== undefined && !isNaN(ing.amount);
const formatAmount = amt =>
    !amt || isNaN(amt) ? '-' : Math.round(amt * 100) / 100;

/* ---------- API Load ---------- */
const loadRecipe = async () => {
  const { data } = await axios.get(`http://localhost:80/recipes/${id}`, {
    withCredentials: true
  });

  recipe.value = {
    title:           data.title,
    image:           data.image,
    readyInMinutes:  data.readyInMinutes,
    servings:        data.servings || 1
  };

  adjustedIngredients.value = data.extendedIngredients || [];

  steps.value =
      data.analyzedInstructions?.flatMap(instr =>
          (instr.steps || []).map(s => s.step)
      ) || [];

  const saved = JSON.parse(localStorage.getItem(storageKey));
  completedSteps.value =
      saved?.steps || Array(steps.value.length).fill(false);
  portionMultiplier.value = saved?.multiplier || 1;
};

const addToMealPlan = async () => {
  try {
    await axios.post("http://localhost:80/users/meal-plan", {
      recipeId: id
    }, { withCredentials: true });

    alert("Recipe added to meal plan!");
  } catch (err) {
    console.error("Failed to add to meal plan", err);
  }
};


/* ---------- Save on change ---------- */
watch([completedSteps, portionMultiplier], () => {
  localStorage.setItem(
      storageKey,
      JSON.stringify({
        steps: completedSteps.value,
        multiplier: portionMultiplier.value
      })
  );
}, { deep: true });

/* ---------- UI Actions ---------- */
const doublePortions = () => {
  portionMultiplier.value *= 2;
};

const resetProgress = () => {
  completedSteps.value = Array(steps.value.length).fill(false);
  portionMultiplier.value = 1;
};

onMounted(loadRecipe);
</script>

<style scoped>
.preparation-container {
  max-width: 820px;
  margin: 0 auto;
  padding: 2rem;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.1);
}

.recipe-img {
  width: 100%;
  max-height: 320px;
  object-fit: cover;
  border-radius: 12px;
}

.info,
.ingredients,
.steps {
  margin-top: 1.5rem;
}

.step {
  margin-bottom: 0.8rem;
  transition: all 0.3s ease;
}

.step.done label {
  text-decoration: line-through;
  color: #888;
}
</style>
