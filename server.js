export const getData = async () => {
  try {
    const res = await fetch("http://localhost:3600/photos");
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const getSingleData = async (id) => {
  try {
    const res = await fetch(`http://localhost:3600/photos/${id}`);
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};
