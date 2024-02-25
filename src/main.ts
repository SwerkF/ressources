import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'

import Landing from './components/Landing.vue'
import Items from './components/Items.vue'
import Navbar from './components/Navbar.vue'

const app = createApp(App)
app.use(router)
app.component('Landing', Landing)
app.component('Items', Items)
app.component('Navbar', Navbar)
app.mount('#app')
