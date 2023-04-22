#!/usr/bin/env node
const fs = require('fs')
const { execSync } = require('child_process')

const packageJsonPath = './package.json'

if (!fs.existsSync(packageJsonPath)) {
  console.error('Error: package.json not found in the current directory.')
  process.exit(1)
}

try {
  let packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'))

  packageJson.prettier = '@eiiisd/prettier-config'
  packageJson.eslintConfig = {
    extends: ['@eiiisd/eslint-config'],
  }

  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2))

  execSync('npm install @eiiisd/prettier-config', { stdio: 'inherit' })
  console.log('Successfully added @eiiisd/prettier-config to package.json.')
  execSync('npm install @eiiisd/eslint-config', { stdio: 'inherit' })
  console.log('Successfully added @eiiisd/eslint-config to package.json.')
} catch (error) {
  console.error('Error: Failed to install packages.')
  process.exit(1)
}
