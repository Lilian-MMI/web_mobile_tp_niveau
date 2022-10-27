<script setup lang="ts">
import { useUserStore } from '@/stores';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { markerApi } from '@/api';
import router from '@/router';
import { Ref } from 'vue';
import { IUser } from './Login.vue';

interface Marker {
  _id: string;
  libelle: string;
  latitude: number;
  longitude: number;
}

interface IMarkerErrors extends Partial<Marker> {}

const isModalAddMarkerOpen = ref(false);
const isModalEditMarkerOpen = ref(false);
const isSidebardOpen = ref(false);

const libelle = ref('');

const errors: Ref<IMarkerErrors> = ref({});
const errorHttp = ref('');
const isLoading = ref(false);

const currentEvent: Ref<null | any> = ref(null);
const editEvent: Ref<null | any> = ref(null);
let map: L.Map | null = null;
const markers: Ref<Marker[]> = ref([]);

const { currentUser } = useUserStore() as { currentUser: IUser };

onMounted(async () => {
  map = L.map('mapContainer').setView([46.05, 11.05], 5);
  L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution:
      '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  map.on(
    'click',
    (e: any) => ((isModalAddMarkerOpen.value = true), (currentEvent.value = e))
  );

  markers.value = (await markerApi.getMarkers()) as Marker[];

  markers.value.forEach((marker) => {
    return L.marker([marker.latitude, marker.longitude])
      .addTo(map as L.Map)
      .on(
        'click',
        (e: any) => (
          (isModalEditMarkerOpen.value = true),
          (editEvent.value = { e, marker })
        )
      );
  });
});

const createMarker = async () => {
  const { lat, lng } = currentEvent.value.latlng;

  L.marker([lat, lng], {
    title: libelle.value,
  }).addTo(map as L.Map);

  await markerApi
    .addMarker({
      libelle: libelle.value,
      latitude: lat,
      longitude: lng,
    })
    .catch((err) => (errorHttp.value = err.message));

  isModalAddMarkerOpen.value = false;
};

const handleEditMarker = () => {
  markerApi
    .editMarker(editEvent.value.marker)
    .catch((err) => (errorHttp.value = err.message));
};

const handleDeleteMarker = () => {
  markerApi
    .deleteMarker(editEvent.value.marker._id)
    .then(() => location.reload())
    .catch((err) => (errorHttp.value = err.message));
};

const handleLogout = () => {
  const userStore = useUserStore();
  userStore.SET_USER(null);
  localStorage.removeItem('apiKey');
  router.replace({ name: 'login' });
};
</script>

<template>
  <Dialog
    header="Nouveau marker"
    v-model:visible="isModalAddMarkerOpen"
    :style="{ width: '50vw' }"
  >
    <form @submit.prevent="createMarker">
      <div class="form-control">
        <div class="p-inputgroup">
          <span class="p-inputgroup-addon">
            <i class="pi pi-map"></i>
          </span>
          <InputText
            v-model="libelle"
            placeholder="Libellé"
            :class="{ 'p-invalid': !!errors.libelle }"
          />
        </div>
        <span v-if="!!errors.libelle">
          <small class="p-error">{{ errors.libelle }}</small>
        </span>
      </div>

      <Button
        label="Ajouter"
        type="submit"
        style="width: 100%; margin-top: 1rem"
        :loading="isLoading"
      />
    </form>
  </Dialog>

  <Dialog
    header="Editer marker"
    v-model:visible="isModalEditMarkerOpen"
    :style="{ width: '50vw' }"
  >
    <form>
      <div class="form-control">
        <div class="p-inputgroup">
          <span class="p-inputgroup-addon">
            <i class="pi pi-map"></i>
          </span>
          <InputText
            v-model="editEvent.marker.libelle"
            placeholder="Libellé"
            :class="{ 'p-invalid': !!errors.libelle }"
          />
        </div>
        <span v-if="!!errors.libelle">
          <small class="p-error">{{ errors.libelle }}</small>
        </span>
      </div>

      <Button
        label="Modifier"
        @click="handleEditMarker"
        style="width: 100%; margin-top: 1rem"
        :loading="isLoading"
      />

      <Button
        label="Supprimer"
        @click="handleDeleteMarker"
        class="p-button-danger"
        style="width: 100%; margin-top: 1rem"
        :loading="isLoading"
      />
    </form>
  </Dialog>

  <Message
    severity="error"
    v-if="errorHttp"
    :closable="false"
    :style="{ position: 'absolute', top: '1rem', zIndex: 999 }"
  >
    {{ errorHttp }}
  </Message>

  <div id="mapContainer"></div>

  <Button
    icon="pi pi-angle-right"
    @click="isSidebardOpen = !isSidebardOpen"
    :style="{ position: 'absolute', bottom: '1rem', left: '1rem', zIndex: 999 }"
  />

  <Sidebar v-model:visible="isSidebardOpen">
    <div style="display: flex; flex-direction: column; height: 100%">
      <p>
        Vous êtes connectez en tant que <b>{{ currentUser.username }}</b>
      </p>

      <Divider type="dashed">
        <b>Mon profil</b>
      </Divider>

      <p>{{ currentUser.firstName }} {{ currentUser.lastName }}</p>

      <Divider type="dashed">
        <b>Mes markers</b>
      </Divider>

      <div>
        <ul>
          <li v-for="marker in markers" :key="marker._id">
            {{ marker.libelle }}
          </li>
        </ul>
      </div>

      <Button
        label="Déconnexion"
        @click="handleLogout"
        class="p-button-warning"
        :style="{ marginTop: 'auto' }"
      />
    </div>
  </Sidebar>
</template>

<style lang="scss" scoped>
#mapContainer {
  width: 100vw;
  height: 100vh;
}
</style>
