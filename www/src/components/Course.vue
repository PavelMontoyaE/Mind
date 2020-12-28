<template>
  <v-container>
    <v-form>
      <v-text-field v-model="course.name" label="Name"></v-text-field>
      <v-text-field v-model="course.url" label="URL"></v-text-field>
      <v-text-field
        v-model="course.description"
        label="Description"
      ></v-text-field>
      <v-text-field v-model="course.duration" label="Duration"></v-text-field>
      <v-checkbox v-model="course.status" label="Status"></v-checkbox>
      <v-btn class="mr-2" @click="$emit('on-close')">Close</v-btn>
      <v-btn color="primary">Update</v-btn>
    </v-form>
  </v-container>
</template>

<script>
export default {
  props: {
    model: Object,
  },
  data() {
    return {
      course: {},
    };
  },
  watch: {
    model(value) {
      this.course = {
        id: value.id,
        name: value.name,
        url: value.url,
        description: value.description,
        duration: value.duration,
        status: value.status,
      };
    },
  },
};
</script>

<style></style>
