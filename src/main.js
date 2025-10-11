import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import Home from './views/Home.vue'
import IconManagement from './views/IconManagement.vue'
import { useTheme } from './composables/useTheme'
import 'animate.css'
import './style.css'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/icons', name: 'IconManagement', component: IconManagement }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

const app = createApp(App)
app.use(router)

// 初始化主题
const { initTheme } = useTheme()
initTheme()

app.mount('#app')
