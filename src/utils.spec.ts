import { keccak256, padLeft, bytesToHex, toByteArray } from './utils';

describe('Utils', () => {
  describe('keccak256', () => {
    it('should create a valid keccak256', () => {
      expect(
        keccak256(
          new Uint8Array([
            128,
            233,
            166,
            81,
            145,
            238,
            90,
            178,
            57,
            224,
            144,
            136,
            52,
            124,
            229,
            115,
            206,
            32,
            52,
            193,
            165,
            58,
            75,
            218,
            231,
            233,
            47,
            138,
            176,
            156,
            205,
            235
          ])
        )
      ).toEqual(
        '0x595e00461a4a3d14439fc1d1e47577c1e41ce8c54148e46b9f932103f85a15a9'
      );
    });
  });

  describe('padLeft', () => {
    it('should pad hex string to 32 length (with the 0x = 34)', () => {
      const hexString = '0x01';

      const string = padLeft(hexString, 32);
      expect(string).toHaveLength(34);
    });
  });

  describe('bytesToHex', () => {
    it('should turn bytes into a hex string', () => {
      const bytes = new Uint8Array([
        177,
        230,
        7,
        146,
        18,
        136,
        143,
        11,
        224,
        207,
        85,
        135,
        75,
        46,
        185,
        215,
        165,
        224,
        44,
        217
      ]);
      const hexString = bytesToHex(bytes);
      expect(hexString).toEqual('0xb1e6079212888f0be0cf55874b2eb9d7a5e02cd9');
    });
  });

  describe('toByteArray', () => {
    it('should throw error if value passed in is null', () => {
      expect(() => {
        toByteArray(null);
      }).toThrowError('cannot convert null value to array');
    });

    it('should throw error if value passed in not a valid hexidecimal', () => {
      expect(() => {
        toByteArray('notvalid');
      }).toThrowError('invalid hexidecimal string');
    });

    it('should throw error if value passed in does not start with a 0x', () => {
      expect(() => {
        toByteArray('494bfa3a4576ba6cfe878834f0c3e3994');
      }).toThrowError('hex string must have 0x prefix');
    });

    it('should return valid converted uint8array', () => {
      expect(toByteArray('0x494bfa3a4576ba6cfe878834f0c3e3994')).toEqual(
        new Uint8Array([
          4,
          148,
          191,
          163,
          164,
          87,
          107,
          166,
          207,
          232,
          120,
          131,
          79,
          12,
          62,
          57,
          148
        ])
      );
    });

    it('should return correct uint8array if passed in uint8array', () => {
      expect(
        toByteArray(
          new Uint8Array([
            4,
            148,
            191,
            163,
            164,
            87,
            107,
            166,
            207,
            232,
            120,
            131,
            79,
            12,
            62,
            57,
            148
          ])
        )
      ).toEqual(
        new Uint8Array([
          4,
          148,
          191,
          163,
          164,
          87,
          107,
          166,
          207,
          232,
          120,
          131,
          79,
          12,
          62,
          57,
          148
        ])
      );
    });
  });
});
