import assert from 'assert';
import  testSummary from '../src/test-nyc.js';

describe('testSummary', function () {
  it('Should return summary', function () {
    const a = 10;
    const b = 15;
    const summary = a + b;
    assert.deepStrictEqual(testSummary(a, b), summary);
  });
});
