#!/usr/bin/env node
const fs = require('fs')
const { execSync } = require('child_process')

const packageJsonPath = './package.json'

if (!fs.existsSync(packageJsonPath)) {
  console.error('Error: package.json not found in the current directory.')
  process.exit(1)
}

const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'))

try {
  console.log('Installing @eiiisd/prettier-config...')
  execSync('npm install --save-dev @eiiisd/prettier-config', { stdio: 'inherit' })

  // Reload package.json after the installation
  const updatedPackageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'))

  if (
    updatedPackageJson.devDependencies &&
    !updatedPackageJson.devDependencies['@eiiisd/prettier-config']
  ) {
    console.error('Error: Failed to install @eiiisd/prettier-config.')
    process.exit(1)
  }

  updatedPackageJson.prettier = '@eiiisd/prettier-config'
  fs.writeFileSync(packageJsonPath, JSON.stringify(updatedPackageJson, null, 2))

  console.log('Successfully added @eiiisd/prettier-config to package.json.')
} catch (error) {
  console.error('Error: Failed to install @eiiisd/prettier-config.')
  process.exit(1)
}
