export const getURL = async () => {
  try {
    const url = process.env.NEXT_PUBLIC_URL;
    if (!url) {
      throw new Error('NEXT_PUBLIC_URL environment variable is not defined');
    }
    return url;
  } catch (error) {
    console.log(error);
  }
};
