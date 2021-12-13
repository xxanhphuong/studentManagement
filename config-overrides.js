const path = require("path");
// eslint-disable-next-line import/no-extraneous-dependencies
const {
  override,
  addWebpackAlias,
  addPostcssPlugins,
  fixBabelImports,
  addLessLoader,
} = require("customize-cra");

/**
 *  Add orverride theme antd
 *  fixBabelImports - addLessLoader
 *  https://ant.design/docs/react/customize-theme
 *
 *  Config tailwind - addPostcssPlugins
 *  add an alias for "our" imports - addWebpackAlias
 */

module.exports = function (config, env) {
  return Object.assign(
    config,
    override(
      fixBabelImports("import", {
        libraryName: "antd",
        libraryDirectory: "es",
        style: true,
      }),
      addLessLoader({
        javascriptEnabled: true,
        modifyVars: { "@primary-color": "#3444d2", "@button-color": "#757575" },
      }),
      addPostcssPlugins([require("tailwindcss")]),
      addWebpackAlias({
        "@iso/assets": path.resolve(__dirname, "src/_assets"),
        "@iso/components": path.resolve(__dirname, "src/_components"),
        "@iso/actions": path.resolve(__dirname, "src/_actions"),
        "@iso/helpers": path.resolve(__dirname, "src/_helpers"),
        "@iso/state": path.resolve(__dirname, "src/_state"),
        "@iso/pages": path.resolve(__dirname, "src/_pages"),
      })
    )(config, env)
  );
};
