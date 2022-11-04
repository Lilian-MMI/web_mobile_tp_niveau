<script setup lang="ts">
import { dashboardApi } from '@/api';
import { getUsers, deleteUser, editUser } from '@/api/user';
import router from '@/router';
import { useUserStore } from '@/stores/user';
import { Ref } from 'vue';
import { IUser } from './Login.vue';
import { LineChart, useLineChart } from 'vue-chart-3';
import { Chart, registerables } from 'chart.js';
import Draggable from 'vue3-draggable';

Chart.register(...registerables);

const maxTemp = ref([]);
const minTemp = ref([]);
const humidityAverage = ref(0);
const pressionAverage = ref(0);

const chartData = {
  labels: [
    'Jour 1',
    'Jour 2',
    'Jour 3',
    'Jour 4',
    'Jour 5',
    'Jour 6',
    'Jour 7',
    'Jour 8',
    'Jour 9',
    'Jour 10',
    'Jour 11',
    'Jour 12',
    'Jour 13',
    'Jour 14',
    'Jour 15',
    'Jour 16',
    'Jour 17',
    'Jour 18',
    'Jour 19',
    'Jour 20',
    'Jour 21',
    'Jour 22',
    'Jour 23',
    'Jour 24',
    'Jour 25',
    'Jour 26',
    'Jour 27',
    'Jour 28',
    'Jour 29',
    'Jour 30',
  ],
  datasets: [
    {
      data: maxTemp.value,
    },
  ],
};

const chartData2 = {
  labels: [
    'Jour 1',
    'Jour 2',
    'Jour 3',
    'Jour 4',
    'Jour 5',
    'Jour 6',
    'Jour 7',
    'Jour 8',
    'Jour 9',
    'Jour 10',
    'Jour 11',
    'Jour 12',
    'Jour 13',
    'Jour 14',
    'Jour 15',
    'Jour 16',
    'Jour 17',
    'Jour 18',
    'Jour 19',
    'Jour 20',
    'Jour 21',
    'Jour 22',
    'Jour 23',
    'Jour 24',
    'Jour 25',
    'Jour 26',
    'Jour 27',
    'Jour 28',
    'Jour 29',
    'Jour 30',
  ],
  datasets: [
    {
      data: minTemp.value,
    },
  ],
};

const { lineChartProps } = useLineChart({
  chartData,
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
  },
});

const { lineChartProps: lineChartProps2 } = useLineChart({
  chartData: chartData2,
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
  },
});

const users: Ref<IUser[]> = ref([]);
const isModalEditUserOpen = ref(false);
const selectedUser = ref({} as IUser);
const isLoading = ref(false);

const permissions = [
  { label: 'READ ONLY', value: 'read-only' },
  { label: 'EDIT', value: 'edit' },
];

onMounted(async () => {
  const output = (await getUsers()) as IUser[];
  users.value = [...output];
});

const handleDeleteUser = async (id: string) => {
  await deleteUser(id);
  users.value = users.value.filter((user) => user._id !== id);
};

const handleEditUser = async () => {
  await editUser(selectedUser.value);
  users.value = users.value.map((u) => {
    if (u._id === selectedUser.value._id) {
      return selectedUser.value;
    }
    return u;
  });
  isModalEditUserOpen.value = false;
};

const handleLogout = () => {
  const userStore = useUserStore();
  userStore.SET_USER(null);
  localStorage.removeItem('apiKey');
  router.replace({ name: 'login' });
};

const tab: Ref<'users' | 'W1P2' | 'W1P3'> = ref('users');

const scoreAverage = ref(0);
const goodAnswersAverage = ref(0);
const badAnswersAverage = ref(0);

watchEffect(async () => {
  if (tab.value === 'W1P2') {
    const { data: weatherData } = (await dashboardApi.getWeather()) as any;

    weatherData.forEach((data: any) => {
      maxTemp.value.push(data.MaxTemp as never);
      minTemp.value.push(data.MinTemp as never);
    });

    humidityAverage.value =
      weatherData.reduce(
        (acc: number, data: any) =>
          acc + (data.Humidity9am + data.Humidity3pm) / 2,
        0
      ) / weatherData.length;

    pressionAverage.value =
      weatherData.reduce(
        (acc: number, data: any) =>
          acc + (data.Pressure9am + data.Pressure3pm) / 2,
        0
      ) / weatherData.length;
  }

  if (tab.value === 'W1P3') {
    const { data: MCQData } = (await dashboardApi.getMCQData()) as any;

    scoreAverage.value =
      MCQData.reduce((acc: number, data: any) => acc + data.score, 0) /
      MCQData.length;

    goodAnswersAverage.value =
      MCQData.reduce((acc: number, data: any) => acc + data.good, 0) /
      MCQData.length;

    badAnswersAverage.value =
      MCQData.reduce((acc: number, data: any) => acc + data.bad, 0) /
      MCQData.length;
  }
});

const widgetsW1P2 = ref();

onMounted(() => {
  widgetsW1P2.value = localStorage.getItem('widgets')
    ? JSON.parse(localStorage.getItem('widgets') as string)
    : [
        {
          id: 1,
          title: 'Température minimum',
          props: lineChartProps2,
        },
        {
          id: 2,
          title: 'Température maximum',
          props: lineChartProps,
        },
        {
          id: 3,
          title: 'Humidité moyenne',
          value: humidityAverage,
        },
        {
          id: 4,
          title: 'Pression moyenne',
          value: pressionAverage,
        },
      ];
});

const updateDragState = (e: any) => {
  localStorage.setItem('widgets', JSON.stringify(e));
};

const updateDragState2 = (e: any) => {
  localStorage.setItem('widgetsW1P3', JSON.stringify(e));
};

const widgetsW1P3 = ref();

onMounted(() => {
  widgetsW1P3.value = localStorage.getItem('widgetsW1P3')
    ? JSON.parse(localStorage.getItem('widgetsW1P3') as string)
    : [
        {
          id: 1,
          title: 'Bonnes réponses',
          props: lineChartProps3,
        },
        {
          id: 2,
          title: 'Mauvais réponses',
          props: lineChartProps4,
        },
        {
          id: 3,
          title: 'Score moyen',
          value: scoreAverage,
        },
      ];
});

const chartData3 = {
  label: [
    'Jour 1',
    'Jour 2',
    'Jour 3',
    'Jour 4',
    'Jour 5',
    'Jour 6',
    'Jour 7',
    'Jour 8',
  ],
  datasets: [
    {
      data: [1, 2, 3, 4, 5, 6, 7, 8],
    },
  ],
};

const { lineChartProps: lineChartProps3 } = useLineChart({
  chartData: chartData3,
});

const { lineChartProps: lineChartProps4 } = useLineChart({
  chartData: chartData3,
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
  },
});

const isSideBarVisible = ref(false);
</script>

<template>
  <Dialog
    header="Editer marker"
    v-model:visible="isModalEditUserOpen"
    :style="{ width: '50vw' }"
  >
    <form @submit.prevent="handleEditUser">
      <div class="form-control">
        <div class="p-inputgroup">
          <span class="p-inputgroup-addon">
            <i class="pi pi-map"></i>
          </span>
          <InputText v-model="selectedUser.firstName" placeholder="Prénom" />
        </div>
      </div>

      <div class="form-control">
        <div class="p-inputgroup">
          <span class="p-inputgroup-addon">
            <i class="pi pi-map"></i>
          </span>
          <InputText v-model="selectedUser.lastName" placeholder="Nom" />
        </div>
      </div>

      <div class="form-control">
        <div class="p-inputgroup">
          <span class="p-inputgroup-addon">
            <i class="pi pi-map"></i>
          </span>
          <InputText v-model="selectedUser.username" placeholder="Rôle" />
        </div>
      </div>

      <div class="form-control">
        <div class="p-inputgroup">
          <span class="p-inputgroup-addon">
            <i class="pi pi-map"></i>
          </span>
          <Dropdown
            v-model="selectedUser.permission"
            :options="permissions"
            optionValue="value"
            optionLabel="label"
          >
          </Dropdown>
        </div>
      </div>

      <Button
        label="Modifier"
        type="submit"
        style="width: 100%; margin-top: 1rem"
        :loading="isLoading"
      />
    </form>
  </Dialog>

  <div class="wrapper-admin" v-if="tab === 'users'">
    <DataTable :value="users" responsiveLayout="scroll">
      <Column field="firstName" header="Prénom"></Column>
      <Column field="lastName" header="Nom"></Column>
      <Column field="username" header="Utilisateur"></Column>
      <Column field="permission" header="Permission"></Column>
      <Column header="Modifier">
        <template #body="slotProps">
          <Button
            icon="pi pi-pencil"
            @click="
              (isModalEditUserOpen = true), (selectedUser = slotProps.data)
            "
          />
        </template>
      </Column>
      <Column header="Supprimer">
        <template #body="slotProps">
          <Button
            icon="pi pi-trash"
            class="p-button-danger"
            @click="handleDeleteUser(slotProps.data._id)"
          />
        </template>
      </Column>
    </DataTable>
  </div>

  <div v-if="tab === 'W1P2'">
    <draggable
      v-model="widgetsW1P2"
      transition="120"
      class="dashboard-data-wrapper"
      @update:modelValue="updateDragState"
    >
      <template v-slot:item="{ item }">
        <div class="card">
          <div v-if="item.props">
            <h2>{{ item.title }}</h2>
            <LineChart v-bind="item.props" />
          </div>
          <div v-else>
            <h2>{{ item.title }}</h2>
            <h3>{{ item.value }}</h3>
          </div>
        </div>
      </template>
    </draggable>
  </div>

  <div v-if="tab === 'W1P3'">
    <draggable
      v-model="widgetsW1P3"
      transition="120"
      class="dashboard-data-wrapper"
      @update:modelValue="updateDragState2"
    >
      <template v-slot:item="{ item }">
        <div class="card">
          <div v-if="item.props">
            <h2>{{ item.title }}</h2>
            <LineChart v-bind="item.props" />
          </div>
          <div v-else>
            <h2>{{ item.title }}</h2>
            <h3>{{ item.value }}</h3>
          </div>
        </div>
      </template>
    </draggable>
  </div>

  <Button
    label="Déconnexion"
    @click="handleLogout"
    class="p-button-warning"
    :style="{ position: 'absolute', top: '1rem', right: '1rem', zIndex: 999 }"
  />

  <Sidebar v-model:visible="isSideBarVisible" class="sidebar">
    <h2>MENU</h2>
    <Divider />
    <Button
      label="Gestion des utilisateurs"
      class="p-button-link"
      icon="pi pi-angle-right"
      iconPos="right"
      @click="
        tab = 'users';
        isSideBarVisible = false;
      "
    />
    <br />
    <Button
      label="Données météo (API) - W1P2"
      class="p-button-link"
      icon="pi pi-angle-right"
      iconPos="right"
      @click="
        tab = 'W1P2';
        isSideBarVisible = false;
      "
    />
    <br />
    <Button
      label="Données QCM - W1P3"
      class="p-button-link"
      icon="pi pi-angle-right"
      iconPos="right"
      @click="
        tab = 'W1P3';
        isSideBarVisible = false;
      "
    />
  </Sidebar>

  <Button
    icon="pi pi-angle-right"
    @click="isSideBarVisible = !isSideBarVisible"
    :style="{ position: 'absolute', top: '1rem', left: '1rem', zIndex: 999 }"
  />
</template>

<style scoped lang="scss">
.wrapper-admin {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  position: relative;

  > div {
    margin-top: calc(47px + 2rem);
    width: 100%;
    height: calc(100% - (47px + 2rem));
  }
}

.sidebar button {
  padding: 0;
  margin: 1rem 0;
}

h1 {
  font-size: 2rem;
  margin-bottom: 1rem;
}

form {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-top: 2rem;
}

.form-control {
  text-align: end;
}

.form-control:not(:last-of-type) {
  margin-bottom: 1rem;
}

h1 {
  margin: 0;
  font-size: 1.5rem;
}

.dashboard-data-wrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  height: 100%;
  position: relative;
}

.card {
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  margin: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: move;
}

h3 {
  margin: 1rem 0 0;
}
</style>
