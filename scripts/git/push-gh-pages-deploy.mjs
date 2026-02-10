import { execSync } from 'node:child_process';

function run(cmd, opts = {}) {
  return execSync(cmd, { stdio: 'pipe', encoding: 'utf8', ...opts }).trim();
}

function runInherit(cmd) {
  execSync(cmd, { stdio: 'inherit' });
}

function parseArgs(argv) {
  const args = { message: '', force: false, noCommit: false };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '-m' || a === '--message') {
      args.message = argv[i + 1] ?? '';
      i++;
      continue;
    }
    if (a === '--force') {
      args.force = true;
      continue;
    }
    if (a === '--no-commit') {
      args.noCommit = true;
      continue;
    }
  }
  return args;
}

function fail(msg) {
  // eslint-disable-next-line no-console
  console.error(`\n${msg}\n`);
  process.exit(1);
}

const { message, force, noCommit } = parseArgs(process.argv.slice(2));

let branch;
try {
  branch = run('git branch --show-current');
} catch {
  fail('Not a git repository (or git not available).');
}

const targetBranch = 'gh-pages-deploy';
if (branch !== targetBranch) {
  fail(
    `This command only runs on the \`${targetBranch}\` branch.\n\n` +
      `You are currently on \`${branch || '(detached)'}\`.\n\n` +
      `Fix:\n` +
      `  git switch ${targetBranch}\n` +
      `  npm run push:gh-pages-deploy -- -m "your message"\n\n` +
      `Why: \`gh-pages\` should only contain the built site, not source code.`
  );
}

const status = run('git status --porcelain');

if (status && !noCommit) {
  runInherit('git add -A');
  const commitMsg = message || `chore: sync ${new Date().toISOString()}`;

  try {
    runInherit(`git commit -m "${commitMsg.replace(/\"/g, '\\"')}"`);
  } catch {
    // If there's nothing to commit, git exits non-zero.
    // In that case, continue to pushing.
  }
} else if (status && noCommit) {
  fail(
    `Working tree is not clean, but --no-commit was provided.\n\n` +
      `Either commit your changes or run without --no-commit.`
  );
}

const pushCmd = force
  ? `git push --force-with-lease -u origin ${targetBranch}`
  : `git push -u origin ${targetBranch}`;

runInherit(pushCmd);
