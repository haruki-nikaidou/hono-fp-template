import * as crypto from 'node:crypto';
import {IO} from 'fp-ts/IO';

const alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
const alphabetLength = alphabet.length;

export function getRandomString(length: number): IO<string> {
  return () => {
    const buffer = crypto.randomBytes(length);
    let result = '';
    for (let i = 0; i < length; i++) {
      result += alphabet[buffer[i] % alphabetLength];
    }
    return result;
  }
}