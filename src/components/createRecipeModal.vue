<template>
  <div>
    <b-button variant="success" class="create-btn" @click="showModal = true">
      <b-icon icon="plus-circle" class="mr-2" /> Create Recipe
    </b-button>

    <b-modal v-model="showModal" title="🍽️ Create a New Recipe" hide-footer class="modern-modal">
      <b-form @submit.prevent="add">
        <b-form-group label="📛 Title" label-for="name">
          <b-form-input id="name" v-model="recipe.name" required />
        </b-form-group>

        <b-form-group label="🖼️ Image URL" label-for="image">
          <b-form-input id="image" v-model="recipe.image" required />
        </b-form-group>

        <b-form-group label="📋 Instructions" label-for="instructions">
          <b-form-textarea id="instructions" v-model="recipe.instructions" rows="4" required />
        </b-form-group>

        <b-form-group label="🧂 Ingredients" label-for="ingredients">
          <b-form-textarea id="ingredients" v-model="recipe.ingridiants" rows="3" required />
        </b-form-group>

        <div class="d-flex justify-content-between">
          <b-form-group label="🍽️ Servings" label-for="numOfPortions" class="w-50 pr-2">
            <b-form-input id="numOfPortions" type="number" min="1" v-model="recipe.numOfPortions" required />
          </b-form-group>

          <b-form-group label="⏱️ Ready In Minutes" label-for="time" class="w-50 pl-2">
            <b-form-input id="time" type="number" min="1" v-model="recipe.time" required />
          </b-form-group>
        </div>

        <div class="checkboxes mb-3">
          <b-form-checkbox v-model="recipe.vegan">🌱 Vegan</b-form-checkbox>
          <b-form-checkbox v-model="recipe.vegeterian">🥕 Vegetarian</b-form-checkbox>
          <b-form-checkbox v-model="recipe.gluten">🚫 Gluten Free</b-form-checkbox>
        </div>

        <b-button type="submit" variant="primary" class="w-100 submit-btn">
          <b-icon icon="check-circle" class="mr-2" /> Submit Recipe
        </b-button>

        <b-alert v-if="errorMessage" variant="danger" dismissible class="mt-3">{{ errorMessage }}</b-alert>
        <b-alert v-if="successMessage" variant="success" dismissible class="mt-3">{{ successMessage }}</b-alert>
      </b-form>
    </b-modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showModal: false,
      errorMessage: "",
      successMessage: "",
      recipe: {
        name: '',
        image: '',
        vegeterian: false,
        vegan: false,
        gluten: false,
        numOfPortions: 0,
        ingridiants: '',
        instructions: '',
        time: 0
      }
    };
  },
  methods: {
    async add() {
      try {
        const payload = {
          title: this.recipe.name,
          imageUrl: this.recipe.image,
          preparationTime: Number(this.recipe.time),
          cuisine: "N/A",
          servings: Number(this.recipe.numOfPortions),
          ingredients: this.recipe.ingridiants,
          instructions: this.recipe.instructions,
        };

        await this.axios.post("http://localhost:80/users/addRecipe", payload, {
          withCredentials: true
        });

        this.successMessage = "✅ Recipe added successfully!";
        this.errorMessage = "";
        this.showModal = false;
        this.$emit("formSubmitted");
      } catch (err) {
        this.errorMessage = err.response?.data?.message || "There was a problem adding the recipe.";
        this.successMessage = "";
      }
    }
  }
};
</script>

<style scoped lang="scss">
.create-btn {
  font-weight: 600;
  font-size: 1.1rem;
  padding: 0.7rem 1.5rem;
  border-radius: 10px;
  transition: all 0.3s ease-in-out;
  box-shadow: 0 4px 14px rgba(16, 185, 129, 0.4);
}

.create-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 18px rgba(16, 185, 129, 0.5);
}

.modern-modal .modal-content {
  border-radius: 20px;
  padding: 2rem;
  background: #f9fafb;
  box-shadow: 0 20px 30px rgba(0, 0, 0, 0.1);
}

.b-form-group label {
  font-weight: 600;
  color: #1f2937;
  font-size: 0.95rem;
}

.b-form-input,
.b-form-textarea {
  border-radius: 12px;
  border: 1px solid #cbd5e1;
  padding: 0.75rem 1rem;
  transition: border-color 0.2s ease;
}

.b-form-input:focus,
.b-form-textarea:focus {
  border-color: #10b981;
  box-shadow: 0 0 0 0.2rem rgba(16, 185, 129, 0.2);
}

.checkboxes {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
  font-size: 0.95rem;
}

.submit-btn {
  font-weight: 600;
  padding: 0.7rem 1.2rem;
  font-size: 1rem;
  border-radius: 12px;
  background: linear-gradient(135deg, #10b981, #059669);
  border: none;
  box-shadow: 0 4px 14px rgba(16, 185, 129, 0.4);
  transition: all 0.3s ease;
}

.submit-btn:hover {
  transform: translateY(-1px);
  background: linear-gradient(135deg, #059669, #047857);
}
</style>

