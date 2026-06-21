import { spawnSync } from 'node:child_process';
import process from 'node:process';

const result = spawnSync('npm', ['outdated', '--workspaces', '--include-workspace-root'], {
  stdio: 'inherit',
  shell: process.platform === 'win32',
});

if (result.error) {
  process.stderr.write(`${result.error.message}\n`);
  process.exit(1);
}

// npm outdated exits with 1 when outdated packages are found. For this script,
// outdated packages are report data, not command failure.
process.exit(result.status === 1 ? 0 : (result.status ?? 0));
