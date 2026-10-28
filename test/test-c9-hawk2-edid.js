/* The experimental helper needs no TV for EDID and firmware-rejection tests. */
'use strict';
var child = require('child_process');
var path = require('path');
if (!child.execFileSync) {
  console.log('C9 EDID Python tests skipped on Node 0.10; run on a current build host.');
} else {
  process.stdout.write(child.execFileSync('python3', [path.join(__dirname, 'test_c9_hawk2_edid.py')], {
    encoding: 'utf8', stdio: ['ignore', 'pipe', 'inherit']
  }));
}
