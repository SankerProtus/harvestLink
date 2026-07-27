const fs = require('fs');
const path = require('path');
const root = path.resolve(__dirname);
const dest = path.join(root, 'HarvestLink Frontend');
const exclude = new Set(['node_modules', '.git', 'HarvestLink Frontend']);

function copy(src, dst) {
  const stat = fs.statSync(src);
  if (stat.isDirectory()) {
    if (!fs.existsSync(dst)) fs.mkdirSync(dst);
    for (const child of fs.readdirSync(src)) {
      if (exclude.has(child)) continue;
      copy(path.join(src, child), path.join(dst, child));
    }
  } else if (stat.isFile()) {
    const dir = path.dirname(dst);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.copyFileSync(src, dst);
  }
}

if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
for (const child of fs.readdirSync(root)) {
  if (exclude.has(child)) continue;
  copy(path.join(root, child), path.join(dest, child));
}
console.log('Created HarvestLink Frontend at', dest);
