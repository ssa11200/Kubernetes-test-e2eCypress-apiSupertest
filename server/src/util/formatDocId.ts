// transforms _id to id in Schema transform functions
export const applyIdTransform = (ret: any) => {
  const { _id, ...rest } = ret;
  const result = {
    id: ret._id,
    ...rest,
  };
  return result;
};
