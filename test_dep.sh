# Create a new temporary branch
git checkout -b clean-deploy

# Reset your Vite config
echo 'import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/",
});' > vite.config.ts

# Create a public folder with CNAME
mkdir -p public
echo "www.pipewarden.io" > public/CNAME

# Update your index.html to remove direct src references
# (You'll need to do this manually)

# Make sure package.json has correct scripts
# (Verify predeploy and deploy scripts manually)

# Clear any previous builds
rm -rf dist

# Build fresh
npm run build

# Verify the dist folder contents
ls -la dist

# Deploy
npm run deploy