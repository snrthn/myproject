/*
 * @User: shencaixia
 * @Email: shencaixia@jd.com
 * @lastTime: 2022-04-28 10:43:26
 * @Description: TODO...
 */
import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import locale from 'element-plus/es/locale/lang/zh-cn'
import App from './App.vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
app.component(key, component)
}

app.use(ElementPlus, { locale })
app.mount('#app')