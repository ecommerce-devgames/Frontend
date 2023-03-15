const useStringGenerator = (array) => {
  return array
    .map((item) => (item.name))
    .join(", ");
};

export default useStringGenerator;
