// src/plugins/vuetify.js

import { createVuetify } from 'vuetify'
import 'vuetify/styles' // Importar estilos do Vuetify
import { aliases, mdi } from 'vuetify/iconsets/mdi'

export default createVuetify({
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
})
