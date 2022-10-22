<script setup lang="ts">
import { getAdmins, deleteAdmin, editAdmin } from '@/api/user';
import router from '@/router';
import { useUserStore } from '@/stores';
import { IUser } from './Login.vue';

interface IAdmin extends IUser {}

const admin = ref([] as IAdmin[]);
const isModalEditAdminOpen = ref(false);
const selectedAdmin = ref({}) as any;
const isLoading = ref(false);

const permissions = [
  { label: 'READ ONLY', value: 'read-only' },
  { label: 'EDIT', value: 'edit' },
];

const roles = [
  { label: 'Super Admin', value: 'super-admin' },
  { label: 'Admin', value: 'admin' },
  { label: 'User', value: 'user' },
];

onMounted(async () => {
  const output = (await getAdmins()) as IAdmin[];
  admin.value = [...output];
});

const handleDeleteAdmin = async (id: string) => {
  await deleteAdmin(id);
  admin.value = admin.value.filter((user) => user._id !== id);
};

const handleEditAdmin = async () => {
  await editAdmin(selectedAdmin.value);
  admin.value = admin.value.map((u) => {
    if (u._id === selectedAdmin.value._id) {
      return selectedAdmin.value;
    }
    return u;
  });
  isModalEditAdminOpen.value = false;
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
    header="Editer marker"
    v-model:visible="isModalEditAdminOpen"
    :style="{ width: '50vw' }"
  >
    <form @submit.prevent="handleEditAdmin">
      <div class="form-control">
        <div class="p-inputgroup">
          <span class="p-inputgroup-addon">
            <i class="pi pi-map"></i>
          </span>
          <InputText v-model="selectedAdmin.firstName" placeholder="Prénom" />
        </div>
      </div>

      <div class="form-control">
        <div class="p-inputgroup">
          <span class="p-inputgroup-addon">
            <i class="pi pi-map"></i>
          </span>
          <InputText v-model="selectedAdmin.lastName" placeholder="Nom" />
        </div>
      </div>

      <div class="form-control">
        <div class="p-inputgroup">
          <span class="p-inputgroup-addon">
            <i class="pi pi-map"></i>
          </span>
          <InputText v-model="selectedAdmin.username" placeholder="Rôle" />
        </div>
      </div>

      <div class="form-control">
        <div class="p-inputgroup">
          <span class="p-inputgroup-addon">
            <i class="pi pi-map"></i>
          </span>
          <Dropdown
            v-model="selectedAdmin.permission"
            :options="permissions"
            optionValue="value"
            optionLabel="label"
          >
          </Dropdown>
        </div>
      </div>

      <div class="form-control">
        <div class="p-inputgroup">
          <span class="p-inputgroup-addon">
            <i class="pi pi-map"></i>
          </span>
          <Dropdown
            v-model="selectedAdmin.role"
            :options="roles"
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

  <div class="wrapper-admin">
    <DataTable :value="admin" responsiveLayout="scroll">
      <Column field="firstName" header="Prénom"></Column>
      <Column field="lastName" header="Nom"></Column>
      <Column field="username" header="Utilisateur"></Column>
      <Column field="permission" header="Permission"></Column>
      <Column header="Modifier">
        <template #body="slotProps">
          <Button
            icon="pi pi-pencil"
            @click="
              (isModalEditAdminOpen = true), (selectedAdmin = slotProps.data)
            "
          />
        </template>
      </Column>
      <Column header="Supprimer">
        <template #body="slotProps">
          <Button
            icon="pi pi-trash"
            class="p-button-danger"
            @click="handleDeleteAdmin(slotProps.data._id)"
          />
        </template>
      </Column>
    </DataTable>
  </div>

  <Button
    label="Déconnexion"
    @click="handleLogout"
    class="p-button-warning"
    :style="{ position: 'absolute', top: '1rem', right: '1rem', zIndex: 999 }"
  />
</template>

<style scoped lang="scss">
.wrapper-admin {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  position: relative;
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
</style>
