import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import Vuetify from 'vuetify';
import Courses from '@/components/Courses';
import courses from '@/store/courses';

describe('courses.vue', () => {
  let localVue = null;
  let actions;
  let state;
  let store;

  beforeEach(() => {
    localVue = require('vue');
    localVue.use(Vuetify);
    localVue.use(Vuex);
    state = {
      courses: [
        {
          id: 1,
          name: 'Test1',
          url: 'http://yt.com/asdasd',
          state: true,
        },
      ],
    };

    actions = {
      getCourses: jest.fn(),
    };

    store = new Vuex.Store({
      modules: {
        courses: {
          state: courses.state,
          actions: courses.actions,
          namespaced: true,
        },
      },
    });
  });

  afterEach(() => {
    localVue = null;
  });

  
  it('dispatches "getCourses" when "created" event is triggered', () => {
    shallowMount(Courses, { store, localVue });
    expect(actions.getCourses).toHaveBeenCalled();
  });
});
