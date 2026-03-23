#!/usr/bin/env bash
# rename-to-jsx.sh
# Renames .stories.js → .stories.jsx and JSX-containing .js → .jsx in src/js,
# then updates all import/require references across the codebase.
#
# Usage: bash tools/rename-to-jsx.sh
# Run from the repo root.

set -euo pipefail

REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$REPO_ROOT"

echo "=== Phase 1: Rename .stories.js → .stories.jsx ==="
while IFS= read -r file; do
  new="${file%.stories.js}.stories.jsx"
  git mv "$file" "$new"
  echo "  mv $file → $new"
done < <(find src/js -name "*.stories.js" | grep -v "__tests__\|node_modules")

echo ""
echo "=== Phase 2: Rename JSX-containing component/context .js → .jsx ==="
while IFS= read -r file; do
  new="${file%.js}.jsx"
  git mv "$file" "$new"
  echo "  mv $file → $new"
done < <(grep -rl "<[A-Z]\|React\.\|jsx\|JSX" src/js --include="*.js" \
  | grep -v "__tests__\|\.css\.js\|node_modules\|\.stories\.")

echo ""
echo "=== Phase 3: Update import/require references ==="

# Build a sed expression to fix import paths.
# We target:
#   import ... from './Foo'        → stays (extensionless, works already)
#   import ... from './Foo.js'     → ./Foo.jsx
#   import ... from './Foo.stories.js' → ./Foo.stories.jsx
# Same for require().
#
# Strategy: find all files that might have explicit .js extension imports
# and rewrite them only for files we actually renamed.

# Collect the set of renamed basenames (relative to src/js) for validation
RENAMED_STORIES=$(find src/js -name "*.stories.jsx" | grep -v "__tests__\|node_modules" | \
  sed "s|src/js/||;s|\.stories\.jsx$||")
RENAMED_COMPONENTS=$(find src/js -name "*.jsx" | grep -v "__tests__\|node_modules\|\.stories\." | \
  sed "s|src/js/||;s|\.jsx$||")

# Use perl for in-place multi-line safe replacement across the whole codebase
# Replace explicit .js extensions in import/require strings for renamed files
echo "  Rewriting explicit .stories.js extensions in imports..."
grep -rl "\.stories\.js['\"]" src/js storybook --include="*.js" --include="*.jsx" \
     --include="*.ts" --include="*.tsx" 2>/dev/null | \
  xargs -I{} perl -pi -e "s/(import\s[^'\"]*['\"]\.[^'\"]*?)\.stories\.js(['\";\s])/\$1.stories.jsx\$2/g; \
                            s/(require\(['\"]\.[^)]*?)\.stories\.js(['\")\s])/\$1.stories.jsx\$2/g" {}

echo "  Rewriting explicit .js extensions (non-stories) in imports..."
# Only rewrite ./Something.js or ../Something.js patterns — not node_modules imports
grep -rl "from ['\"]\..*\.js['\"]" src/js storybook --include="*.js" --include="*.jsx" \
     --include="*.ts" --include="*.tsx" 2>/dev/null | \
  xargs -I{} perl -pi -e \
    "s|(from\s+['\"])(\.[^'\"]*?)(?<!\.stories)(?<!\.css)\.js(['\"])|\$1\$2.jsx\$3|g; \
     s|(require\(['\"])(\.[^)]*?)(?<!\.stories)(?<!\.css)\.js(['\"])|\$1\$2.jsx\$3|g" {}

echo ""
echo "=== Done ==="
echo "Review with: git diff --stat"
echo "Then: git add -A && git commit -m 'chore: rename JSX-containing .js files to .jsx'"
