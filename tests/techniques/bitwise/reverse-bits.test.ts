import { describe, it, expect } from 'bun:test';
import reverseBits from '../../../src/techniques/bitwise/reverse-bits';

describe('reverseBits', () => {
  it('should reverse bits correctly for 0', () => {
    // 0 reversed is still 0
    expect(reverseBits(0)).toBe(0);
  });

  it('should reverse bits correctly for powers of 2', () => {
    // 1 (00000000000000000000000000000001) reversed is 2147483648 (10000000000000000000000000000000)
    expect(reverseBits(1)).toBe(2147483648);
    
    // 2 (00000000000000000000000000000010) reversed is 1073741824 (01000000000000000000000000000000)
    expect(reverseBits(2)).toBe(1073741824);
    
    // 4 (00000000000000000000000000000100) reversed is 536870912 (00100000000000000000000000000000)
    expect(reverseBits(4)).toBe(536870912);
    
    // 8 (00000000000000000000000000001000) reversed is 268435456 (00010000000000000000000000000000)
    expect(reverseBits(8)).toBe(268435456);
    
    // 16 (00000000000000000000000000010000) reversed is 134217728 (00001000000000000000000000000000)
    expect(reverseBits(16)).toBe(134217728);
  });

  it('should reverse bits correctly for other numbers', () => {
    // 43261596 (00000010100101000001111010011100) reversed is 964176192 (00111001011110000010100101000000)
    expect(reverseBits(43261596)).toBe(964176192);
    
    // 3 (00000000000000000000000000000011) reversed is 3221225472 (11000000000000000000000000000000)
    expect(reverseBits(3)).toBe(3221225472);
    
    // 10 (00000000000000000000000000001010) reversed is 1342177280 (01010000000000000000000000000000)
    expect(reverseBits(10)).toBe(1342177280);
  });

  it('should be its own inverse operation', () => {
    // Reversing bits twice should give the original number
    expect(reverseBits(reverseBits(0))).toBe(0);
    expect(reverseBits(reverseBits(1))).toBe(1);
    expect(reverseBits(reverseBits(10))).toBe(10);
    expect(reverseBits(reverseBits(43261596))).toBe(43261596);
    expect(reverseBits(reverseBits(4294967295))).toBe(4294967295); // 2^32 - 1
  });

  it('should handle edge cases correctly', () => {
    // 2^32 - 1 (all bits set) reversed is still all bits set
    expect(reverseBits(4294967295)).toBe(4294967295);
    
    // 2^31 (sign bit only) reversed is 1
    expect(reverseBits(2147483648)).toBe(1);
  });
});