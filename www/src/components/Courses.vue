<template>
  <v-container class="mb-5">
    <div class="my-2">
      <span class="text-h3">Courses</span>
      <v-btn color="green" absolute dark right fab @click="openNewCourseDrawer">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </div>
    <v-data-table :headers="headers" :items="courses" :items-per-page="5">
      <template v-slot:item.id="{ item }">
        <a @click="setCourse(item)">{{ item.id }}</a>
      </template>
      <template v-slot:item.url="{ item }">
        <a :href="item.url">{{ item.url }}</a>
      </template>
      <template v-slot:item.status="{ item }">
        <v-icon :color="getColor(item.status)">
          {{ item.status ? 'mdi-thumb-up' : 'mdi-thumb-down' }}
        </v-icon>
      </template>
      <template v-slot:item.duration="{ item }">
        {{ item.duration | toHours }}
      </template>
      <template v-slot:item.users="{ item }">
        {{ item.users | countUsers }}
      </template>
    </v-data-table>
    <v-alert
      dense
      type="success"
      dismissible
      class="mt-5"
      v-if="successMessage"
    >
      {{ successMessage }}
    </v-alert>
    <template v-if="drawer">
      <v-navigation-drawer
        v-model="drawer"
        temporary
        absolute
        dark
        width="400"
        @input="onDrawerClose"
      >
        <course :model="course" :newCourse="newCourseDrawer"></course>
      </v-navigation-drawer>
    </template>
  </v-container>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex';
import Course from './Course';
import toHours from '../filters/minutes-to-hours.filter';
import countUsers from '../filters/count-users.filter';

export default {
  name: 'Home',
  components: {
    Course,
  },
  filters: {
    toHours,
    countUsers,
  },
  data() {
    return {
      course: {},
      newCourseDrawer: false,
      headers: [
        { text: 'Id', value: 'id' },
        { text: 'Name', value: 'name' },
        { text: 'URL', value: 'url' },
        { text: 'Duration', value: 'duration' },
        { text: 'Subscribed', value: 'users' },
        { text: 'Status', value: 'status' },
      ],
    };
  },
  computed: {
    ...mapState({
      courses: (state) => state.courses.courses,
      courseDrawer: (state) => state.courses.courseDrawer,
      successMessage: (state) => state.courses.successMessage,
      errorMessage: (state) => state.courses.errorMessage,
    }),
    drawer: {
      get() {
        return this.courseDrawer;
      },
      set(val) {
        this.setCourseDrawer(val);
      },
    },
  },
  methods: {
    ...mapMutations('courses', ['setCourseDrawer', 'cleanStates']),
    ...mapActions('courses', ['getCourses']),
    setCourse(course) {
      this.course = course;
      this.drawer = true;
    },
    getColor(status) {
      return status ? 'blue lighten-2' : 'red lighten-2';
    },
    onDrawerClose(value) {
      if (!value) {
        this.course = {};
        this.newCourseDrawer = false;
        this.cleanStates();
      }
    },
    openNewCourseDrawer() {
      this.newCourseDrawer = true;
      this.drawer = true;
    },
  },
  mounted() {
    this.getCourses();
  },
};
</script>
