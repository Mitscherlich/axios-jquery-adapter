export function isObjectLike(value: any): value is Object {
  return !!value && typeof value == 'object'
}
