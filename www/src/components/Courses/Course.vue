<template>
  <v-container>
    <course-form
      v-if="drawerType === 'New' || drawerType === 'Edit'"
    ></course-form>
    <course-info></course-info>
  </v-container>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex';
import CourseForm from './CourseForm';
import CourseInfo from './CourseInfo';

export default {
  components: {
    CourseForm,
    CourseInfo,
  },
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
      drawerType: (state) => state.courses.drawerType,
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
