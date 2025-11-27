export const getUrl = async () => {
  try {
    const url = process.env.NEXT_PUBLIC_API_URL_V1;
    if (!url) {
      throw new Error('Missing URL');
    }
    return url;
  } catch (err) {
    throw new Error(`Failed to get URL ${err}`);
  }
};
