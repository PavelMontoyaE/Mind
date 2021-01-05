import courses from '@/store/courses.js';

const { getCourses } = courses.actions;

describe('mutations', () => {
  it('getCourses must get courses', async () => {
    const commit = jest.fn();

    const courses = await getCourses({ commit });
    expect(commit).toHaveBeenCalledWith('setCourses', true);
  });
});
