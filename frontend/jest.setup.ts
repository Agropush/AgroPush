// Learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

if (typeof URL.createObjectURL === 'undefined') {
  URL.createObjectURL = jest.fn(() => 'blob:mock');
}
if (typeof URL.revokeObjectURL === 'undefined') {
  URL.revokeObjectURL = jest.fn();
}

if (typeof globalThis.TextEncoder === 'undefined') {
  const { TextEncoder, TextDecoder } = require('util');
  globalThis.TextEncoder = TextEncoder;
  globalThis.TextDecoder = TextDecoder;
}
