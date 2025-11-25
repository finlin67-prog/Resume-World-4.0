"use client";

import React, { useEffect, useRef, useState } from "react";
import type { Attraction, Zone } from "@/types/attractions";

interface MapProps {
  attractions: Attraction[];
  zones?: Zone[];
  onAttractionClick?: (attraction: Attraction) => void;
  focusedAttraction?: Attraction | null;
  small?: boolean;
}

// Hotspot coordinates - mapped to pixel positions on the map image
// We'll map these based on visual inspection of the Gemini image
const attractionHotspots: Record<string, { x: number; y: number }> = {
  "prgx-director": { x: 75, y: 15 }, // Top center area - Executive Kingdom
  "amcs-director": { x: 70, y: 20 },
  "redhat-senior-principal": { x: 65, y: 30 }, // Right side - Enterprise
  "salesforce-global-ops": { x: 60, y: 35 },
  "salesforce-campaigns": { x: 65, y: 40 },
  "getsatisfaction-director": { x: 40, y: 50 }, // Left center - Innovation
  "crowdfactory-senior-manager": { x: 35, y: 55 },
  "embarcadero-manager": { x: 30, y: 60 },
  "salemglobal-senior-manager": { x: 25, y: 65 },
  "botm-analyst": { x: 20, y: 75 }, // Bottom - Foundation
  "sp-lms-strategist": { x: 25, y: 80 },
  "goldman-analyst": { x: 30, y: 85 }
};

const Map = React.forwardRef<any, MapProps>(({
  attractions,
  zones = [],
  onAttractionClick,
  focusedAttraction,
  small = false
}, ref) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  // Handle focused attraction - zoom and pan to it
  useEffect(() => {
    if (!focusedAttraction || !containerRef.current || !imageRef.current) return;

    const hotspot = attractionHotspots[focusedAttraction.id];
    if (!hotspot) return;

    // Calculate target position to center the hotspot
    const containerRect = containerRef.current.getBoundingClientRect();
    const imageRect = imageRef.current.getBoundingClientRect();

    // Convert percentage to pixel position
    const targetX = (hotspot.x / 100) * imageRect.width;
    const targetY = (hotspot.y / 100) * imageRect.height;

    // Center the hotspot in the viewport
    const newX = (containerRect.width / 2) - targetX * 2;
    const newY = (containerRect.height / 2) - targetY * 2;

    // Animate zoom and pan
    setScale(2);
    setPosition({ x: newX, y: newY });
  }, [focusedAttraction]);

  // Mouse drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (small) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPosition({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Zoom handlers
  const handleWheel = (e: React.WheelEvent) => {
    if (small) return;
    e.preventDefault();
    const delta = e.deltaY > 0 ? 0.9 : 1.1;
    setScale(prev => Math.min(Math.max(prev * delta, 0.5), 4));
  };

  // Reset view
  const resetView = () => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  return (
    <div 
      ref={containerRef}
      className="relative h-full w-full overflow-hidden bg-sky-100"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onWheel={handleWheel}
      style={{ cursor: isDragging ? 'grabbing' : (small ? 'default' : 'grab') }}
    >
      {/* Map Image */}
      <div
        style={{
          transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
          transformOrigin: 'center center',
          transition: isDragging ? 'none' : 'transform 0.5s ease-out',
          position: 'absolute',
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <img
          ref={imageRef}
          src="/career-world-map.png"
          alt="Career World Map"
          className="max-w-none"
          style={{ 
            height: small ? '100%' : '90%',
            width: 'auto',
            pointerEvents: 'none',
            userSelect: 'none'
          }}
          draggable={false}
        />

        {/* Hotspot Markers */}
        {!small && attractions.map((attraction) => {
          const hotspot = attractionHotspots[attraction.id];
          if (!hotspot) return null;

          const isFocused = focusedAttraction?.id === attraction.id;

          return (
            <div
              key={attraction.id}
              className="absolute"
              style={{
                left: `${hotspot.x}%`,
                top: `${hotspot.y}%`,
                transform: 'translate(-50%, -50%)',
                pointerEvents: 'auto',
                zIndex: isFocused ? 1000 : 10
              }}
            >
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onAttractionClick?.(attraction);
                }}
                className={`
                  w-8 h-8 rounded-full border-3 border-white shadow-lg
                  transition-all duration-200 hover:scale-125
                  ${isFocused ? 'bg-yellow-400 scale-150 animate-pulse' : 'bg-blue-500'}
                `}
                title={attraction.name}
              />
              
              {/* Label on hover */}
              <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 opacity-0 hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                <div className="bg-white px-3 py-1 rounded shadow-lg text-sm font-medium">
                  {attraction.company}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Controls */}
      {!small && (
        <div className="absolute top-4 right-4 flex flex-col gap-2 z-20">
          <button
            onClick={() => setScale(prev => Math.min(prev * 1.2, 4))}
            className="bg-white p-2 rounded shadow-lg hover:bg-gray-100 transition-colors"
            title="Zoom In"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </button>
          <button
            onClick={() => setScale(prev => Math.max(prev * 0.8, 0.5))}
            className="bg-white p-2 rounded shadow-lg hover:bg-gray-100 transition-colors"
            title="Zoom Out"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
            </svg>
          </button>
          <button
            onClick={resetView}
            className="bg-white p-2 rounded shadow-lg hover:bg-gray-100 transition-colors"
            title="Reset View"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
        </div>
      )}

      {/* MiniMap indicator (if not small) */}
      {!small && (
        <div className="absolute bottom-4 right-4 w-32 h-24 bg-white/80 rounded border-2 border-gray-300 shadow-lg overflow-hidden z-20">
          <img
            src="/career-world-map.png"
            alt="Mini Map"
            className="w-full h-full object-cover opacity-60"
          />
          <div 
            className="absolute border-2 border-red-500 bg-red-500/20"
            style={{
              left: '50%',
              top: '50%',
              width: `${100 / scale}%`,
              height: `${100 / scale}%`,
              transform: 'translate(-50%, -50%)'
            }}
          />
        </div>
      )}
    </div>
  );
});

Map.displayName = "Map";

export default Map;
