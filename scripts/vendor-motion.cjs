const { copyFileSync, mkdirSync } = require('node:fs');
const { resolve } = require('node:path');
const root = resolve(__dirname, '..');
const target = resolve(root, 'public/vendor');
mkdirSync(target, { recursive: true });
copyFileSync(resolve(root, 'node_modules/motion/dist/motion.js'), resolve(target, 'motion.js'));
copyFileSync(resolve(root, 'node_modules/motion/LICENSE.md'), resolve(target, 'motion-LICENSE.md'));
console.log('Vendored Motion browser bundle and MIT license');
