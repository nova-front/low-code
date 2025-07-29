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
  const requiredFields = ['name', 'version', 'description', 'main', 'module', 'types'];
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
  if (pkg.files && pkg.files.length > 0) {
    log(`✅ files 字段已配置: ${pkg.files.join(', ')}`, 'green');
  } else {
    log(`⚠️  建议配置 files 字段`, 'yellow');
  }

  // 检查 publishConfig
  if (pkg.publishConfig && pkg.publishConfig.access === 'public') {
    log(`✅ publishConfig 已配置为 public`, 'green');
  } else {
    log(`⚠️  建议配置 publishConfig.access 为 public`, 'yellow');
  }

  return allFieldsPresent;
}

function checkBuildFiles() {
  log('\n🏗️  检查构建文件...', 'blue');
  
  const distPath = path.join(__dirname, '../dist');
  if (!checkFileExists(distPath, 'dist 目录')) {
    return false;
  }

  const requiredFiles = [
    'dist/cjs/index.js',
    'dist/es/index.js',
    'dist/es/index.d.ts'
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

function checkDocumentation() {
  log('\n📚 检查文档文件...', 'blue');
  
  const docFiles = [
    { path: 'README.md', required: true },
    { path: 'CHANGELOG.md', required: true },
    { path: 'PUBLISH.md', required: false }
  ];

  let allRequiredDocsExist = true;
  docFiles.forEach(({ path: filePath, required }) => {
    const fullPath = path.join(__dirname, '..', filePath);
    const exists = checkFileExists(fullPath, filePath);
    if (required && !exists) {
      allRequiredDocsExist = false;
    }
  });

  return allRequiredDocsExist;
}

function runTests() {
  log('\n🧪 运行测试...', 'blue');
  
  try {
    execSync('npm test', { 
      stdio: 'inherit',
      cwd: path.join(__dirname, '..')
    });
    log('✅ 所有测试通过', 'green');
    return true;
  } catch (error) {
    log('❌ 测试失败', 'red');
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

function checkGitStatus() {
  log('\n📝 检查 Git 状态...', 'blue');
  
  try {
    const status = execSync('git status --porcelain', { encoding: 'utf8' });
    if (status.trim() === '') {
      log('✅ 工作目录干净', 'green');
      return true;
    } else {
      log('⚠️  工作目录有未提交的更改:', 'yellow');
      console.log(status);
      return false;
    }
  } catch (error) {
    log('⚠️  无法检查 Git 状态', 'yellow');
    return true; // 不强制要求 Git
  }
}

function main() {
  log('🚀 开始发布前检查...', 'blue');
  
  const checks = [
    { name: 'package.json', fn: checkPackageJson },
    { name: '文档文件', fn: checkDocumentation },
    { name: '测试', fn: runTests },
    { name: '构建', fn: runBuild },
    { name: '构建文件', fn: checkBuildFiles },
    { name: 'npm 登录', fn: checkNpmLogin },
    { name: 'Git 状态', fn: checkGitStatus }
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
    log('  npm run release:beta   # 测试版本', 'yellow');
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
  checkDocumentation,
  runTests,
  runBuild,
  checkNpmLogin,
  checkGitStatus
};
