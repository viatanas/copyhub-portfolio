const getLargerGoogleImage = (photoUrl) => {
  let url = photoUrl;
  url = url.replace("s96-c", "s300-c");
  return url;
};

export default getLargerGoogleImage;
