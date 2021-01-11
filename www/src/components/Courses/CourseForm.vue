<template>
  <div>
    <v-form>
      <v-text-field v-model="course.name" label="Name"></v-text-field>
      <v-text-field v-model="course.url" label="URL"></v-text-field>
      <v-text-field
        v-model="course.description"
        label="Description"
      ></v-text-field>
      <v-text-field v-model="course.duration" label="Duration"></v-text-field>
      <v-select
        v-model="course.type"
        label="Types"
        item-text="name"
        item-value="id"
        :items="types"
      ></v-select>
      <v-checkbox v-model="course.status" label="Status"></v-checkbox>

      <template v-if="drawerType === 'new'">
        <v-btn
          color="primary"
          class="pull-right"
          :disable="loading"
          :loading="loading"
          @click="createCourse(course)"
        >
          Create
        </v-btn>
      </template>
      <template v-else>
        <v-btn class="mr-2" @click="setCourseDrawer(false)">Close</v-btn>
        <v-btn
          color="primary"
          class="mr-2"
          :disable="loading"
          :loading="loading"
          @click="updateCourse(course)"
        >
          Update
        </v-btn>
        <v-btn
          color="error"
          class="float-right"
          :disable="loading"
          :loading="loading"
          @click.stop="dialog = true"
        >
          Delete
        </v-btn>
      </template>
    </v-form>
    <v-dialog v-model="dialog" persistent max-width="290">
      <v-card>
        <v-card-title class="headline">
          Delete Course?
        </v-card-title>
        <v-card-text>
          Do you want to delete the course "{{ course.name }}"?
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="gray darken-1" text @click="dialog = false">
            Cancel
          </v-btn>
          <v-btn color="red darken-1" text @click="deleteCourse(course.id)">
            Delete
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex';

export default {
  props: {
    model: Object,
  },
  data() {
    return {
      course: {},
      dialog: false,
    };
  },
  computed: {
    ...mapState({
      loading: (state) => state.session.loading,
      types: (state) => state.types.types,
      drawerType: (state) => state.types.drawerType,
    }),
  },
  methods: {
    ...mapMutations('courses', ['setCourseDrawer']),
    ...mapActions('courses', ['updateCourse', 'deleteCourse', 'createCourse']),
    ...mapActions('types', ['getTypes']),
    assignCourse(value) {
      this.course = {
        id: value.id,
        name: value.name,
        url: value.url,
        description: value.description,
        duration: value.duration,
        type: value.type,
        status: value.status,
      };
    },
  },
  watch: {
    model(value) {
      this.assignCourse(value);
    },
  },
  async created() {
    await this.getTypes();
    this.assignCourse(this.model);
  },
};
</script>

<style></style>
