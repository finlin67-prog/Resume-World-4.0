"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Loader2, Search } from "lucide-react";
import dynamic from "next/dynamic";
import type { Attraction, FilterState } from "@/types/attractions";
import { fetchAttractions, fetchZones } from "@/lib/fetchAttractions";
import AttractionCard from "@/components/AttractionCard";

// Dynamically import the map to avoid SSR issues
const DynamicMap = dynamic(() => import("@/components/Map"), { ssr: false });

type SortOption = "name" | "chronological";

export default function AttractionsPage() {
  // Core State
  const [attractions, setAttractions] = useState<Attraction[]>([]);
  const [zones, setZones] = useState<any[]>([]);
  const [filtered, setFiltered] = useState<Attraction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // UI State
  const [sortOption, setSortOption] = useState<SortOption>("chronological");
  const [focusedAttraction, setFocusedAttraction] = useState<Attraction | null>(null);

  // Filters
  const [filters, setFilters] = useState<FilterState>({
    query: "",
    minRating: 0,
    category: "all",
  });

  // Map Reference
  const mapRef = useCallback((instance: any) => {
    // Map instance available for future use
  }, []);

  // Fetch Data
  useEffect(() => {
    async function load() {
      try {
        const [attractionsData, zonesData] = await Promise.all([
          fetchAttractions(),
          fetchZones()
        ]);
        setAttractions(attractionsData);
        setZones(zonesData);
      } catch (err) {
        setError("Failed to load attractions. Please refresh the page.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  // Memoized Sorting
  const sorted = useMemo(() => {
    const copy = [...filtered];
    if (sortOption === "chronological") {
      // Sort by start date, most recent first
      copy.sort((a, b) => {
        const dateA = new Date(a.startDate);
        const dateB = new Date(b.startDate);
        return dateB.getTime() - dateA.getTime();
      });
    } else if (sortOption === "name") {
      copy.sort((a, b) => a.name.localeCompare(b.name));
    }
    return copy;
  }, [filtered, sortOption]);

  // Filtering Handler
  useEffect(() => {
    let results = attractions;

    // Text search
    if (filters.query) {
      const q = filters.query.toLowerCase();
      results = results.filter(a => 
        a.name.toLowerCase().includes(q) || 
        a.location.toLowerCase().includes(q) ||
        a.category.toLowerCase().includes(q)
      );
    }

    // Category
    if (filters.category !== "all") {
      results = results.filter(a => a.category === filters.category);
    }

    setFiltered(results);
  }, [attractions, filters]);

  // Handlers
  const handleSearch = useCallback((value: string) => {
    setFilters(prev => ({ ...prev, query: value }));
  }, []);

  const handleSortChange = useCallback((value: SortOption) => {
    setSortOption(value);
  }, []);

  const handleCategoryFilter = useCallback((value: string) => {
    setFilters(prev => ({ ...prev, category: value }));
  }, []);

  const focusAttraction = useCallback((attraction: Attraction) => {
    setFocusedAttraction(attraction);
  }, []);

  // Get unique categories
  const categories = useMemo(() => {
    const cats = new Set(attractions.map(a => a.category));
    return ["all", ...Array.from(cats)];
  }, [attractions]);

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 font-semibold mb-2">Error loading data</p>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen w-full flex-col bg-gray-50">
      {/* Top Controls */}
      <div className="z-20 border-b bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 py-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <h1 className="text-2xl font-bold text-gray-900">Michael Findling's Career Journey</h1>
            
            <div className="flex flex-col gap-3 md:flex-row md:items-center">
              {/* Search */}
              <div className="relative flex-1 md:w-64">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search attractions..."
                  className="w-full rounded-lg border border-gray-300 pl-10 pr-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  value={filters.query}
                  onChange={e => handleSearch(e.target.value)}
                />
              </div>

              {/* Category Filter */}
              <select
                className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                value={filters.category}
                onChange={e => handleCategoryFilter(e.target.value)}
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>
                    {cat === "all" ? "All Categories" : cat}
                  </option>
                ))}
              </select>

              {/* Sort */}
              <select
                className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                value={sortOption}
                onChange={e => handleSortChange(e.target.value as SortOption)}
              >
                <option value="chronological">Most Recent First</option>
                <option value="name">Name A–Z</option>
              </select>
            </div>
          </div>
          
          {/* Results count */}
          <div className="mt-3 text-sm text-gray-600">
            Showing {sorted.length} of {attractions.length} career roles
          </div>
        </div>
      </div>

      {/* Content Layout */}
      <div className="flex w-full flex-1 overflow-hidden">
        {/* Left Panel (List View) */}
        <div className="w-full md:w-[420px] overflow-y-auto border-r bg-white">
          <div className="p-4 space-y-4">
            {loading && (
              <div className="flex items-center justify-center py-20 text-gray-500">
                <Loader2 className="mr-2 h-6 w-6 animate-spin" />
                <span>Loading career journey...</span>
              </div>
            )}

            {!loading && sorted.length === 0 && (
              <div className="py-20 text-center">
                <p className="text-gray-500 font-medium">No roles found</p>
                <p className="text-sm text-gray-400 mt-2">Try adjusting your filters</p>
              </div>
            )}

            {!loading && sorted.map(attraction => (
              <AttractionCard
                key={attraction.id}
                title={attraction.name}
                image={attraction.image}
                location={attraction.location}
                company={attraction.company}
                duration={attraction.duration}
                achievements={attraction.achievements}
                onClick={() => focusAttraction(attraction)}
              />
            ))}
          </div>
        </div>

        {/* Right Panel (Map) */}
        <div className="relative flex-1 hidden md:block">
          {!loading && (
            <>
              <DynamicMap 
                ref={mapRef} 
                attractions={sorted}
                zones={zones}
                onAttractionClick={focusAttraction}
                focusedAttraction={focusedAttraction}
              />

              {/* MiniMap (Floating) */}
              <div className="absolute bottom-6 right-6 h-48 w-48 overflow-hidden rounded-xl border-2 border-white bg-white shadow-2xl">
                <DynamicMap 
                  small 
                  attractions={sorted}
                  zones={zones}
                />
              </div>

              {/* Map Legend */}
              <div className="absolute top-6 left-6 bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-lg max-w-xs">
                <h3 className="font-semibold text-sm mb-3 text-gray-900">Career Eras</h3>
                <div className="space-y-2 text-xs">
                  {zones.map(zone => (
                    <div key={zone.id} className="flex items-start gap-2">
                      <div 
                        className="h-3 w-3 rounded-sm flex-shrink-0 mt-0.5" 
                        style={{ backgroundColor: zone.color, opacity: 0.7 }}
                      />
                      <div className="flex-1">
                        <div className="text-gray-700 font-medium">{zone.name}</div>
                        <div className="text-gray-500 text-xs">{zone.period}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
