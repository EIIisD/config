#!/usr/bin/env node
const fs = require('fs')
const { execSync } = require('child_process')

const packageJsonPath = './package.json'

if (!fs.existsSync(packageJsonPath)) {
  console.error('Error: package.json not found in the current directory.')
  process.exit(1)
}

try {
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'))

  fs.writeFileSync(
    packageJsonPath,
    JSON.stringify(
      {
        ...packageJson,
        devDependencies: {
          ...packageJson.devDependencies,
          '@eiiisd/prettier-config': 'latest',
          '@eiiisd/eslint-config': 'latest',
        },
        prettier: '@eiiisd/prettier-config',
        eslintConfig: {
          extends: ['@eiiisd/eslint-config'],
        },
      },
      null,
      2
    )
  )

  execSync('npm install', { stdio: 'inherit' })
} catch (error) {
  console.error('Error: Failed to install packages.')
  process.exit(1)
}
