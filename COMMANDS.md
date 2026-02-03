# 🚀 Command Reference

## Essential Commands

### Development
```bash
npm run dev          # Start development server (http://localhost:3000)
```

### Build
```bash
npm run build        # Create production build in dist/
npm run preview      # Preview production build locally
```

### Content (Excel → JSON)
```bash
npm run excel:convert    # Convert workbook sheets into JSON files under src/content/generated/

# Optional helper: reset/update ONLY the UniversityCollaborations sheet to the globe-ready schema
npm run excel:migrate:university
```

### Maintenance
```bash
npm install          # Install/reinstall dependencies
npm audit fix        # Fix security vulnerabilities
```

## File Locations

### Edit Sample Data
```
content/knowledge_bay_content.xlsx   # Master content workbook (multiple tabs)
src/content/generated/               # Auto-generated JSON used by the app
src/data.ts                          # Publications source (now re-exports generated JSON)
```

### Customize Styling
```
src/App.css          # Main theme colors and layout
src/components/PaperModal.css    # Modal styling
```

### Components
```
src/components/ParticleBackground.tsx    # Background particles
src/components/ResearchGlobe.tsx         # 3D globe
src/components/PaperModal.tsx            # Paper details modal
```

## Quick Tasks

### Change Primary Color
1. Open `src/App.css`
2. Find `#00ff88` (green)
3. Replace with your color

### Adjust Globe Speed
1. Open `src/components/ResearchGlobe.tsx`
2. Look for `autoRotateSpeed`
3. Change the value

### Add More Particles
1. Open `src/components/ParticleBackground.tsx`
2. Find `particleCount = 100`
3. Increase the number

### Change Globe Texture
1. Open `src/components/ResearchGlobe.tsx`
2. Find `globeImageUrl`
3. Replace with your image URL

## Troubleshooting

### Port Already in Use
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9
npm run dev
```

### Clear Cache
```bash
rm -rf node_modules package-lock.json .vite
npm install
npm run dev
```

### TypeScript Errors
```bash
npm install @types/react @types/react-dom --save-dev
```

## Git Commands (Optional)

### Initialize Repository
```bash
git init
git add .
git commit -m "Initial commit: Research Globe website"
```

### Push to GitHub
```bash
git remote add origin <your-repo-url>
git branch -M main
git push -u origin main
```

---

**Keep this file handy for quick reference!** 📋
