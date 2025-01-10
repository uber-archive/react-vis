#!/bin/bash
set -e
cd website
npm run build
rm -rf /tmp/dist-vis
mv dist /tmp/dist-vis
git checkout gh-pages
rm -rf dist
mv /tmp/dist-vis dist
mv dist/index.html ..
cd ..
git add .
git commit -m 'Upgrade docs'
git push && git checkout master
