export const getURL = async () => {
  try {
    const url = process.env.NEXT_PUBLIC_URL;
    return url;
  } catch (error) {
    console.log(error);
  }
};
