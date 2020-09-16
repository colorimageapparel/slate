const fs = require('fs');
const path = require('path');
const SlateConfig = require('@shopify/slate-config');
const config = new SlateConfig(require('../../../../slate-tools.schema'));

module.exports = function () {
  const entrypoints = {};

  fs.readdirSync(config.get('paths.theme.src.layout')).forEach((file) => {
    const name = path.parse(file).name;
    // ? [REVISIT] shared export `moduleExtentions` array
    const extensions = ['js', 'ts', 'tsx'];
    extensions.forEach((ext) => {
      const fileName = path.join(
        config.get('paths.theme.src.scripts'),
        'layout',
        `${name}.${ext}`
      );
      if (fs.existsSync(fileName)) {
        entrypoints[`layout.${name}`] = fileName;
      }
    });
  });
  return entrypoints;
};
