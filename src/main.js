import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import '@mdi/font/css/materialdesignicons.css' // Importar ícones Material Design
import 'vuetify/styles' // Importar estilos do Vuetify

const app = createApp(App)

app.use(router)
app.use(vuetify) // Registrar Vuetify
app.mount('#app')
