<template>
  <div class="container">
    <h1 class="title">Login</h1>
    <form @submit.prevent="onLogin" novalidate>
      <div class="mb-3">
        <label for="username" class="form-label">Username:</label>
        <input
            id="username"
            type="text"
            class="form-control"
            v-model="form.username"
            :class="{ 'is-invalid': v$.username.$error }"
        />
        <div class="invalid-feedback" v-if="v$.username.$error">
          Username is required.
        </div>
      </div>

      <div class="mb-3">
        <label for="password" class="form-label">Password:</label>
        <input
            id="password"
            type="password"
            class="form-control"
            v-model="form.password"
            :class="{ 'is-invalid': v$.password.$error }"
        />
        <div class="invalid-feedback" v-if="v$.password.$error">
          Password is required.
        </div>
      </div>

      <button type="submit" class="btn btn-primary w-100">Login</button>

      <div class="mt-3 text-center">
        Don't have an account yet?
        <router-link to="/register">Register in here</router-link>
      </div>

      <div v-if="form.submitError" class="alert alert-warning mt-3" role="alert">
        Login failed: {{ form.submitError }}
      </div>
    </form>
  </div>
</template>

<script setup>
import axios from 'axios'
import { reactive, getCurrentInstance } from 'vue'
import { useRouter } from 'vue-router'
import useVuelidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'

const router = useRouter()
const store = getCurrentInstance().appContext.config.globalProperties.store

const form = reactive({
  username: '',
  password: '',
  submitError: undefined,
})

const rules = {
  username: { required },
  password: { required },
}

const v$ = useVuelidate(rules, form)

async function onLogin() {
  v$.value.$touch()
  if (v$.value.$invalid) return

  try {
    const response = await axios.post(
        'https://hs-da.cs.bgu.ac.il/auth/Login',
        {
          username: form.username,
          password: form.password,
        },
        { withCredentials: true }
    )

    console.log('Login response:', response)

    if (response.data && response.data.username) {
      store.login(response.data.username)
      router.push('/')
    } else {
      form.submitError = 'Unexpected server response.'
    }
  } catch (err) {
    console.error('Login error:', err)
    form.submitError = err.response?.data?.message || 'Login failed'
  }
}
</script>

<style scoped lang="scss">
.container {
  max-width: 420px;
  margin: 5rem auto;
  padding: 2.5rem 2rem;
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08);
  font-family: 'Poppins', sans-serif;
}

.title {
  text-align: center;
  font-size: 2rem;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 1.8rem;
}

label {
  font-weight: 600;
  color: #334155;
}

input.form-control {
  border-radius: 8px;
  padding: 0.65rem 0.9rem;
  font-size: 1rem;
}

input.form-control:focus {
  border-color: #10b981;
  box-shadow: 0 0 0 0.2rem rgba(16, 185, 129, 0.2);
}

.is-invalid {
  border-color: #dc3545 !important;
}

.invalid-feedback {
  font-size: 0.9rem;
  color: #dc3545;
}

button[type="submit"] {
  background-color: #10b981;
  border: none;
  padding: 0.75rem;
  font-weight: 600;
  font-size: 1rem;
  border-radius: 8px;
  transition: background 0.3s ease;
}

button[type="submit"]:hover {
  background-color: #0e9e6e;
}

.mt-3.text-center {
  margin-top: 1.25rem;
  font-size: 0.95rem;
  color: #475569;
}

.mt-3.text-center a {
  color: #0ea5e9;
  text-decoration: none;
  font-weight: 600;
}

.mt-3.text-center a:hover {
  text-decoration: underline;
}

.alert {
  margin-top: 1.2rem;
  font-size: 0.95rem;
}
</style>
