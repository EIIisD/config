#!/usr/bin/env node
const fs = require("fs");
const { execSync } = require("child_process");

const packageJsonPath = "./package.json";

if (!fs.existsSync(packageJsonPath)) {
  console.error("Error: package.json not found in the current directory.");
  process.exit(1);
}

const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf-8"));

try {
  console.log("Installing @eiiisd/prettier-config...");
  execSync("npm install @eiiisd/prettier-config", {
    stdio: "inherit",
  });
} catch (error) {
  console.error("Error: Failed to install @eiiisd/prettier-config.");
  process.exit(1);
}

packageJson.dependencies = {
  ...packageJson.dependencies,
  "@eiiisd/prettier-config": "latest",
};
packageJson.prettier = "@eiiisd/prettier-config";

fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
console.log("Successfully added @eiiisd/prettier-config to package.json.");
