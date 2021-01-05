import { shallowMount } from '@vue/test-utils';
import App from '@/App.vue';

describe('App.vue', () => {
  describe('App', () => {
    // Inspect the raw component options
    it('has data', () => {
      expect(typeof App.data).toBe('function');
    });
  });
});