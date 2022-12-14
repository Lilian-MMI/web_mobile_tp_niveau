<script setup lang="ts">
import { userApi } from '@/api';
import { useUserStore } from '@/stores';
import router from '@/router';

export interface IUser {
  _id: string;
  username: string;
  firstName: string;
  lastName: string;
  role: string;
  permission: string;
}

interface ILoginUser {
  username: string;
  password: string;
}

interface ILoginResponse {
  user: IUser;
  token: string;
}

const username = ref('');
const password = ref('');

const isLoading = ref(false);
const error = ref('');

const login = async () => {
  try {
    error.value = '';
    isLoading.value = true;

    const body = {
      username: username.value,
      password: password.value,
    } as ILoginUser;

    const { user, token } = (await userApi.login(body)) as ILoginResponse;
    const userStore = useUserStore();
    userStore.SET_USER(user);
    localStorage.setItem('apiKey', token);

    const role = user.role;

    if (role === 'user') return router.replace({ name: 'home' });
    else return router.replace({ name: `${role}-dashboard` });
  } catch (err: any) {
    error.value = err.user;
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <div class="wrapper-login">
    <div class="card">
      <div class="card-header">
        <h1>Connexion</h1>
        <p>Veuillez entrer vos identifiants</p>
      </div>

      <span class="invalid" v-if="error">{{ error }}</span>

      <form @submit.prevent="login">
        <div class="form-control">
          <div class="p-inputgroup">
            <span class="p-inputgroup-addon">
              <i class="pi pi-at"></i>
            </span>
            <InputText v-model="username" placeholder="Nom d'utilisateur" />
          </div>
        </div>

        <div class="form-control">
          <div class="p-inputgroup">
            <span class="p-inputgroup-addon">
              <i class="pi pi-lock"></i>
            </span>
            <InputText
              v-model="password"
              type="password"
              placeholder="Mot de passe"
            />
          </div>
        </div>

        <Button
          label="Se connecter"
          type="submit"
          style="width: 100%; margin-top: 1rem"
          :loading="isLoading"
        />
      </form>

      <RouterLink to="/register" class="link">
        <span>Pas encore de compte ? S'enregistrer</span>
      </RouterLink>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.wrapper-login {
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

.card {
  padding: 2rem;
  border: 1px dashed black;
  border-radius: 8px;
}

form {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 500px;
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

.card-header > p {
  font-weight: 200;
  margin: 0.5rem 0;
}

.link {
  color: #495057;
  font-weight: 200;
  text-decoration: none;
  margin-top: 1rem;
  display: flex;
  place-content: center;
}

.link:hover {
  text-decoration: underline;
}

.invalid {
  color: red;
}
</style>
