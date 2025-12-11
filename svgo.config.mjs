const config = {
  multipass: true,
  plugins: [
    "preset-default",
    "convertStyleToAttrs",
    {
      name: "removeAttrs",
      params: {
        attrs: ["fill", "width", "height"],
      }
    },
  ],
};

export default config;
