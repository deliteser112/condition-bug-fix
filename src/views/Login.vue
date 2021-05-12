<template>
  <div class="content-general">
    <div class="max-width">
      <div class="login">
        <div class="login__container">
          <form @submit.prevent="submitData" class="card-details">
            <h1 class="text-center title-main">Iniciar sesión</h1>
            <div
              :class="[
                'mb-15',
                { 'form-group--error': $v.form.username.$error },
              ]"
            >
              <label class="semi-bold label-form">Correo electrónico</label>
              <input
                v-model="$v.form.username.$model"
                class="form-control"
                type="email"
                placeholder="Ingresa el email de contacto"
              />
              <p
                v-if="$v.form.username.$error && !$v.form.username.required"
                class="validation-error"
              >
                Correo electrónico es requerido
              </p>
              <p
                v-else-if="$v.form.username.$error && !$v.form.username.type"
                class="validation-error"
              >
                Debe ser un correo electrónico válido
              </p>
            </div>
            <div
              :class="[
                'mb-10',
                { 'form-group--error': $v.form.password.$error },
              ]"
            >
              <label class="semi-bold label-form">Contraseña</label>
              <input
                v-model="$v.form.password.$model"
                class="form-control"
                type="password"
                autocomplete="on"
                placeholder="Ingresa la contraseña"
              />
              <p
                v-if="$v.form.password.$error && !$v.form.password.required"
                class="validation-error"
              >
                Contraseña es requerido
              </p>
              <p v-else-if="error" class="validation-error">
                {{ error }}
              </p>
            </div>
            <div class="forgot-pass">
              <router-link :to="{ name: 'RecoverPassword' }">
                <a>¿Olvidaste tu contraseña?</a>
              </router-link>
            </div>
            <button type="submit" class="btn btn__login btn--blue mt-15">
              Inicia sesión
            </button>
            <div class="mt-15 text-center">
              <span class="bold">¿No tienes una cuenta?</span>
              <button type="button" class="link-button">
                <router-link :to="{ name: 'Register' }">
                  <span class="ml-5">Crear una cuenta</span></router-link
                >
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { required, email } from "vuelidate/lib/validators";

export default {
  data() {
    return {
      form: {
        username: "",
        password: "",
      },
      error: "",
    };
  },
  provide() {
    return {
      $v: this.$v,
    };
  },
  validations: {
    form: {
      username: {
        required,
        type: email,
      },
      password: {
        required,
      },
    },
  },
  metaInfo: {
    title: "Ingreso Usuarios",
    titleTemplate: "%s - Viaja y Descubre",
  },
  methods: {
    ...mapActions({ logIn: "auth/logIn" }),
    async submitData() {
      this.$v.$touch();
      if (this.$v.$anyError) {
        this.$nextTick(() => {
          window.validateFocusElement();
        });
      } else {
        this.logIn(this.form)
          .then(() => {
            this.$router.push({ name: "Home" });
          })
          .catch(() => {
            this.error = "Usuario o Contraseña inválidos";
          });
      }
    },
  },
};
</script>

<style scoped>
.login {
  display: flex;
  justify-content: center;
  margin-top: 50px;
}
.login__container {
  width: 500px;
}
.forgot-pass {
  text-align: right;
}
.btn__login {
  width: 100%;
}
.text-center {
  text-align: center;
}
</style>