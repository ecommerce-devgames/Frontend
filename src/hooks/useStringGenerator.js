const useStringGenerator = (array) => {
  return array
    .map((item) => (item.platform ? item.platform.name : item.name))
    .join(", ");
};

export default useStringGenerator;
