import {
  isAddress,
  isBloom,
  isContractAddressInBloom,
  isInBloom,
  isTopic,
  isTopicInBloom,
  isUserEthereumAddressInBloom,
} from './index';
import { toByteArray } from './utils';

const bloomFilter =
  '0x08200081a06415012858022200cc48143008908c0000824e5405b41520795989024800380a8d4b198910b422b231086c3a62cc402e2573070306f180446440ad401016c3e30781115844d028c89028008a12240c0a2c184c0425b90d7af0530002f981221aa565809132000818c82805023a132a25150400010530ba0080420a10a137054454021882505080a6b6841082d84151010400ba8100c8802d440d060388084052c1300105a0868410648a40540c0f0460e190400807008914361118000a5202e94445ccc088311050052c8002807205212a090d90ba428030266024a910644b1042011aaae05391cc2094c45226400000380880241282ce4e12518c';

describe('isAddress', () => {
  it('should return true with a valid ethereum address', () => {
    expect(isAddress('0x494bfa3a4576ba6cfe835b0deb78834f0c3e3994')).toEqual(
      true,
    );
  });

  it('should return false with a invalid ethereum address', () => {
    expect(isAddress('0x494bfa3a4576ba6cfe878834f0c3e3994')).toEqual(false);
  });

  it('should return false with number', () => {
    // @ts-ignore
    expect(isAddress(0)).toEqual(false);
  });

  it('should return false with boolean', () => {
    // @ts-ignore
    expect(isAddress(false)).toEqual(false);
  });

  it('should return false with object', () => {
    // @ts-ignore
    expect(isAddress({})).toEqual(false);
  });

  it('should return true with a valid ICAP address', () => {
    expect(isAddress('XE472EVKU3CGMJF2YQ0J9RO1Y90BC0LDFZ')).toEqual(true);
  });
});

describe('isBloom', () => {
  it('should return true if bloom is a valid bloom', () => {
    expect(isBloom(bloomFilter)).toEqual(true);
  });

  it('should return false if bloom is a number', () => {
    expect(isBloom(1 as any)).toEqual(false);
  });

  it('should return false if bloom is a boolean', () => {
    expect(isBloom(true as any)).toEqual(false);
  });

  it('should return false if bloom is a object', () => {
    expect(isBloom({} as any)).toEqual(false);
  });

  it('should return false if bloom is invalid', () => {
    expect(isBloom('invalid')).toEqual(false);
  });
});

describe('isInBloom', () => {
  it('should return true if value is in bloom passing in hex string', () => {
    expect(
      isInBloom(bloomFilter, '0x58a4884182d9e835597f405e5f258290e46ae7c2'),
    ).toEqual(true);
  });

  it('should return true if value is in bloom passing in bytes', () => {
    expect(
      isInBloom(
        bloomFilter,
        toByteArray('0x58a4884182d9e835597f405e5f258290e46ae7c2'),
      ),
    ).toEqual(true);
  });

  it('should return false if value is not in bloom', () => {
    expect(
      isInBloom(bloomFilter, '0x494bfa3a4576ba6cfe835b0deb78834f0c3e3996'),
    ).toEqual(false);
  });
});

describe('isUserEthereumAddressInBloom', () => {
  it('should throw error if bloom is not valid', () => {
    expect(() => {
      isUserEthereumAddressInBloom(
        'invalid',
        '0x494bfa3a4576ba6cfe835b0deb78834f0c3e3994',
      );
    }).toThrowError('Invalid bloom given');
  });

  it('should throw error if ethereum address is not valid', () => {
    expect(() => {
      isUserEthereumAddressInBloom(bloomFilter, '0x494b');
    }).toThrowError('Invalid ethereum address given: "0x494b"');
  });

  it('should throw error if ethereum address is a number', () => {
    expect(() => {
      // @ts-ignore
      isUserEthereumAddressInBloom(bloomFilter, 2);
    }).toThrowError('Invalid ethereum address given: "2"');
  });

  it('should throw error if ethereum address is a boolean', () => {
    expect(() => {
      // @ts-ignore
      isUserEthereumAddressInBloom(bloomFilter, false);
    }).toThrowError('Invalid ethereum address given: "false"');
  });

  it('should throw error if ethereum address is a object', () => {
    expect(() => {
      // @ts-ignore
      isUserEthereumAddressInBloom(bloomFilter, {});
    }).toThrowError('Invalid ethereum address given: "[object Object]"');
  });

  it('should return true if ethereum address is in bloom', () => {
    expect(
      isUserEthereumAddressInBloom(
        bloomFilter,
        '0x494bfa3a4576ba6cfe835b0deb78834f0c3e3994',
      ),
    ).toEqual(true);
  });

  it('should return false if ethereum address is not in bloom', () => {
    expect(
      isUserEthereumAddressInBloom(
        bloomFilter,
        '0x494bfa3a4576ba6cfe835b0deb78834f0c3e3996',
      ),
    ).toEqual(false);
  });
});

describe('isContractAddressInBloom', () => {
  it('should throw error if bloom is not valid', () => {
    expect(() => {
      isContractAddressInBloom(
        'invalid',
        '0x58a4884182d9e835597f405e5f258290e46ae7c2',
      );
    }).toThrowError('Invalid bloom given');
  });

  it('should throw error if contract address is not valid', () => {
    expect(() => {
      isContractAddressInBloom(bloomFilter, '0x58a4');
    }).toThrowError('Invalid contract address given: "0x58a4"');
  });

  it('should throw error if contract address is a number', () => {
    expect(() => {
      // @ts-ignore
      isContractAddressInBloom(bloomFilter, 2);
    }).toThrowError('Invalid contract address given: "2"');
  });

  it('should throw error if contract address is a boolean', () => {
    expect(() => {
      // @ts-ignore
      isContractAddressInBloom(bloomFilter, false);
    }).toThrowError('Invalid contract address given: "false"');
  });

  it('should throw error if contract address is a object', () => {
    expect(() => {
      // @ts-ignore
      isContractAddressInBloom(bloomFilter, {});
    }).toThrowError('Invalid contract address given: "[object Object]"');
  });

  it('should return true if contract address is in bloom', () => {
    expect(
      isContractAddressInBloom(
        bloomFilter,
        '0x58a4884182d9e835597f405e5f258290e46ae7c2',
      ),
    ).toEqual(true);
  });

  it('should return false if contract address is not in bloom', () => {
    expect(
      isContractAddressInBloom(
        bloomFilter,
        '0x58a4884182d9e835597f405e5f258290e46ae7c1',
      ),
    ).toEqual(false);
  });
});

describe('isTopicInBloom', () => {
  const topicBloom =
    '0x0020008400000010000000000400000200000008000000000010000000002000000080000020000000080004000000010000000000000040000000000000000000000001000200008000000d000000000010000400000400000100000000000001400008220000000000004000040802004000200000000000000010000041000000020100008000000000000000000000000010000000080000000000800900000000000000000000000000100000800000000000000c28000000000000010000000002000040002000000080000000000000000000000020120020000020200000000040000000000000040000000400000000000000000000020000000000';

  it('should throw error if bloom is not valid', () => {
    expect(() => {
      isTopicInBloom(
        'invalid',
        '0x4d61726b65745061792e696f206973206465706c6f79696e6720536d61727420',
      );
    }).toThrowError('Invalid bloom given');
  });

  it('should throw error if topic is not valid', () => {
    expect(() => {
      isTopicInBloom(topicBloom, '0x4d61');
    }).toThrowError('Invalid topic');
  });

  it('should throw error if topic is a number', () => {
    expect(() => {
      // @ts-ignore
      isTopicInBloom(topicBloom, 233);
    }).toThrowError('Invalid topic');
  });

  it('should throw error if topic is a bool', () => {
    expect(() => {
      // @ts-ignore
      isTopicInBloom(topicBloom, false);
    }).toThrowError('Invalid topic');
  });

  it('should throw error if topic is a object', () => {
    expect(() => {
      // @ts-ignore
      isTopicInBloom(topicBloom, {});
    }).toThrowError('Invalid topic');
  });

  it('should return true if topic is in bloom', () => {
    expect(
      isTopicInBloom(
        topicBloom,
        '0x000000000000000000000000b3bb037d2f2341a1c2775d51909a3d944597987d',
      ),
    ).toEqual(true);
  });

  it('should return false if topic is not in bloom', () => {
    expect(
      isTopicInBloom(
        topicBloom,
        '0x4d61726b65745061792e696f206973206465706c6f79696e6720536d61727420',
      ),
    ).toEqual(false);
  });

  it('should return true if topic is in bloom', () => {
    expect(
        isTopicInBloom(
            "0x00000000000000000000008000000000000000000000000000000000000000000000000000080000000000000000000000000000000000000000000000044000200000000000000000002000000000000000000000040000000000000000000000000000020000000000000000000800000000000800000000000800000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000808002000000000400000000000000000000000060000000000000000000000000000000000000000000000100000000000002000000",
            "0x4a39dc06d4c0dbc64b70af90fd698a233a518aa5d07e595d983b8c0526c8f7fb"
        ),
    ).toEqual(true);
  });
});

describe('isTopic', () => {
  it('should return false if topic is not valid', () => {
    expect(isTopic('0x4d61')).toEqual(false);
  });

  it('should return false if topic is a number', () => {
    // @ts-ignore
    expect(isTopic(233)).toEqual(false);
  });

  it('should return false if topic is a bool', () => {
    // @ts-ignore
    expect(isTopic(false)).toEqual(false);
  });

  it('should return false if topic is a object', () => {
    // @ts-ignore
    expect(isTopic({})).toEqual(false);
  });

  it('should return true if topic is valid', () => {
    expect(
      isTopic(
        '0x000000000000000000000000b3bb037d2f2341a1c2775d51909a3d944597987d',
      ),
    ).toEqual(true);
  });
});
