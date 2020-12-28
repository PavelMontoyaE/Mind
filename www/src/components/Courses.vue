<template>
  <v-container>
    <div class="text-h3 my-2">Courses</div>
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
    <v-navigation-drawer v-model="drawer" absolute dark width=400>
      <course :model="course" @on-close="closeDrawer"></course>
    </v-navigation-drawer>
  </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex';
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
      drawer: false,
      course: {},
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
    }),
  },
  mounted() {
    this.getCourses();
  },
  methods: {
    ...mapActions('courses', ['getCourses']),
    setCourse(course) {
      this.course = course;
      this.drawer = true;
    },
    getColor(status) {
      return status ? 'blue lighten-2' : 'red lighten-2';
    },
    closeDrawer() {
      this.drawer = false;
    },
  },
};
</script>
