import { createApp } from 'vue';

// material-icons
import 'material-icons/iconfont/material-icons.css';

// axios / VueAxios
import axios from 'axios';
import VueAxios from 'vue-axios';

// emitter
import emitter from '@/methods/emitter';

// ToastMessages, httpMessageState
import ToastMessages from '@/components/ToastMessages.vue';
import httpMessage from '@/methods/MessageState';

import App from './App.vue';
import router from './router';

const app = createApp(App);
// 全域註冊
app.config.globalProperties.$emitter = emitter;
app.config.globalProperties.$httpMessage = httpMessage;

app.use(VueAxios, axios);
app.use(router);
app.component('ToastMessages', ToastMessages);
app.mount('#app');
