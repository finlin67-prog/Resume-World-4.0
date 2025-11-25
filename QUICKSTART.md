# 🚀 QUICK START GUIDE - Career World

## What This Is

Career World transforms your professional journey into an interactive **Disney/Universal-style theme park map**. Click through your career like exploring Magic Kingdom!

## Getting Started (2 Minutes)

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Run It
```bash
npm run dev
```

Open http://localhost:3000

**That's it!** No API keys, no configuration, no setup hassles.

## What You'll See

- **Left Panel**: Scrollable list of your career roles
- **Right Panel**: Beautiful illustrated theme park map
- **Mini Map**: Floating overview in bottom-right
- **Clickable Markers**: Blue dots on each "attraction" (job)
- **Smooth Zoom**: Click any card or marker to fly to that location

## How to Use It

1. **Scroll the career trail** on the left
2. **Click any role card** → Map zooms to that job's location
3. **Click markers** on the map → Highlights that role
4. **Drag the map** to pan around
5. **Mouse wheel** to zoom in/out
6. **Reset button** (top-right) returns to full view

## Customizing Your Map

### Option 1: Use the Current Map (Quick)

The Gemini-generated map is already in `/public/career-world-map.png`. Just adjust marker positions:

Edit `components/Map.tsx` and update the hotspot coordinates:

```typescript
const attractionHotspots = {
  "prgx-director": { x: 75, y: 15 },  // x,y are percentages (0-100)
  // Adjust these to match building positions in your map
};
```

### Option 2: Create a Custom Map (Best Results)

1. **Generate your ideal map** using the prompt in `/career-world-map-prompt.md`
2. **Use AI image generators**:
   - Midjourney (best for illustrated maps)
   - DALL-E 3
   - Leonardo.ai
   - Ideogram
3. **Replace** `/public/career-world-map.png` with your new image
4. **Adjust hotspots** to match building locations

## Map Image Specifications

**Ideal dimensions:** 3000x2000px (3:2 ratio)
**Format:** PNG or high-quality JPG
**Style:** Isometric theme park illustration
**Content:** 
- Complete island surrounded by water
- 4 distinct themed zones (your career phases)
- 12 visible buildings (one per job)
- Clear pathways between zones

## Deploying

Push to GitHub, connect to Vercel, done. No environment variables needed!

---

**Need help?** Check the main README.md for detailed docs.
