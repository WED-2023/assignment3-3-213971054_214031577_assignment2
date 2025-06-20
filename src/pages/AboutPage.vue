<template>
  <div class="about-container">
    <header class="about-header">
      <h1>👋 Welcome!</h1>
      <p>
        We are <strong>Hsen</strong> and <strong>Dania</strong>, third-year Software & Information Systems Engineering students at Ben-Gurion University.
      </p>
    </header>

    <section class="about-section">
      <h2>🥘 Tasty Recipes</h2>
      <p>
        Tasty Recipes is your personalized recipe hub powered by the Spoonacular API. Search for recipes by cuisine, diet, or intolerances.
        Guests can browse, while registered users unlock powerful features: create personal recipes, save favorites, and share family traditions.
      </p>
      <p>
        Dietary tags like <span class="tag">vegan</span>, <span class="tag">vegetarian</span>, and <span class="tag">gluten-free</span> help you find exactly what you need.
      </p>
    </section>

    <section class="about-section">
      <h2>🚀 Space Blaster Game</h2>
      <p>
        One of our fun projects was <strong>Space Blaster</strong>, a dynamic browser game with shooting action, scoring, and sounds.
      </p>
      <a class="btn" href="https://wed-2023.github.io/assignment2-213971054_214031577_assignment2/" target="_blank">
        🎮 Play Space Blaster
      </a>
    </section>

    <section class="about-section">
      <h2>💻 Personal Websites</h2>
      <p>
        Check out our portfolios to explore more of our design and development projects.
      </p>
      <ul class="link-list">
        <li><a href="https://wed-2023.github.io/213971054/" target="_blank">🌐 Hsen's Portfolio</a></li>
        <li><a href="https://wed-2023.github.io/214031577/" target="_blank">🌐 Dania's Portfolio</a></li>
      </ul>
    </section>

    <section class="about-section">
      <h2>📬 Contact Us</h2>
      <ul class="contact-list">
        <li><strong>Hsen:</strong> <a href="mailto:hsnenhu@post.bgu.ac.il">hsnenhu@post.bgu.ac.il</a></li>
        <li><strong>Dania:</strong> <a href="mailto:daniad@post.bgu.ac.il">daniad@post.bgu.ac.il</a></li>
      </ul>
    </section>
  </div>
</template>

<style scoped lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&display=swap');

.about-container {
  max-width: 900px;
  margin: 0 auto;
  padding: 4rem 2rem;
  background: #ffffff;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  font-family: 'Inter', sans-serif;
  color: #1e293b;
  animation: fadeIn 0.6s ease-out;
}

.about-header {
  text-align: center;
  margin-bottom: 3rem;

  h1 {
    font-size: 3rem;
    font-weight: 800;
    color: #0f172a;
  }

  p {
    font-size: 1.1rem;
    color: #475569;
    max-width: 650px;
    margin: 1rem auto 0;
  }
}

.about-section {
  margin-bottom: 3rem;

  h2 {
    font-size: 1.6rem;
    color: #2563eb;
    margin-bottom: 1rem;
  }

  p {
    font-size: 1rem;
    color: #334155;
    line-height: 1.6;
    margin-bottom: 0.75rem;
  }
}

.tag {
  background-color: #f0fdf4;
  color: #15803d;
  font-size: 0.85rem;
  padding: 0.2rem 0.5rem;
  border-radius: 0.375rem;
  margin-right: 0.4rem;
}

.btn {
  display: inline-block;
  background-color: #2563eb;
  color: white;
  padding: 0.6rem 1.2rem;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  transition: background 0.3s;
  margin-top: 1rem;

  &:hover {
    background-color: #1e40af;
  }
}

.link-list {
  list-style: none;
  padding-left: 0;
  margin-top: 1rem;

  li {
    margin-bottom: 0.5rem;

    a {
      color: #0f172a;
      font-weight: 500;
      text-decoration: none;
      transition: color 0.3s;

      &:hover {
        color: #2563eb;
      }
    }
  }
}

.contact-list {
  list-style: none;
  padding-left: 0;

  li {
    margin-bottom: 0.5rem;

    a {
      color: #2563eb;
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(16px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
