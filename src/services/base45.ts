import {Buffer} from 'buffer';
import * as E from 'fp-ts/lib/Either';

const BASE45_CHARSET = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ $%*+-./:';

export const decodeBase45 = (str: string): E.Either<Error, Buffer> => {
  let output = [];
  let buf = [];

  for (let i = 0, length = str.length; i < length; i++) {
    let j = BASE45_CHARSET.indexOf(str[i]);
    if (j < 0) return E.left(new Error('Base45 decode: unknown character'));
    buf.push(j);
  }

  for (let i = 0, length = buf.length; i < length; i += 3) {
    let x = buf[i] + buf[i + 1] * 45;
    if (length - i >= 3) {
      let [d, c] = divmod(x + buf[i + 2] * 45 * 45, 256);
      output.push(d);
      output.push(c);
    } else {
      output.push(x);
    }
  }
  return E.right(Buffer.from(output));
};

const divmod = (a: number, b: number) => {
  let remainder = a;
  let quotient = 0;
  if (a >= b) {
    remainder = a % b;
    quotient = (a - remainder) / b;
  }
  return [quotient, remainder];
};
