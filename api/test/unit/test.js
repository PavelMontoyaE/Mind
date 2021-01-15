import { jest } from '@jest/globals';
import testSummary from '../../src/test-nyc.js';
import * as Course from '../../src/controller/course.controller.js';
import * as User from '../../src/controller/user.controller.js';

test('adds 1 + 2 to equal 3', () => {
  expect(testSummary(1, 2)).toBe(3);
});

test('[Course.findAll] it should return an array', () => {
  let req = { query: {} };
  let res = {
    status: jest.fn(),
    send: jest.fn((data) => {
      expect(typeof data).toBe('array');
    }),
  };
  Course.findAll(req, res);
});

test('[Course.findOne] it should return an Object', () => {
  let req = { params: { id: 1 } };
  let res = {
    status: jest.fn(),
    send: jest.fn((data) => {
      expect(typeof data).toBe('object');
    }),
  };
  Course.findOne(req, res);
});

test('[Course.findOne] Id should match', () => {
  let req = { params: { id: 1 } };
  let res = {
    status: jest.fn(),
    send: jest.fn((data) => {
      expect(data.id).toBe(1);
    }),
  };
  Course.findOne(req, res);
});

// Users
test('[User.findAll] it should return an array', () => {
  let req = { query: {} };
  let res = {
    status: jest.fn(),
    send: jest.fn((data) => {
      expect(typeof data).toBe('array');
    }),
  };
  User.findAll(req, res);
});

test('[User.findOne] it should return an Object', () => {
  let req = { params: { id: 1 } };
  let res = {
    status: jest.fn(),
    send: jest.fn((data) => {
      expect(typeof data).toBe('object');
    }),
  };
  User.findOne(req, res);
});

test('[User.findOne] Id should match', () => {
  let req = { params: { id: 1 } };
  let res = {
    status: jest.fn(),
    send: jest.fn((data) => {
      expect(data.id).toBe(1);
    }),
  };
  User.findOne(req, res);
});