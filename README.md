# Career World - Interactive Map Explorer 🗺️

An interactive career exploration platform built with Next.js and TypeScript. Explore your professional journey through an engaging, Disney-style theme park map interface.

## 🎯 Features

- **Interactive Map**: Pan and zoom through your career "island" with smooth animations
- **Static Image Approach**: Beautiful illustrated theme park map (no API keys needed!)
- **Zone System**: Four distinct career zones with themed areas
- **Clickable Attractions**: Click any job marker to zoom and highlight
- **Search & Filter**: Find roles by name, company, or time period
- **Smooth Animations**: Cinematic zoom when selecting attractions
- **Mini Map**: Floating overview map for navigation
- **Responsive Design**: Works on desktop and mobile
- **Zero Dependencies**: No external mapping APIs - everything runs locally

## 🚀 Quick Start

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

**That's it!** No API keys, no configuration files, no setup hassle.

## 📁 Project Structure

```
resume-world/
├── app/
│   ├── page.tsx              # Main page component
│   ├── layout.tsx            # Root layout
│   └── globals.css           # Global styles
├── components/
│   ├── Map.tsx               # Main map component
│   ├── AttractionCard.tsx    # Attraction card component
│   └── ui/
│       └── card.tsx          # Reusable card component
├── lib/
│   ├── fetchAttractions.ts   # Data fetching utilities
│   └── utils.ts              # Helper functions
├── types/
│   └── attractions.ts        # TypeScript type definitions
├── public/
│   └── data/
│       └── career-world.json # Attractions and zones data
├── package.json
├── tsconfig.json
├── tailwind.config.js
└── next.config.js
```

## 🎨 Career Zones

The map features four distinct career phases visualized as themed zones:

1. **Executive Kingdom** (Purple, 2023-Present) - Director-level leadership roles
2. **Enterprise Launch Pad** (Blue, 2014-2023) - Scale and growth at enterprise companies
3. **Innovation Alley** (Teal, 2006-2014) - Building foundations at growth companies
4. **Foundation Plaza** (Gray, 2000-2006) - Early career in finance and corporate learning

## 🛠️ Customization

### Changing the Map Image

Replace `/public/career-world-map.png` with your own illustrated theme park map.

**Recommended specs:**
- 3000x2000px or higher resolution
- PNG format for best quality
- Isometric perspective like Disney/Universal maps
- Clear zones with distinct visual themes

### Adjusting Hotspot Locations

Edit `components/Map.tsx` and update the `attractionHotspots` object:

```typescript
const attractionHotspots: Record<string, { x: number; y: number }> = {
  "job-id": { x: 50, y: 30 }, // x and y are percentages (0-100)
  // x: horizontal position (0 = left, 100 = right)
  // y: vertical position (0 = top, 100 = bottom)
};
```

## 🔧 Troubleshooting

### Map Not Showing

1. **Check Image Path**: Ensure `/public/career-world-map.png` exists
2. **Clear Cache**: Try hard refresh (Ctrl+Shift+R or Cmd+Shift+R)
3. **Check Console**: Look for errors in browser dev tools (F12)

### Markers Not in Right Place

1. **Adjust Hotspots**: Edit `attractionHotspots` in `components/Map.tsx`
2. **Use Percentage Coordinates**: Remember x and y are 0-100, not pixels
3. **Visual Inspection**: Open your map image and estimate positions

### Build Errors

```bash
# Clear cache and reinstall
rm -rf .next node_modules
npm install
npm run dev
```

## 📦 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Deploy! (No environment variables needed)

### Other Platforms

Works on any platform that supports:
- Node.js 18+
- Next.js
- Static file serving

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 Key Features of This Version

This version uses a **static illustrated map approach** instead of Mapbox:

1. **✅ No API Keys Required**: No Mapbox token, no external dependencies
2. **✅ Theme Park Aesthetic**: Use custom illustrated maps like Disney/Universal
3. **✅ Simple Pan & Zoom**: Native browser-based image manipulation
4. **✅ Faster Loading**: No map tiles to download
5. **✅ Full Creative Control**: Design your island exactly how you want
6. **✅ Easier to Customize**: Just swap the image file
7. **✅ Works Offline**: No external API calls needed

## 📄 License

MIT License - feel free to use this for your projects!

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Icons from [Lucide](https://lucide.dev)
- Styling with [Tailwind CSS](https://tailwindcss.com)
- Inspired by Disney World and Universal Studios park maps

## 📧 Support

If you encounter issues:
1. Check this README thoroughly
2. Review the troubleshooting section
3. Check browser console for errors
4. Verify environment variables are set correctly

---

**Ready to explore Career World?** 🚀

```bash
npm install
npm run dev
```
