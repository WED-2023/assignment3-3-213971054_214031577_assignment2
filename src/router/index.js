import Main from "../pages/MainPage.vue";
import NotFound from "../pages/NotFoundPage.vue";
import Register from "../pages/RegisterPage.vue";
import Login from "../pages/LoginPage.vue";
import Search from "../pages/SearchPage.vue";
import RecipeView from "../pages/RecipeViewPage.vue";
import About from "../pages/AboutPage.vue";
import Favorites from "../pages/FavoritePage.vue";
import Family from "../pages/FamilyPage.vue";
import MyRecipes from "../pages/MyRecipesPage.vue";
import prepare from "../pages/PreparationPage.vue";
import plan from "../pages/MealPlanPage.vue";

const routes = [
  {
    path: "/",
    name: "main",
    component: Main,
  },
  {
    path: "/register",
    name: "register",
    component: Register,
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/search",
    name: "search",
    component: Search,
  },
  {
    path: "/recipe/:recipeId",
    name: "recipe",
    component: RecipeView,
  },
  {
    path: "/about",
    name: "about",
    component: About,
  },
  {
    path: "/favorites",
    name: "favorites",
    component: Favorites,
  },
  {
    path: "/family",
    name: "family",
    component: Family,
  },
  {
    path: "/myrecipes",
    name: "myrecipes",
    component: MyRecipes,
  },
  {
    path: '/prepare/:id',
    name: 'PreparationPage',
    component: prepare,
    props: true
  },
  {
    path: "/meal-plan",
    name: "MealPlan",
    component: plan
  },
  {
    path: "/:catchAll(.*)",
    name: "notFound",
    component: NotFound,
  },
];

export default routes;
