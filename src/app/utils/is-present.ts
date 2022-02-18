import { isString } from './is-string';

export function isPresent(obj: any): obj is object {
  return isString(obj)
    ? isString(obj) && obj !== 'null' && obj !== 'undefined'
    : obj !== null && obj !== undefined;
}
