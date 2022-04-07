#!/bin/bash
set -e

export NODE_ENV=production


# 生成 dist
echo "===fis dist==="
rm -rf build/dist && ./node_modules/.bin/fis3 release -c -f fis-conf-dist.js

cp -r node_modules/monaco-editor/min/vs/base/browser build/dist/thirds/monaco-editor/min/vs/base

echo "===postcss ie11==="
# 生成去掉变量的 css，动画设置为零
echo ':root { --animation-duration: 0s;}' >>build/dist/ie11-patch.css

cat build/dist/sdk.css build/dist/ie11-patch.css | ./node_modules/.bin/postcss >build/dist/sdk-ie11.css
cat build/dist/ang.css build/dist/ie11-patch.css | ./node_modules/.bin/postcss >build/dist/ang-ie11.css
cat build/dist/dark.css build/dist/ie11-patch.css | ./node_modules/.bin/postcss >build/dist/dark-ie11.css
cat build/dist/antd.css build/dist/ie11-patch.css | ./node_modules/.bin/postcss >build/dist/antd-ie11.css

# 默认变成 cxd 了，所以要拷贝一份兼容之前的引用
cp build/dist/sdk.css build/dist/cxd.css
cp build/dist/sdk-ie11.css build/dist/cxd-ie11.css

cp ./lib/helper.css build/dist/helper.css
cp ./lib/helper.css.map build/dist/helper.css.map
cp examples/static/iconfont.* build/dist/

mkdir build/dist/locale

echo "===sdk locale==="
node scripts/generate-sdk-locale.js src/locale/de-DE.ts >build/dist/locale/de-DE.js

