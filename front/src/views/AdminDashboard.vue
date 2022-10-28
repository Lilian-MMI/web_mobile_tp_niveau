<script setup lang="ts">
import { getUsers, deleteUser, editUser } from '@/api/user';
import router from '@/router';
import { useUserStore } from '@/stores/user';
import { Ref } from 'vue';
import { IUser } from './Login.vue';

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

const tab: Ref<'users' | 'dashboard'> = ref('users');
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

  <div v-if="tab === 'dashboard'">DASHBOARD</div>

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
