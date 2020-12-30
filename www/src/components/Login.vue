<template>
  <v-container>
    <div class="text-h3 my-2">Login</div>
    <v-card class="mx-auto pa-3" width="500px" shaped elevation="1">
      <v-container>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="Email"
            required
          ></v-text-field>
          <v-text-field
            type="password"
            v-model="password"
            :rules="passwordRules"
            label="Password"
            required
          ></v-text-field>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              :disabled="!valid || loading"
              @click="login({ email, password })"
              :loading="loading"
            >
              Login
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-container>
    </v-card>
    <v-alert
      dense
      outlined
      type="error"
      dismissible
      class="mt-5"
      v-if="loginError"
    >
      {{ loginError }}
    </v-alert>
  </v-container>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  data() {
    return {
      valid: false,
      email: '',
      emailRules: [
        (v) => !!v || 'E-mail is required',
        (v) => /.+@.+/.test(v) || 'E-mail must be valid',
      ],
      password: '',
      passwordRules: [(v) => !!v || 'Password is required'],
    };
  },
  computed: {
    ...mapState({
      loading: (state) => state.session.loading,
      loginError: (state) => state.session.loginError,
    }),
  },
  methods: {
    ...mapActions('session', ['login']),
  },
};
</script>

<style></style>
