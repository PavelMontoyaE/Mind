<template>
  <div>
    <v-list two-line>
      <v-list-item>
        <v-list-item-icon>
          <v-icon color="green">
            mdi-video
          </v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ course.name }}</v-list-item-title>
          <v-list-item-subtitle>Name</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-list-item>
        <v-list-item-action></v-list-item-action>

        <v-list-item-content>
          <v-list-item-title class="long-text">{{
            course.description
          }}</v-list-item-title>
          <v-list-item-subtitle>Description</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider inset></v-divider>

      <v-list-item>
        <v-list-item-icon>
          <v-icon color="green">
            mdi-url
          </v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title class="long-text"
            ><a :href="course.url">{{ course.url }}</a></v-list-item-title
          >
          <v-list-item-subtitle>Personal</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider inset></v-divider>

      <v-list-item>
        <v-list-item-icon>
          <v-icon color="green">
            mdi-information
          </v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ course.duration }}</v-list-item-title>
          <v-list-item-subtitle>Duration</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-list-item>
        <v-list-item-action></v-list-item-action>

        <v-list-item-content>
          <v-list-item-title>
            {{ course.status ? 'Active' : 'Inactive' }}
          </v-list-item-title>
          <v-list-item-subtitle>Status</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-list-item>
        <v-list-item-action></v-list-item-action>

        <v-list-item-content>
          <v-list-item-title>{{
            course.createdAt | formatDate
          }}</v-list-item-title>
          <v-list-item-subtitle>Created At</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-form v-if="showEditCompletedTime">
        <v-list-item>
          <v-list-item-action></v-list-item-action>

          <v-list-item-content>
            <v-col cols="6" v-if="false">
              <v-text-field label="Hour"></v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                label="Completed Time (Minutes)"
                v-model="completedMinutes"
                type="number"
                :max="course.duration"
              ></v-text-field>
            </v-col>
          </v-list-item-content>
        </v-list-item>

        <v-list-item>
          <v-list-item-title>
            <v-btn class="float-right mr-3" color="green" @click="saveCompleted"
              >Save</v-btn
            >
          </v-list-item-title>
        </v-list-item>
      </v-form>

      <v-list-item v-else>
        <v-list-item-title>
          <v-btn
            class="float-right mr-3"
            :color="isCourseAssigned ? 'red' : 'green'"
            @click="assignCourse()"
          >
            {{ isCourseAssigned ? 'Unnassign' : 'Take Course' }}
          </v-btn>
        </v-list-item-title>
      </v-list-item>
    </v-list>

    <v-dialog v-model="dialog" persistent max-width="290">
      <v-card>
        <v-card-title class="headline">
          Unnasign Course?
        </v-card-title>
        <v-card-text>
          Do you want to remove the course "{{ course.name }}" from your
          courses?
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="gray darken-1" text @click="dialog = false">
            Cancel
          </v-btn>
          <v-btn color="red darken-1" text @click="unassignUser(user.id)">
            Unnasign
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { formatDate } from '../../filters/date-formats.filter';

export default {
  filters: {
    formatDate,
  },
  data() {
    return {
      dialog: false,
      completedMinutes: 0,
    };
  },
  computed: {
    ...mapState({
      course: (state) => state.courses.course,
      user: (state) => state.users.user,
      drawerType: (state) => state.courses.drawerType,
    }),
    isCourseAssigned() {
      const { courses } = this.user;
      return (
        this.course &&
        courses &&
        courses.some((course) => course.id === this.course.id)
      );
    },
    showEditCompletedTime() {
      return this.isCourseAssigned && this.drawerType === 'Edit Time';
    },
  },
  methods: {
    ...mapActions('courses', [
      'assignUser',
      'unassignUser',
      'updateCourseUser',
    ]),
    ...mapActions('users', ['getUser']),
    assignCourse() {
      if (this.isCourseAssigned) {
        this.dialog = true;
      } else {
        this.assignUser({ user_id: this.user.id });
      }
    },
    saveCompleted() {
      this.updateCourseUser({
        userId: this.user.id,
        payload: { completed: this.completedMinutes },
      });
    },
  },
  watch: {
    course(val) {
      this.completedMinutes = this.showEditCompletedTime
        ? val.CourseUser.completed
        : 0;
    },
  },
};
</script>

<style scoped>
.v-list-item__title.long-text {
  white-space: normal;
}
</style>
