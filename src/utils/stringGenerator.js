const stringGenerator = (array) => { 
  return array
    .map((item) => (item.name))
    .join(", ");
};

export default stringGenerator;
