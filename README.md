# Research Publications Globe 🌍

A futuristic, interactive web application for showcasing research papers published at conferences around the world. Features a stunning 3D globe with clickable location markers, particle background that responds to mouse movement, and smooth animations.

![Research Globe Preview](preview.png)

## ✨ Features

- **Interactive 3D Globe**: Rotate, zoom, and explore conference locations worldwide
- **Clickable Markers**: Click on any location to view detailed paper information
- **Mouse-Interactive Background**: Particle system that responds to cursor movement
- **Futuristic Dark Theme**: Cyberpunk-inspired design with glowing effects
- **Smooth Animations**: Powered by Framer Motion for fluid transitions
- **Fully Responsive**: Works seamlessly on desktop, tablet, and mobile devices
- **TypeScript**: Type-safe codebase for better maintainability

## 🚀 Tech Stack

- **React 18** - Modern UI library
- **TypeScript** - Type-safe JavaScript
- **Vite** - Lightning-fast build tool
- **Globe.gl** - 3D globe visualization powered by Three.js
- **Framer Motion** - Smooth, production-ready animations
- **CSS3** - Custom styling with gradients and effects

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (version 16 or higher)
- **npm** (comes with Node.js) or **yarn**

## 🛠️ Installation & Setup

### 1. Clone or navigate to the project directory

```bash
cd /Users/e131770/Desktop/team_projects/Virtual-Tourer/research-globe
```

### 2. Install dependencies

```bash
npm install
```

This will install all required packages including:
- React and React DOM
- Globe.gl and Three.js
- Framer Motion
- TypeScript
- Vite and related plugins

### 3. Start the development server

```bash
npm run dev
```

The application will automatically open in your default browser at `http://localhost:3000`

## 🎮 Usage

### Interacting with the Globe

1. **Rotate**: Click and drag on the globe to rotate it
2. **Zoom**: Scroll up/down to zoom in/out
3. **View Papers**: Click on any glowing marker to see published papers
4. **Mouse Effects**: Move your cursor around to see the particle background respond

### Viewing Paper Details

When you click a marker:
- A modal appears with conference information
- All papers from that conference are displayed
- Each paper shows: title, authors, abstract, keywords, and DOI
- Click outside the modal or press the × button to close

## 📁 Project Structure

```
research-globe/
├── src/
│   ├── components/
│   │   ├── ParticleBackground.tsx    # Interactive particle canvas
│   │   ├── ResearchGlobe.tsx         # 3D globe with markers
│   │   ├── PaperModal.tsx            # Paper details modal
│   │   └── PaperModal.css            # Modal styling
│   ├── types.ts                      # TypeScript interfaces
│   ├── data.ts                       # Sample conference/paper data
│   ├── App.tsx                       # Main application component
│   ├── App.css                       # Main application styles
│   ├── main.tsx                      # Application entry point
│   └── index.css                     # Global styles
├── index.html                        # HTML template
├── package.json                      # Dependencies and scripts
├── tsconfig.json                     # TypeScript configuration
├── vite.config.ts                    # Vite configuration
└── README.md                         # This file
```

## 🎨 Customization

### Adding Your Own Data

Edit `src/data.ts` to add your organization's papers and conferences:

```typescript
export const conferenceData: ConferenceLocation[] = [
  {
    id: 'unique-id',
    city: 'City Name',
    country: 'Country',
    lat: 00.0000,  // Latitude
    lng: 00.0000,  // Longitude
    conferenceName: 'Conference Full Name',
    date: 'Month Year',
    papers: [
      {
        id: 'paper-id',
        title: 'Paper Title',
        authors: ['Author 1', 'Author 2'],
        abstract: 'Paper abstract...',
        year: 2024,
        doi: '10.xxxx/xxxx',
        keywords: ['keyword1', 'keyword2']
      }
    ]
  }
];
```

### Customizing Colors

The color scheme can be adjusted in the CSS files:

- **Primary Green**: `#00ff88` - Used for accents and highlights
- **Secondary Cyan**: `#00ddff` - Used for secondary elements
- **Blue**: `#0088ff` - Used in gradients
- **Dark Background**: `#0a0a14` and `#1a0a2e` - Background colors

### Adjusting Globe Settings

In `src/components/ResearchGlobe.tsx`, you can modify:

```typescript
globe.controls().autoRotate = true;           // Enable/disable rotation
globe.controls().autoRotateSpeed = 0.5;       // Rotation speed
globe.pointOfView({ lat: 20, lng: 0, altitude: 2.5 }, 0);  // Initial view
```

### Particle Settings

In `src/components/ParticleBackground.tsx`, adjust:

```typescript
const particleCount = 100;  // Number of particles
const maxDistance = 150;    // Mouse interaction radius
```

## 📦 Building for Production

To create a production build:

```bash
npm run build
```

This creates an optimized build in the `dist/` directory.

To preview the production build locally:

```bash
npm run preview
```

## 🌐 Deployment

The application can be deployed to various platforms:

### Vercel
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm run build
# Then drag and drop the dist/ folder to Netlify
```

### GitHub Pages
1. Build the project: `npm run build`
2. Deploy the `dist/` directory to GitHub Pages

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally

## 🐛 Troubleshooting

### Issue: Globe doesn't load
- Ensure you have a stable internet connection (globe textures load from CDN)
- Check browser console for errors

### Issue: Particles lagging
- Reduce `particleCount` in `ParticleBackground.tsx`
- Disable particle connections by commenting out the connection drawing code

### Issue: Build fails
- Delete `node_modules/` and run `npm install` again
- Ensure Node.js version is 16 or higher

## 🤝 Contributing

To add features or fix bugs:

1. Make your changes in the appropriate files
2. Test locally with `npm run dev`
3. Build to ensure no errors: `npm run build`

## 📄 License

This project is open source and available for educational and commercial use.

## 🎯 Future Enhancements

Potential features to add:
- Search functionality for papers
- Filter by year, keyword, or author
- Download citations (BibTeX, etc.)
- Share individual papers
- Dark/light theme toggle
- Timeline view of publications
- Statistics dashboard

## 📧 Support

For questions or issues, please check the troubleshooting section or create an issue in the repository.

---

**Built with ❤️ using React, TypeScript, and WebGL**
