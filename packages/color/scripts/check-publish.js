#!/usr/bin/env node

/**
 * 发布前检查脚本
 * 确保包在发布前满足所有要求
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// 颜色输出
const colors = {
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function checkFileExists(filePath, description) {
  if (fs.existsSync(filePath)) {
    log(`✅ ${description} 存在`, 'green');
    return true;
  } else {
    log(`❌ ${description} 不存在: ${filePath}`, 'red');
    return false;
  }
}

function checkPackageJson() {
  log('\n📦 检查 package.json...', 'blue');
  
  const packagePath = path.join(__dirname, '../package.json');
  if (!checkFileExists(packagePath, 'package.json')) {
    return false;
  }

  const pkg = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
  
  // 检查必要字段
  const requiredFields = ['name', 'version', 'description'];
  let allFieldsPresent = true;
  
  requiredFields.forEach(field => {
    if (pkg[field]) {
      log(`✅ ${field}: ${pkg[field]}`, 'green');
    } else {
      log(`❌ 缺少必要字段: ${field}`, 'red');
      allFieldsPresent = false;
    }
  });

  // 检查 files 字段
  if (pkg.files && pkg.files.includes('dist')) {
    log(`✅ files 字段包含 dist`, 'green');
  } else {
    log(`⚠️  建议在 files 字段中包含 dist`, 'yellow');
  }

  return allFieldsPresent;
}

function checkBuildFiles() {
  log('\n🏗️  检查构建文件...', 'blue');
  
  const requiredFiles = [
    'dist/system/theme.css',
    'dist/system/theme-variables.ts'
  ];

  let allFilesExist = true;
  requiredFiles.forEach(file => {
    const filePath = path.join(__dirname, '..', file);
    if (!checkFileExists(filePath, file)) {
      allFilesExist = false;
    }
  });

  return allFilesExist;
}

function checkNpmLogin() {
  log('\n👤 检查 npm 登录状态...', 'blue');
  
  try {
    const username = execSync('npm whoami', { encoding: 'utf8' }).trim();
    log(`✅ 已登录 npm，用户名: ${username}`, 'green');
    return true;
  } catch (error) {
    log('❌ 未登录 npm，请运行 npm login', 'red');
    return false;
  }
}

function runBuild() {
  log('\n🔨 运行构建...', 'blue');
  
  try {
    execSync('npm run build', { 
      stdio: 'inherit',
      cwd: path.join(__dirname, '..')
    });
    log('✅ 构建成功', 'green');
    return true;
  } catch (error) {
    log('❌ 构建失败', 'red');
    return false;
  }
}

function main() {
  log('🚀 开始发布前检查...', 'blue');
  
  const checks = [
    { name: 'package.json', fn: checkPackageJson },
    { name: '构建', fn: runBuild },
    { name: '构建文件', fn: checkBuildFiles },
    { name: 'npm 登录', fn: checkNpmLogin }
  ];

  let allPassed = true;
  const results = [];

  checks.forEach(({ name, fn }) => {
    const passed = fn();
    results.push({ name, passed });
    if (!passed) {
      allPassed = false;
    }
  });

  // 输出总结
  log('\n📊 检查结果总结:', 'blue');
  results.forEach(({ name, passed }) => {
    const status = passed ? '✅' : '❌';
    const color = passed ? 'green' : 'red';
    log(`${status} ${name}`, color);
  });

  if (allPassed) {
    log('\n🎉 所有检查通过！可以发布了。', 'green');
    log('\n发布命令:', 'blue');
    log('  npm run release:patch  # 补丁版本', 'yellow');
    log('  npm run release:minor  # 次要版本', 'yellow');
    log('  npm run release:major  # 主要版本', 'yellow');
    log('  npm publish           # 直接发布', 'yellow');
    process.exit(0);
  } else {
    log('\n❌ 检查失败，请修复上述问题后再发布。', 'red');
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = {
  checkPackageJson,
  checkBuildFiles,
  checkNpmLogin,
  runBuild
};
