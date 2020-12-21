<template>
  <v-container>
    <div class="text-h2 my-2">Courses</div>
    <v-data-table :headers="headers" :items="courses" :items-per-page="5">
      <template v-slot:item.url="{ item }">
        <a :href="item.url">{{ item.url }}</a>
      </template>
      <template v-slot:item.status="{ item }">
        <v-icon :color="getColor(item.status)">
          {{ item.status ? 'mdi-thumb-up' : 'mdi-thumb-down' }}
        </v-icon>
      </template>
    </v-data-table>
    <div v-for="post in posts" :key="post.id">
      <h3>Post Title:</h3>
      {{ post.title }}
      <h3>Post Body:</h3>
      {{ post.body }}
    </div>
  </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'Home',
  data() {
    return {
      headers: [
        { text: 'Id', value: 'id' },
        { text: 'Name', value: 'name' },
        { text: 'URL', value: 'url' },
        { text: 'Duration', value: 'duration' },
        { text: 'Status', value: 'status' },
      ],
    };
  },
  computed: {
    ...mapState({
      courses: (state) => state.courses,
    }),
  },
  mounted() {
    this.getCourses();
  },
  methods: {
    ...mapActions(['getCourses']),
    getColor(status) {
      return status ? 'blue lighten-2' : 'red lighten-2';
    },
  },
};
</script>
