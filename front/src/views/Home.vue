<script setup lang="ts">
import { useUserStore } from '@/stores';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { addMarker, deleteMarker, editMarker, getMarkers } from '@/api/marker';
import router from '@/router';

const isModalAddMarkerOpen = ref(false);
const isModalEditMarkerOpen = ref(false);
const libelle = ref('');
const errors = ref({}) as any;
const errorHttp = ref('');
const isLoading = ref(false);

const currentEvent = ref(null) as any;
const editEvent = ref(null) as any;
let map = null as any;

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

  const markers = (await getMarkers()) as any;
  markers.forEach((marker: { latitude: number; longitude: number }) => {
    L.marker([marker.latitude, marker.longitude])
      .addTo(map)
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
  }).addTo(map);

  await addMarker({
    libelle: libelle.value,
    lat,
    lng,
  }).catch((err) => {
    errorHttp.value = err.message;
  });

  isModalAddMarkerOpen.value = false;
};

const handleEditMarker = async () => {
  await editMarker(editEvent.value.marker).catch((err) => {
    errorHttp.value = err.message;
  });
};

const handleDeleteMarker = () => {
  deleteMarker(editEvent.value.marker._id)
    .then(() => location.reload())
    .catch((err) => {
      errorHttp.value = err.message;
    });
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
    label="Déconnexion"
    @click="handleLogout"
    class="p-button-warning"
    :style="{ position: 'absolute', top: '1rem', right: '1rem', zIndex: 999 }"
  />
</template>

<style lang="scss" scoped>
#mapContainer {
  width: 100vw;
  height: 100vh;
}
</style>
