import { describe, it, expect } from 'bun:test';
import swapWithoutTemp from '../../src/bitwise/swap-without-temp';

describe('swapWithoutTemp', () => {
  it('should swap two different positive numbers', () => {
    expect(swapWithoutTemp(5, 10)).toEqual([10, 5]);
    expect(swapWithoutTemp(1, 2)).toEqual([2, 1]);
    expect(swapWithoutTemp(100, 200)).toEqual([200, 100]);
    expect(swapWithoutTemp(123, 456)).toEqual([456, 123]);
  });

  it('should swap when one number is 0', () => {
    expect(swapWithoutTemp(0, 10)).toEqual([10, 0]);
    expect(swapWithoutTemp(5, 0)).toEqual([0, 5]);
  });

  it('should swap when both numbers are the same', () => {
    expect(swapWithoutTemp(5, 5)).toEqual([5, 5]);
    expect(swapWithoutTemp(0, 0)).toEqual([0, 0]);
    expect(swapWithoutTemp(100, 100)).toEqual([100, 100]);
  });

  it('should swap negative numbers', () => {
    expect(swapWithoutTemp(-5, -10)).toEqual([-10, -5]);
    expect(swapWithoutTemp(-1, -2)).toEqual([-2, -1]);
  });

  it('should swap when one number is negative', () => {
    expect(swapWithoutTemp(-5, 10)).toEqual([10, -5]);
    expect(swapWithoutTemp(5, -10)).toEqual([-10, 5]);
  });

  it('should swap large numbers', () => {
    expect(swapWithoutTemp(1000000, 2000000)).toEqual([2000000, 1000000]);
    expect(swapWithoutTemp(-1000000, 2000000)).toEqual([2000000, -1000000]);
  });
});