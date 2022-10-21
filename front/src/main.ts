import { createApp } from 'vue';
import rootApp from './App.vue';
import router from './router';

import PrimeVue from 'primevue/config';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Dropdown from 'primevue/dropdown';
import Message from 'primevue/message';

import 'uno.css';
import 'primevue/resources/themes/lara-light-teal/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';

const app = createApp(rootApp);
const pinia = createPinia();

app.use(router);
app.use(pinia);
app.use(PrimeVue, { ripple: true });
app.component('InputText', InputText);
app.component('Button', Button);
app.component('Dialog', Dialog);
app.component('DataTable', DataTable);
app.component('Column', Column);
app.component('Dropdown', Dropdown);
app.component('Message', Message);
app.mount('#app');
