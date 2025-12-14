# Git Hooks Setup Instructions

## Initial Setup

After cloning the repository, run these commands:

```bash
# Install dependencies (including husky, commitlint, etc.)
npm install

# Initialize Git repository (if not already initialized)
git init

# Hooks are already created in .husky/ directory
# Make sure they are executable:
chmod +x .husky/pre-commit .husky/commit-msg .husky/pre-push
```

**Note:** In Husky v9+, hooks are created manually as shell scripts. The hooks are already created in this repository.

## Hook Files

The following hooks are already set up:

### Pre-commit Hook (`.husky/pre-commit`)

Already created. Runs:
- `lint-staged` for formatting and linting
- Type checking via build

### Commit-msg Hook (`.husky/commit-msg`)

Already created. Validates commit messages using commitlint.

### Pre-push Hook (`.husky/pre-push`)

Already created. Runs:
- Full test suite with coverage
- Build verification

## Creating Hooks Manually (if needed)

If hooks are missing, create them manually:

## Using Commitizen (Optional)

For interactive commit message creation:

```bash
# Instead of: git commit -m "message"
# Use:
npm run commit
```

This will guide you through creating a properly formatted commit message.

## Verification

Test that hooks are working:

```bash
# Try committing with invalid format (should fail)
git commit -m "invalid commit"

# Try committing with valid format (should pass)
git commit -m "feat(requests): add pagination support"
```

## Troubleshooting

### Hooks not running

1. Check if `.husky` directory exists: `ls -la .husky/`
2. Verify hooks are executable: `chmod +x .husky/*`
3. Ensure Git repository is initialized: `git init`
4. Check hook file permissions: `ls -la .husky/pre-commit`

### Commitlint errors

1. Check `commitlint.config.js` exists
2. Verify format matches conventional commits
3. See commitlint documentation for details

### Lint-staged not running

1. Check `lint-staged` is in `package.json` devDependencies
2. Verify `lint-staged` config in `package.json`
3. Check file patterns match your files

