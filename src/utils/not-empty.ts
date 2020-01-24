/**
 * [1,null,3].filter(Boolean) leads to type (number | null)[]
 * [1,null,3].filter(notEmpty) leads to number[]
 */
const notEmpty = <TValue>(
  value: TValue | null | undefined,
): value is TValue => {
  return value !== null && value !== undefined;
};

export default notEmpty;
