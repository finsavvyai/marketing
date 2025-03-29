#!/bin/bash
set -e  # Exit immediately if a command exits with a non-zero status

echo "=== Starting deployment process ==="

# Build the project
echo "Building the project..."
npm run build

# Create a clean deployment directory
DEPLOY_DIR="./gh-pages-deploy"
echo "Creating clean deployment directory: $DEPLOY_DIR"
rm -rf "$DEPLOY_DIR"
mkdir -p "$DEPLOY_DIR"

# Copy only essential files to the deployment directory, excluding media files
echo "Copying essential files to deployment directory..."
mkdir -p "$DEPLOY_DIR"
cp -R dist/* "$DEPLOY_DIR/"

# Remove any large media files
find "$DEPLOY_DIR" -type f -name "*.mp4" -o -name "*.mov" -o -name "*.avi" -o -name "*.mkv" -delete

# Debug: List all files in the deployment directory, showing sizes
echo "=== Files being deployed (with sizes) ==="
find "$DEPLOY_DIR" -type f -exec du -h {} \; | sort -h

# Check for any remaining large files (over 50MB)
echo "Checking for any large files..."
LARGE_FILES=$(find "$DEPLOY_DIR" -type f -size +50M)
if [ -n "$LARGE_FILES" ]; then
  echo "WARNING: Large files detected:"
  echo "$LARGE_FILES"
  echo "Removing large files..."
  find "$DEPLOY_DIR" -type f -size +50M -delete
fi

# Create and deploy a clean gh-pages branch
echo "Creating and deploying gh-pages branch..."
cd "$DEPLOY_DIR"

# Create necessary GitHub Pages files - make extra sure these end up in the root
echo "pipewarden.io" > "CNAME"
touch .nojekyll

# Double check that the CNAME and .nojekyll files exist
echo "Verifying GitHub Pages files:"
cat CNAME
ls -la .nojekyll

# Create a README file to ensure GitHub recognizes this as a proper repo
cat > README.md << EOL
# PipeWarden Marketing Site

This branch contains the deployed version of the PipeWarden marketing site.
Deployed automatically via GitHub Pages.
EOL

# Initialize git and create branch
git init
git checkout -b gh-pages

# Ensure git user is configured
git config user.email "deploy@pipewarden.io"
git config user.name "PipeWarden Deployment"

git add .
git commit -m "Deploy to GitHub Pages [$(date)]" || echo "No changes to commit"

# Force push to the gh-pages branch
git remote add origin git@github.com:finsavvyai/marketing.git
git push -f origin gh-pages

# Clean up
cd ..
rm -rf "$DEPLOY_DIR"

echo "=== Deployment complete! ==="
