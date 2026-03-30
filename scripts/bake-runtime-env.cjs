#!/usr/bin/env node
const fs = require('fs')
const path = require('path')

const outputPath = path.resolve(__dirname, '..', 'electron', 'runtime-env.cjs')
const upgradeLink = process.env.PEARPASS_UPGRADE_LINK || null

const fileContents = `/**
 * Generated during CI/build by scripts/bake-runtime-env.cjs.
 * Do not edit manually.
 */
module.exports = {
  PEARPASS_UPGRADE_LINK: ${JSON.stringify(upgradeLink)}
}
`

fs.writeFileSync(outputPath, fileContents)
console.log(
  `[bake-runtime-env] Wrote ${outputPath} (upgrade: ${upgradeLink ? 'set' : 'null'})`
)
