import './assets/main.css'
import './style.css'
import 'vuetify/styles'
import 'vuetify/styles'
import '@vuepic/vue-datepicker/dist/main.css'
// import { createVuetify } from 'vuetify'
// import * as components from 'vuetify/components'
// import * as directives from 'vuetify/directives'

// const vuetify = createVuetify({
//     components,
//     directives,
// })


import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')