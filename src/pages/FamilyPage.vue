<template>
  <div class="recipe-list">
    <h1>Famous Palestinian Recipes</h1>
    <div class="recipe-cards">
      <div v-for="recipe in recipes" :key="recipe.recipeId" class="recipe-card">
        <img :src="recipe.image" alt="Recipe Image" class="recipe-image" />
        <div class="recipe-info">
          <h2 class="recipe-title">{{ recipe.name }}</h2>
          <div class="recipe-details">
            <p><strong>Originated by:</strong> {{ recipe.whoseRecipe }}</p>
            <p><strong>Typically served:</strong> {{ recipe.customarilyPrepared }}</p>
            <p v-if="recipe.vegetarian">Vegetarian</p>
            <p v-if="recipe.vegan">Vegan</p>
            <p v-if="recipe.glutenFree">Gluten-Free</p>
            <p>Servings: {{ recipe.portions }}</p>
            <p>Time: {{ recipe.time }} minutes</p>
          </div>
          <h3>Ingredients:</h3>
          <ul class="recipe-components">
            <li v-for="component in recipe.components" :key="component">{{ component }}</li>
          </ul>
          <h3>Preparation:</h3>
          <p class="method-of-preparation">{{ recipe.methodOfPreparation }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import msImage from '@/assets/ms.webp';
import mqImage from '@/assets/mq.jpg';
import qdImage from '@/assets/qd.jpg';
import knImage from '@/assets/kn.jpg';

export default {

  data() {
    return {
      recipes: [
        {
          recipeId: 1,
          image: msImage,
          name: "Musakhan",
          whoseRecipe: "Mother",
          customarilyPrepared: "During olive harvest season",
          vegetarian: false,
          vegan: false,
          glutenFree: false,
          portions: 4,
          time: 90,
          components: [
            "Taboon bread",
            "Caramelized onions",
            "Sumac",
            "Olive oil",
            "Roasted chicken"
          ],
          methodOfPreparation: "Roast chicken with onions and sumac, layer it on taboon bread soaked in olive oil, and bake until crispy."
        },
        {
          recipeId: 2,
          image: mqImage,
          name: "Maqluba",
          whoseRecipe: "Father",
          customarilyPrepared: "Fridays and family gatherings",
          vegetarian: false,
          vegan: false,
          glutenFree: false,
          portions: 6,
          time: 120,
          components: [
            "Fried eggplant",
            "Rice",
            "Chicken or beef",
            "Tomatoes",
            "Spices"
          ],
          methodOfPreparation: "Layer rice, meat, and vegetables in a pot, cook, and flip it upside down to serve."
        },
        {
          recipeId: 3,
          image: knImage,
          name: "Knafeh Nabulsiyeh",
          whoseRecipe: "Grandmother",
          customarilyPrepared: "Eid and festive occasions",
          vegetarian: true,
          vegan: false,
          glutenFree: false,
          portions: 8,
          time: 60,
          components: [
            "Shredded phyllo (kataifi)",
            "Nabulsi cheese",
            "Sugar syrup",
            "Butter or ghee",
            "Orange food coloring"
          ],
          methodOfPreparation: "Layer shredded phyllo with cheese, bake, pour sugar syrup on top, and serve warm."
        },
        {
          recipeId: 4,
          image: qdImage,
          name: "Qidreh",
          whoseRecipe: "Uncle",
          customarilyPrepared: "Weddings and Fridays",
          vegetarian: false,
          vegan: false,
          glutenFree: false,
          portions: 5,
          time: 150,
          components: [
            "Lamb chunks",
            "Basmati rice",
            "Chickpeas",
            "Garlic",
            "Special Qidreh spices"
          ],
          methodOfPreparation: "Cook lamb and rice in a large copper pot with spices over wood fire or in an oven for deep flavor."
        }
      ]
    };
  }
};
</script>

<style scoped lang="scss">
.recipe-list {
  padding: 3rem 1.5rem;
  background: linear-gradient(to right, #fdfdfd, #f7faff);
  font-family: 'Poppins', sans-serif;
  color: #1f2937;
  h1 {
    font-size: 2.5rem;
    font-weight: 800;
    text-align: center;
    margin-bottom: 2rem;
    color: #0f172a;
  }
}

.recipe-cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2.5rem;
  justify-content: center;
}

.recipe-card {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  }

  .recipe-image {
    width: 100%;
    height: 200px;
    object-fit: cover;
  }

  .recipe-info {
    padding: 1.5rem;

    .recipe-title {
      font-size: 1.5rem;
      font-weight: 700;
      color: #334155;
      margin-bottom: 1rem;
    }

    .recipe-details {
      font-size: 0.95rem;
      color: #475569;
      margin-bottom: 1rem;
      p { margin-bottom: 0.5rem; }
    }

    .recipe-components {
      list-style: disc;
      padding-left: 1.4rem;
      margin-bottom: 1rem;
      color: #475569;
      li { margin-bottom: 0.4rem; }
    }

    .method-of-preparation {
      font-size: 0.95rem;
      color: #64748b;
      background: #eef2f7;
      padding: 0.85rem;
      border-radius: 12px;
    }
  }
}
</style>
