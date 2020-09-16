const fs = require('fs');
const path = require('path');
const SlateConfig = require('@shopify/slate-config');
const config = new SlateConfig(require('../../../../slate-tools.schema'));

const VALID_LIQUID_TEMPLATES = [
  '404',
  'article',
  'blog',
  'cart',
  'collection',
  'account',
  'activate_account',
  'addresses',
  'login',
  'order',
  'register',
  'reset_password',
  'gift_card',
  'index',
  'list-collections',
  'page',
  'password',
  'product',
  'search',
];

function isValidTemplate(filename) {
  const name = VALID_LIQUID_TEMPLATES.filter((template) =>
    filename.startsWith(`${template}.`)
  );
  return Boolean(name);
}

module.exports = function () {
  const entrypoints = {};

  // ? [REVISIT] shared export `moduleExtentions` array
  const extensions = ['js', 'ts', 'tsx'];
  extensions.forEach((ext) => {
    fs.readdirSync(config.get('paths.theme.src.templates')).forEach((file) => {
      const name = path.parse(file).name;
      const fileName = path.join(
        config.get('paths.theme.src.scripts'),
        'templates',
        `${name}.${ext}`
      );

      if (isValidTemplate(name) && fs.existsSync(fileName)) {
        entrypoints[`template.${name}`] = fileName;
      }
    });

    fs.readdirSync(config.get('paths.theme.src.templates.customers')).forEach(
      (file) => {
        const name = `${path.parse(file).name}`;
        const fileName = path.join(
          config.get('paths.theme.src.scripts'),
          'templates',
          'customers',
          `${name}.${ext}`
        );

        if (isValidTemplate(name) && fs.existsSync(fileName)) {
          entrypoints[`template.${name}`] = fileName;
        }
      }
    );
  });

  return entrypoints;
};
