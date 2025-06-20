<template>
  <div class="not-found-wrapper">
    <div class="not-found-content">
      <h1 class="error-code">404</h1>
      <p class="error-message">Oops! The page you're looking for doesn't exist.</p>
      <router-link to="/" class="home-link">
        ⬅ ET Go Home
      </router-link>
    </div>
  </div>
</template>

<style scoped lang="scss">
.not-found-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: radial-gradient(circle at center, #0f172a 0%, #1e293b 100%);
  color: #f8fafc;
  font-family: 'Inter', sans-serif;
  text-align: center;
  padding: 2rem;
}

.not-found-content {
  max-width: 600px;
  animation: fadeIn 0.8s ease-out;
}

.error-code {
  font-size: 6rem;
  font-weight: 900;
  background: linear-gradient(to right, #3b82f6, #6366f1);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 1rem;
}

.error-message {
  font-size: 1.5rem;
  margin-bottom: 2rem;
  color: #cbd5e1;
}

.home-link {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  background: linear-gradient(to right, #10b981, #22d3ee);
  color: white;
  font-weight: 700;
  border-radius: 9999px;
  text-decoration: none;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.25);
  transition: all 0.3s ease;
}

.home-link:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.3);
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
