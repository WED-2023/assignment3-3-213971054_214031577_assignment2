<template>
  <div class="register-wrapper">
    <div class="form-container">
      <b-card class="glass-card">
        <h2 class="form-title">🚀 Create Your Account</h2>

        <b-form @submit.prevent="onRegister" @reset.prevent="onReset">
          <div class="form-grouped">
            <b-form-group label="Username">
              <b-form-input
                  v-model="form.username"
                  placeholder="Enter username"
                  :state="!v$.username.$invalid"
                  class="form-input"
              />
              <b-form-invalid-feedback v-if="v$.username.$error">
                Username must be 3–8 letters only.
              </b-form-invalid-feedback>
            </b-form-group>

            <b-form-group label="First Name">
              <b-form-input
                  v-model="form.firstName"
                  placeholder="Enter first name"
                  :state="!v$.firstName.$invalid"
                  class="form-input"
              />
              <b-form-invalid-feedback v-if="v$.firstName.$error">
                First name must contain letters only.
              </b-form-invalid-feedback>
            </b-form-group>

            <b-form-group label="Last Name">
              <b-form-input
                  v-model="form.lastName"
                  placeholder="Enter last name"
                  :state="!v$.lastName.$invalid"
                  class="form-input"
              />
              <b-form-invalid-feedback v-if="v$.lastName.$error">
                Last name must contain letters only.
              </b-form-invalid-feedback>
            </b-form-group>

            <b-form-group label="Email">
              <b-form-input
                  type="email"
                  v-model="form.email"
                  placeholder="Enter email"
                  :state="!v$.email.$invalid"
                  class="form-input"
              />
              <b-form-invalid-feedback v-if="v$.email.$error">
                Email must be valid.
              </b-form-invalid-feedback>
            </b-form-group>

            <b-form-group label="Country">
              <b-form-select
                  v-model="form.country"
                  :options="countryOptions"
                  :state="!v$.country.$invalid"
                  class="form-input"
              />
              <b-form-invalid-feedback v-if="v$.country.$error">
                Please select a country.
              </b-form-invalid-feedback>
            </b-form-group>

            <b-form-group label="Password">
              <b-form-input
                  type="password"
                  v-model="form.password"
                  placeholder="Enter password"
                  :state="!v$.password.$invalid"
                  class="form-input"
              />
              <b-form-invalid-feedback v-if="v$.password.$error">
                Must be 5–10 characters with a number & special char.
              </b-form-invalid-feedback>
            </b-form-group>

            <b-form-group label="Confirm Password">
              <b-form-input
                  type="password"
                  v-model="form.passwordConfirm"
                  placeholder="Confirm password"
                  :state="!v$.passwordConfirm.$invalid"
                  class="form-input"
              />
              <b-form-invalid-feedback v-if="v$.passwordConfirm.$error">
                Passwords must match.
              </b-form-invalid-feedback>
            </b-form-group>

            <b-button type="submit" class="w-100 modern-btn mt-3">Register</b-button>
            <b-button type="reset" class="w-100 modern-btn-outline mt-2">Reset</b-button>
          </div>
        </b-form>
      </b-card>
    </div>
  </div>
</template>


<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import useVuelidate from '@vuelidate/core'
import { required, email, helpers } from '@vuelidate/validators'

const API_BASE = 'http://127.0.0.1:80'
const router = useRouter()

const form = reactive({
  username: '',
  firstName: '',
  lastName: '',
  email: '',
  country: '',
  password: '',
  passwordConfirm: ''
})

// Validation rules
const passwordRules = helpers.regex(/^(?=.*[0-9])(?=.*[^A-Za-z0-9]).{5,10}$/)
const onlyLetters = helpers.regex(/^[A-Za-z]+$/)
const usernameLetters = helpers.regex(/^[A-Za-z]{3,8}$/)

const rules = {
  username: { required, usernameLetters },
  firstName: { required, onlyLetters },
  lastName: { required, onlyLetters },
  email: { required, email },
  country: { required },
  password: { required, passwordRules },
  passwordConfirm: {
    required,
    sameAsPassword: helpers.withMessage('Passwords must match', value => value === form.password)
  }
}

const v$ = useVuelidate(rules, form)

const countries = [
  "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia", "Austria",
  "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan",
  "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia",
  "Cameroon", "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo", "Costa Rica",
  "Croatia", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt",
  "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia", "Fiji", "Finland", "France", "Gabon",
  "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana",
  "Haiti", "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel",
  "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Korea, North", "Korea, South", "Kosovo",
  "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania",
  "Luxembourg", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius",
  "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar", "Namibia",
  "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Macedonia", "Norway", "Oman",
  "Pakistan", "Palau", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal",
  "Qatar", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe",
  "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia",
  "South Africa", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria", "Taiwan",
  "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan",
  "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City",
  "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"
];

const countryOptions = ref(countries.map(c => ({ value: c, text: c })))

async function onRegister() {
  v$.value.$touch()
  if (v$.value.$invalid) return

  try {
    await axios.post(`${API_BASE}/auth/register`, {
      username: form.username,
      firstname: form.firstName,
      lastname: form.lastName,
      country: form.country,
      password: form.password,
      confirmPassword: form.passwordConfirm, // ✅ Added
      email: form.email,
      profilePic: "" // ✅ Dummy value
    })
    router.push('/Login')
  } catch (err) {
    if (err.response?.status === 400) {
      alert('Username already exists. Please choose another.')
    } else {
      alert('Registration failed.')
    }
  }
}

function onReset() {
  v$.value.$reset()
  Object.keys(form).forEach(k => (form[k] = ''))
}
</script>

<style scoped lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&display=swap');

.register-wrapper {
  min-height: 100vh;
  background: linear-gradient(135deg, #f0f9ff, #ecfeff);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Inter', sans-serif;
  padding: 2rem;
}

.form-container {
  width: 100%;
  max-width: 500px;
}

.glass-card {
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(14px);
  border-radius: 20px;
  padding: 2rem;
  border: 1px solid rgba(200, 200, 200, 0.3);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
}

.glass-card:hover {
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.1);
}

.form-title {
  font-size: 2rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 1.5rem;
  color: #0f172a;
}

.form-input {
  border-radius: 12px;
  padding: 0.75rem;
  font-size: 1rem;
  border: 1px solid #cbd5e1;
  box-shadow: none;
  transition: border-color 0.2s;
}

.form-input:focus {
  border-color: #38bdf8;
  box-shadow: 0 0 0 0.15rem rgba(56, 189, 248, 0.25);
}

.modern-btn {
  background: linear-gradient(90deg, #0ea5e9, #38bdf8);
  color: #fff;
  font-weight: 600;
  border: none;
  border-radius: 999px;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  box-shadow: 0 10px 20px rgba(56, 189, 248, 0.25);
  transition: all 0.3s ease;
}

.modern-btn:hover {
  transform: scale(1.03);
  box-shadow: 0 12px 26px rgba(56, 189, 248, 0.35);
}

.modern-btn-outline {
  background: transparent;
  border: 2px solid #0ea5e9;
  color: #0ea5e9;
  font-weight: 600;
  border-radius: 999px;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.modern-btn-outline:hover {
  background: #0ea5e9;
  color: white;
  transform: scale(1.02);
}
</style>

