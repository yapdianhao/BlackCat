export const cloneMap = (inputMap: Map<any, any>): Map<any, any> => {
  const cloned = new Map();
  for (const k of inputMap.keys()) {
    cloned.set(k, inputMap.get(k));
  }
  return cloned;
};
