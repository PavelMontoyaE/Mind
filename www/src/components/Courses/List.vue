<template>
  <v-data-table :headers="headers" :items="courses" :items-per-page="5">
    <template v-slot:item.id="{ item }">
      <a @click="setDrawerCourse(item)">{{ item.id }}</a>
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
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex';
import toHours from '../../filters/minutes-to-hours.filter';
import countUsers from '../../filters/count-users.filter';

export default {
  name: 'Courses',
  filters: {
    toHours,
    countUsers,
  },
  data() {
    return {
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
      selectedCourse: (state) => state.courses.course,
      courses: (state) => state.courses.courses,
      courseDrawer: (state) => state.courses.courseDrawer,
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
    setDrawerCourse(course) {
      this.setDrawerType('Edit');
      this.course = course;
      this.drawer = true;
    },
    getColor(status) {
      return status ? 'blue lighten-2' : 'red lighten-2';
    },
  },
  mounted() {
    this.getCourses();
  },
};
</script>
