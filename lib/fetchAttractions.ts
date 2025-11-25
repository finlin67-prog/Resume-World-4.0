import type { Attraction, Zone, Skill } from "@/types/attractions";

interface CareerWorldData {
  attractions: Attraction[];
  zones: Zone[];
  skills: Skill[];
  island: {
    name: string;
    center: { lat: number; lng: number };
    bounds: { north: number; south: number; east: number; west: number };
  };
}

export async function fetchAttractions(): Promise<Attraction[]> {
  try {
    const response = await fetch('/data/michael-career-world.json');
    if (!response.ok) {
      throw new Error('Failed to fetch attractions');
    }
    const data: CareerWorldData = await response.json();
    return data.attractions;
  } catch (error) {
    console.error('Error fetching attractions:', error);
    throw error;
  }
}

export async function fetchZones(): Promise<Zone[]> {
  try {
    const response = await fetch('/data/michael-career-world.json');
    if (!response.ok) {
      throw new Error('Failed to fetch zones');
    }
    const data: CareerWorldData = await response.json();
    return data.zones;
  } catch (error) {
    console.error('Error fetching zones:', error);
    throw error;
  }
}

export async function fetchSkills(): Promise<Skill[]> {
  try {
    const response = await fetch('/data/michael-career-world.json');
    if (!response.ok) {
      throw new Error('Failed to fetch skills');
    }
    const data: CareerWorldData = await response.json();
    return data.skills || [];
  } catch (error) {
    console.error('Error fetching skills:', error);
    return [];
  }
}

export async function fetchIslandData() {
  try {
    const response = await fetch('/data/michael-career-world.json');
    if (!response.ok) {
      throw new Error('Failed to fetch island data');
    }
    const data: CareerWorldData = await response.json();
    return data.island;
  } catch (error) {
    console.error('Error fetching island data:', error);
    throw error;
  }
}
