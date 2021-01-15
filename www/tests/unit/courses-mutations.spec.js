import courses from '@/store/courses.js';

const { setCourses, setLoading, cleanStates } = courses.mutations;

describe('mutations', () => {
  it('setCourses must assign courses', () => {
    const state = {
      courses: [],
    };
    const courses = [
      {
        id: 1,
        name: 'Mock',
        url: 'http://www.yt.com/m0ck',
        state: true,
      },
    ];
    // apply mutation
    setCourses(state, courses);
    // assert result
    expect(state.courses).toEqual(courses);
  });

  it('setLoading must assign value', () => {
    const state = {
      loading: false,
    };
    // apply mutation
    setLoading(state, true);
    // assert result
    expect(state.loading).toBeTruthy();
  });

  it('cleanStates must empty states', () => {
    const state = {
      course: { id: 0 },
      loading: true,
      courseDrawer: true,
      successMessage: 'Success',
      errorMessage: 'Error',
    };

    const courseTest = { id: 0 };
    // apply mutation
    cleanStates(state);
    // assert result
    expect(state.course).not.toEqual(expect.objectContaining(courseTest));
    expect(state.loading).toBeFalsy();
    expect(state.courseDrawer).toBeFalsy();
  });
});
