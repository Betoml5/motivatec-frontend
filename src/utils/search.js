export const searchFilter = (array, query) => {
  return array.filter(
    (item) =>
      item?.name?.toLowerCase().includes(query.toLowerCase()) ||
      item?.group?.name.toLowerCase().includes(query.toLowerCase()) ||
      item?.lastName.toLowerCase().includes(query.toLowerCase()) ||
      item?.controlNumber.toLowerCase().includes(query.toLowerCase())
  );
};
