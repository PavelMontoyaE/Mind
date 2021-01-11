<template>
  <v-app>
    <v-app-bar app color="blue-grey darken-4" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Mind Courses</v-toolbar-title>

      <v-spacer></v-spacer>

      <template v-if="userSession.name">
        <a to="/profile">
          <span class="mr-2 white--text">{{ userSession.name }}</span>
          <v-icon>mdi-account</v-icon>
        </a>
        <v-btn @click="logout" class="ml-2">
          <v-icon>mdi-logout-variant</v-icon>
        </v-btn>
      </template>

      <v-btn text to="/login" v-else-if="path !== '/login'">
        <span class="mr-2 white--text">Login</span>
        <v-icon>mdi-account</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>
    <v-navigation-drawer v-model="drawer" absolute bottom temporary dark>
      <v-list nav dense>
        <v-list-item-group
          v-model="group"
          active-class="teal darken-1--text white--text"
        >
          <v-list-item to="/">
            <v-list-item-title>
              <v-icon>mdi-home</v-icon> Home
            </v-list-item-title>
          </v-list-item>

          <v-list-item to="/courses">
            <v-list-item-title>
              <v-icon>mdi-video</v-icon> Courses
            </v-list-item-title>
          </v-list-item>

          <v-list-item to="/users" v-if="isAdmin">
            <v-list-item-title>
              <v-icon>mdi-account-multiple</v-icon> Users
            </v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </v-app>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';

export default {
  name: 'App',
  data() {
    return {
      drawer: false,
      group: null,
    };
  },
  computed: {
    ...mapState({
      userSession: (state) => state.session.userSession,
    }),
    ...mapGetters('session', {
      isAdmin: 'isAdmin',
    }),
    path() {
      return this.$route.path;
    },
  },
  watch: {
    group() {
      this.drawer = false;
    },
  },
  methods: {
    ...mapActions('session', ['getSession', 'logout']),
  },
  async created() {
    await this.getSession();
  },
};
</script>
