# Commands Used to Create the Project

Project Setup Commands
1. Create Vue.js Project with Vite
bash# Navigate to your Laravel project root
cd C:\Users\ppola\Herd\shipping-app

# Create frontend directory with Vite + Vue
npm create vite@latest frontend -- --template vue

# Navigate to frontend directory
cd frontend

# Install dependencies
npm install
2. Install Core Dependencies
bash# Vue Router for routing
npm install vue-router@4

# Pinia for state management
npm install pinia

# Vuetify (Material Design framework)
npm install vuetify@next @mdi/font

# Element Plus
npm install element-plus

# Font Awesome
npm install @fortawesome/fontawesome-svg-core @fortawesome/free-solid-svg-icons @fortawesome/free-regular-svg-icons @fortawesome/free-brands-svg-icons @fortawesome/vue-fontawesome@latest-3

# Bootstrap
npm install bootstrap

# Axios for API calls
npm install axios

# Date handling
npm install dayjs

# Form validation
npm install vee-validate yup

# Toast notifications
npm install vue-toastification@next
3. Install Dev Dependencies
bash# Prettier for code formatting
npm install -D prettier

# ESLint for code quality
npm install -D eslint @vue/eslint-config-prettier

# Sass for styling
npm install -D sass
4. Create Prettier Configuration
Create frontend/.prettierrc.json:
json{
  "tabWidth": 2,
  "semi": false,
  "singleQuote": true,
  "printWidth": 120,
  "singleAttributePerLine": true
}
```