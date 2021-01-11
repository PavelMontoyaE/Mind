<template>
  <v-container class="mb-5">
    <div class="my-2">
      <span class="text-h3">Courses</span>
      <v-btn
        color="green"
        absolute
        dark
        right
        fab
        @click="openNewCourseDrawer"
        v-if="isAdmin"
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </div>
    <list v-if="isAdmin"></list>
    <list-user v-else></list-user>
    <v-alert
      dense
      type="success"
      dismissible
      class="mt-5"
      v-if="successMessage"
    >
      {{ successMessage }}
    </v-alert>
    <v-navigation-drawer
      v-model="drawer"
      temporary
      absolute
      dark
      :width="drawerType === 'New' || drawerType === 'Edit' ? 400 : 500"
      @input="onDrawerClose"
    >
      <course :model="course"></course>
    </v-navigation-drawer>
  </v-container>
</template>

<script>
import { mapActions, mapGetters, mapMutations, mapState } from 'vuex';
import Course from './Course';
import List from './List';
import ListUser from './ListUser';
import toHours from '../../filters/minutes-to-hours.filter';
import countUsers from '../../filters/count-users.filter';

export default {
  name: 'Courses',
  components: {
    Course,
    List,
    ListUser,
  },
  filters: {
    toHours,
    countUsers,
  },
  computed: {
    ...mapState({
      selectedCourse: (state) => state.courses.course,
      courseDrawer: (state) => state.courses.courseDrawer,
      drawerType: (state) => state.courses.drawerType,
      successMessage: (state) => state.courses.successMessage,
      errorMessage: (state) => state.courses.errorMessage,
    }),
    ...mapGetters('session', {
      isAdmin: 'isAdmin',
    }),
    drawer: {
      get() {
        return this.courseDrawer;
      },
      set(val) {
        this.setCourseDrawer(val);
      },
    },
    course: {
      get() {
        return this.selectedCourse;
      },
      set(val) {
        this.setCourse(val);
      },
    },
  },
  methods: {
    ...mapMutations('courses', [
      'setCourseDrawer',
      'setDrawerType',
      'cleanStates',
      'setCourse',
    ]),
    ...mapActions('courses', ['getCourses']),
    ...mapActions('users', ['getUser']),
    async onDrawerClose(value) {
      if (!value) {
        this.course = {};
        this.setDrawerType('');
        this.cleanStates();
        await this.getUser();
      }
    },
    openNewCourseDrawer() {
      this.setDrawerType('new');
      this.drawer = true;
    },
  },
  mounted() {
    this.getCourses();
  },
};
</script>
