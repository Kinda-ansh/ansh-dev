const ImageRule = {
  logo: {
    path: "assets/images/logoIcon",
    height: 2000,
    width: 2000,
    ext: [".jpg", ".jpeg", ".png"],
  },
  favicon: {
    path: "assets/images/favicon",
    height: 2000,
    width: 2000,
    ext: [".jpg", ".jpeg", ".png"],
  },
  extensions: {
    path: "assets/images/extensions",
    size: "36x36",
  },
  seo: {
    path: "assets/images/seo",
    size: "600x315",
  },
  notification: {
    path: "assets/images/notify",
    height: 2000,
    width: 2000,
    ext: [".jpg", ".jpeg", ".png", ".webp"],
  },
   brand_logo: {
      path: "assets/images/brand/logo",
      height: 2000,
      width: 2000,
      ext: [".jpg", ".jpeg", ".png", ".svg", ".webp"],
    },
  } 


module.exports = {
  ImageRule,
};
