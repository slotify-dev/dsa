/**
 * Bitwise Operations Module
 * 
 * This module exports a collection of utility functions for bit manipulation operations.
 * Each function is implemented using efficient bitwise operations to perform common tasks
 * such as setting, clearing, toggling, and checking bits, as well as more complex operations
 * like counting set bits, finding powers of two, and performing arithmetic without standard operators.
 */

import setBit from './set-bit';
import clearBit from './clear-bit';
import isBitSet from './is-bit-set';
import toggleBit from './toggle-bit';
import updateBit from './update-bit';
import reverseBits from './reverse-bits';
import countSetBits from './count-set-bits';
import absoluteValue from './absolute-value';
import isPowerOfTwo from './is-power-of-two';
import addWithoutPlus from './add-without-plus';
import nextPowerOfTwo from './next-power-of-two';
import swapWithoutTemp from './swap-without-temp';
import haveOppositeSigns from './have-opposite-signs';
import divideByPowerOfTwo from './divide-by-power-of-two';
import multiplyByPowerOfTwo from './multiply-by-power-of-two';
import getMostSignificantSetBit from './get-most-significant-set-bit';
import getLeastSignificantSetBit from './get-least-significant-set-bit';

export {
  setBit,
  clearBit,
  isBitSet,
  toggleBit,
  updateBit,
  reverseBits,
  countSetBits,
  isPowerOfTwo,
  absoluteValue,
  nextPowerOfTwo,
  addWithoutPlus,
  swapWithoutTemp,
  haveOppositeSigns,
  divideByPowerOfTwo,
  multiplyByPowerOfTwo,
  getMostSignificantSetBit,
  getLeastSignificantSetBit,
};