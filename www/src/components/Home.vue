<template>
  <v-container>
    <div class="text-h3 my-2">Home</div>
    <v-data-table :headers="headers" :items="courses" :items-per-page="5">
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
  </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import toHours from '../filters/minutes-to-hours.filter';
import countUsers from '../filters/count-users.filter';

export default {
  name: 'Home',
  filters: {
    toHours,
    countUsers,
  },
  data() {
    return {
      headers: [
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
    getColor(status) {
      return status ? 'blue lighten-2' : 'red lighten-2';
    },
  },
};
</script>
