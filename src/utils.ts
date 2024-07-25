import { keccak_256 } from '@noble/hashes/sha3';
import { bytesToHex as toHex } from '@noble/hashes/utils';

/**
 * Keccak256 hash
 * @param data The data
 */
export function keccak256(data: string | ArrayLike<number>): string {
  return bytesToHex(keccak_256(toByteArray(data)));
}

/**
 * Adding padding to string on the left
 * @param value The value
 * @param chars The chars
 */
export const padLeft = (value: string, chars: number) => {
  const hasPrefix = /^0x/i.test(value) || typeof value === 'number';
  value = value.toString().replace(/^0x/i, '');

  const padding = chars - value.length + 1 >= 0 ? chars - value.length + 1 : 0;

  return (hasPrefix ? '0x' : '') + new Array(padding).join('0') + value;
};

/**
 * Convert bytes to hex
 * @param bytes The bytes
 */
export function bytesToHex(bytes: Uint8Array): string {
  return "0x" + toHex(bytes);
}

/**
 * To byte array
 * @param value The value
 */
export function toByteArray(value: string | ArrayLike<number>): Uint8Array {
  if (value == null) {
    throw new Error('cannot convert null value to array');
  }

  if (typeof value === 'string') {
    const match = value.match(/^(0x)?[0-9a-fA-F]*$/);

    if (!match) {
      throw new Error('invalid hexidecimal string');
    }

    if (match[1] !== '0x') {
      throw new Error('hex string must have 0x prefix');
    }

    value = value.substring(2);
    if (value.length % 2) {
      value = '0' + value;
    }

    const result = [];
    for (let i = 0; i < value.length; i += 2) {
      result.push(parseInt(value.substr(i, 2), 16));
    }

    return addSlice(new Uint8Array(result));
  }

  if (isByteArray(value)) {
    return addSlice(new Uint8Array(value));
  }

  throw new Error('invalid arrayify value');
}

/**
 * Is byte array
 * @param value The value
 */
function isByteArray(value: any): value is string | ArrayLike<number> {
  if (
    !value ||
    // tslint:disable-next-line: radix
    parseInt(String(value.length)) != value.length ||
    typeof value === 'string'
  ) {
    return false;
  }

  for (let i = 0; i < value.length; i++) {
    const v = value[i];
    // tslint:disable-next-line: radix
    if (v < 0 || v >= 256 || parseInt(String(v)) != v) {
      return false;
    }
  }

  return true;
}

/**
 * Add slice to array
 * @param array The array
 */
function addSlice(array: Uint8Array): Uint8Array {
  if (array.slice !== undefined) {
    return array;
  }

  array.slice = () => {
    const args: any = Array.prototype.slice.call(arguments);
    return addSlice(new Uint8Array(Array.prototype.slice.apply(array, args)));
  };

  return array;
}
