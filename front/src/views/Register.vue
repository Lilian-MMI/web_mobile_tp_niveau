<script setup lang="ts">
import { userApi } from '@/api';
import router from '@/router';
import { Ref } from 'vue';

interface IRegisterUser {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
}

interface IRegisterErrors extends Partial<IRegisterUser> {}

const firstName = ref('');
const lastName = ref('');
const username = ref('');
const password = ref('');

const isLoading = ref(false);
const errors: Ref<IRegisterErrors> = ref({});
const isRegisterOk = ref(false);

const register = async () => {
  try {
    errors.value = {};
    isLoading.value = true;

    const user = {
      username: username.value,
      password: password.value,
      firstName: firstName.value,
      lastName: lastName.value,
    } as IRegisterUser;

    await userApi.register(user);
    isRegisterOk.value = true;
    await new Promise((resolve) => setTimeout(resolve, 3000));

    router.replace({ name: 'login' });
  } catch (err: any) {
    errors.value = err.errors;
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <div class="wrapper-register">
    <div class="card">
      <div class="card-header">
        <h1>Inscription</h1>
        <p>Veuillez entrer vos identifiants</p>
      </div>

      <form @submit.prevent="register">
        <div class="form-control">
          <div class="p-inputgroup">
            <span class="p-inputgroup-addon">
              <i class="pi pi-user"></i>
            </span>
            <InputText
              v-model="firstName"
              placeholder="Prénom"
              :class="{ 'p-invalid': !!errors.firstName }"
            />
          </div>
          <span v-if="!!errors.firstName">
            <small class="p-error">{{ errors.firstName }}</small>
          </span>
        </div>

        <div class="form-control">
          <div class="p-inputgroup">
            <span class="p-inputgroup-addon">
              <i class="pi pi-user"></i>
            </span>
            <InputText
              v-model="lastName"
              placeholder="Nom"
              :class="{ 'p-invalid': !!errors.lastName }"
            />
          </div>
          <span v-if="!!errors.lastName">
            <small class="p-error">{{ errors.lastName }}</small>
          </span>
        </div>

        <div class="form-control">
          <div class="p-inputgroup">
            <span class="p-inputgroup-addon">
              <i class="pi pi-at"></i>
            </span>
            <InputText
              v-model="username"
              placeholder="Nom d'utilisateur"
              :class="{ 'p-invalid': !!errors.username }"
            />
          </div>
          <span v-if="!!errors.username">
            <small class="p-error">{{ errors.username }}</small>
          </span>
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
              :class="{ 'p-invalid': !!errors.password }"
            />
          </div>
          <span v-if="!!errors.password">
            <small class="p-error">{{ errors.password }}</small>
          </span>
        </div>

        <Button
          label="S'enregistrer"
          type="submit"
          style="width: 100%; margin-top: 1rem"
          :loading="isLoading"
        />
      </form>

      <RouterLink to="/login" class="link">
        <span>Déjà un compte ? Se connecter</span>
      </RouterLink>
    </div>

    <Message
      v-if="isRegisterOk"
      :closable="false"
      :style="{ position: 'absolute', top: '1rem', zIndex: 999 }"
    >
      Votre compte a bien été créé. Vous allez être redirigé...
    </Message>
  </div>
</template>

<style lang="scss" scoped>
.wrapper-register {
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
</style>
