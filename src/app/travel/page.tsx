"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  MapPin, 
  Calendar, 
  Image as ImageIcon, 
  Plus, 
  Trash2, 
  ArrowLeft, 
  Compass, 
  Info, 
  CheckCircle2, 
  Upload,
  Globe,
  Camera,
  Layers,
  Map as MapIcon
} from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useRouter } from "next/navigation";

// Load leaflet CSS directly
import "leaflet/dist/leaflet.css";

interface CheckIn {
  id: string;
  locationId: string;
  locationName: string;
  date: string;
  description: string;
  image: string;
  lat: number;
  lng: number;
}

const PRESET_IMAGES = [
  { name: "Golden Bridge (Da Nang)", url: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&auto=format&fit=crop&q=80" },
  { name: "Hoan Kiem Lake (Ha Noi)", url: "https://images.unsplash.com/photo-1509060464153-44667396260f?w=600&auto=format&fit=crop&q=80" },
  { name: "Saigon Night (HCMC)", url: "https://images.unsplash.com/photo-1549488344-1f9b8d2bd1f3?w=600&auto=format&fit=crop&q=80" },
  { name: "Ha Long Bay", url: "https://images.unsplash.com/photo-1528127269322-539801943592?w=600&auto=format&fit=crop&q=80" },
  { name: "Misty Da Lat", url: "https://images.unsplash.com/photo-1583258292688-d0213df4a3a8?w=600&auto=format&fit=crop&q=80" },
  { name: "Phu Quoc Beach", url: "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?w=600&auto=format&fit=crop&q=80" }
];

const PRESET_LOCATIONS = [
  { id: "hanoi", name: "Ha Noi", lat: 21.0285, lng: 105.8542 },
  { id: "laocai", name: "Sa Pa (Lao Cai)", lat: 22.3364, lng: 103.8438 },
  { id: "quangninh", name: "Ha Long (Quang Ninh)", lat: 20.9501, lng: 107.0733 },
  { id: "ninhbinh", name: "Ninh Binh", lat: 20.2525, lng: 105.9750 },
  { id: "hagiang", name: "Ha Giang", lat: 22.8233, lng: 104.9836 },
  { id: "caobang", name: "Cao Bang", lat: 22.6686, lng: 106.2576 },
  { id: "dienbien", name: "Dien Bien", lat: 21.3853, lng: 103.0216 },
  { id: "tthue", name: "Hue (Thua Thien Hue)", lat: 16.4637, lng: 107.5909 },
  { id: "danang", name: "Da Nang", lat: 16.0544, lng: 108.2022 },
  { id: "quangnam", name: "Hoi An (Quang Nam)", lat: 15.8801, lng: 108.3380 },
  { id: "quangngai", name: "Quang Ngai", lat: 15.1205, lng: 108.8049 },
  { id: "binhdinh", name: "Quy Nhon (Binh Dinh)", lat: 13.7830, lng: 109.2194 },
  { id: "phuyen", name: "Tuy Hoa (Phu Yen)", lat: 13.0882, lng: 109.3025 },
  { id: "khanhhoa", name: "Nha Trang (Khanh Hoa)", lat: 12.2388, lng: 109.1967 },
  { id: "lamdong", name: "Da Lat (Lam Dong)", lat: 11.9404, lng: 108.4583 },
  { id: "ninhthuan", name: "Phan Rang (Ninh Thuan)", lat: 11.5685, lng: 108.9902 },
  { id: "binhthuan", name: "Mui Ne (Binh Thuan)", lat: 10.9333, lng: 108.2833 },
  { id: "daklak", name: "Buon Ma Thuot (Dak Lak)", lat: 12.6667, lng: 108.0500 },
  { id: "gialai", name: "Pleiku (Gia Lai)", lat: 13.9833, lng: 108.0000 },
  { id: "kontum", name: "Kon Tum", lat: 14.3500, lng: 108.0000 },
  { id: "hcm", name: "Ho Chi Minh City", lat: 10.8231, lng: 106.6297 },
  { id: "baria", name: "Vung Tau (Ba Ria-Vung Tau)", lat: 10.3460, lng: 107.0843 },
  { id: "condao", name: "Con Dao (Ba Ria-Vung Tau)", lat: 8.6811, lng: 106.6080 },
  { id: "kiengiang", name: "Phu Quoc (Kien Giang)", lat: 10.2899, lng: 103.9840 },
  { id: "cantho", name: "Can Tho", lat: 10.0452, lng: 105.7469 },
  { id: "angiang", name: "Chau Doc (An Giang)", lat: 10.7981, lng: 105.1224 },
  { id: "bentre", name: "Ben Tre", lat: 10.2401, lng: 106.3734 },
  { id: "dongthap", name: "Sa Dec (Dong Thap)", lat: 10.2913, lng: 105.7573 },
  { id: "camau", name: "Ca Mau", lat: 9.1764, lng: 105.1500 },
  { id: "hoangsa", name: "Hoang Sa Islands", lat: 16.5, lng: 112.0 },
  { id: "truongsa", name: "Truong Sa Islands", lat: 8.63, lng: 111.92 }
];

const PRESET_COORDS: Record<string, { lat: number; lng: number }> = {
  hanoi: { lat: 21.0285, lng: 105.8542 },
  laocai: { lat: 22.3364, lng: 103.8438 },
  quangninh: { lat: 20.9501, lng: 107.0733 },
  ninhbinh: { lat: 20.2525, lng: 105.9750 },
  hagiang: { lat: 22.8233, lng: 104.9836 },
  caobang: { lat: 22.6686, lng: 106.2576 },
  dienbien: { lat: 21.3853, lng: 103.0216 },
  tthue: { lat: 16.4637, lng: 107.5909 },
  danang: { lat: 16.0544, lng: 108.2022 },
  quangnam: { lat: 15.8801, lng: 108.3380 },
  quangngai: { lat: 15.1205, lng: 108.8049 },
  binhdinh: { lat: 13.7830, lng: 109.2194 },
  phuyen: { lat: 13.0882, lng: 109.3025 },
  khanhhoa: { lat: 12.2388, lng: 109.1967 },
  lamdong: { lat: 11.9404, lng: 108.4583 },
  ninhthuan: { lat: 11.5685, lng: 108.9902 },
  binhthuan: { lat: 10.9333, lng: 108.2833 },
  daklak: { lat: 12.6667, lng: 108.0500 },
  gialai: { lat: 13.9833, lng: 108.0000 },
  kontum: { lat: 14.3500, lng: 108.0000 },
  hcm: { lat: 10.8231, lng: 106.6297 },
  baria: { lat: 10.3460, lng: 107.0843 },
  condao: { lat: 8.6811, lng: 106.6080 },
  kiengiang: { lat: 10.2899, lng: 103.9840 },
  cantho: { lat: 10.0452, lng: 105.7469 },
  angiang: { lat: 10.7981, lng: 105.1224 },
  bentre: { lat: 10.2401, lng: 106.3734 },
  dongthap: { lat: 10.2913, lng: 105.7573 },
  camau: { lat: 9.1764, lng: 105.1500 },
  hoangsa: { lat: 16.5, lng: 112.0 },
  truongsa: { lat: 8.63, lng: 111.92 }
};

const INITIAL_CHECKINS: CheckIn[] = [
  {
    id: "checkin-hanoi",
    locationId: "hanoi",
    locationName: "Ha Noi",
    date: "2024-10-12",
    description: "Explored the thousand-year-old capital city, tasted the famous creamy Giang egg coffee, walked around Hoan Kiem Lake in the romantic autumn breeze, and visited the historic Ho Chi Minh Mausoleum.",
    image: PRESET_IMAGES[1].url,
    lat: 21.0285,
    lng: 105.8542
  },
  {
    id: "checkin-danang",
    locationId: "danang",
    locationName: "Da Nang",
    date: "2025-04-15",
    description: "Experienced the iconic Golden Bridge on Ba Na Hills in the early misty morning, relaxed on the smooth white sands of My Khe Beach, and watched the majestic fire and water-breathing Dragon Bridge show.",
    image: PRESET_IMAGES[0].url,
    lat: 16.0544,
    lng: 108.2022
  },
  {
    id: "checkin-hcmc",
    locationId: "hcm",
    locationName: "Ho Chi Minh City",
    date: "2026-01-01",
    description: "Main headquarters. Dylan's central command station, orchestrating supply chain analytics, operations dashboard reporting, and Excel/VBA automation projects.",
    image: PRESET_IMAGES[2].url,
    lat: 10.8231,
    lng: 106.6297
  }
];

export default function TravelPage() {
  const router = useRouter();
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [checkins, setCheckins] = useState<CheckIn[]>([]);
  const [selectedCheckin, setSelectedCheckin] = useState<CheckIn | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [isPickerActive, setIsPickerActive] = useState(false);
  const [isLightMode, setIsLightMode] = useState(false);

  useEffect(() => {
    const unlocked = localStorage.getItem("portfolio_unlocked") === "true";
    if (!unlocked) {
      router.push("/portfolio");
    } else {
      setCheckingAuth(false);
    }
  }, [router]);

  // Form State
  const [formData, setFormData] = useState({
    locationId: "hanoi",
    customName: "",
    date: "",
    description: "",
    image: PRESET_IMAGES[3].url, // Ha Long default preset image
    lat: 21.0285,
    lng: 105.8542
  });

  // Refs for leaflet instances
  const LRef = useRef<any>(null);
  const mapInstanceRef = useRef<any>(null);
  const markersGroupRef = useRef<any>(null);
  const tileLayerRef = useRef<any>(null);
  const tempMarkerRef = useRef<any>(null);

  // Refs to keep track of state for leaflet event listeners (avoiding React stale closures)
  const isPickerActiveRef = useRef(isPickerActive);
  const checkinsRef = useRef(checkins);
  const selectedCheckinRef = useRef(selectedCheckin);

  useEffect(() => {
    isPickerActiveRef.current = isPickerActive;
  }, [isPickerActive]);

  useEffect(() => {
    checkinsRef.current = checkins;
  }, [checkins]);

  useEffect(() => {
    selectedCheckinRef.current = selectedCheckin;
  }, [selectedCheckin]);

  // Load state from local storage on mount
  useEffect(() => {
    const saved = localStorage.getItem("dieu_travel_checkins");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Migrate old x,y format to lat,lng if needed
        const migrated = parsed.map((c: any) => {
          if (c.lat === undefined || c.lng === undefined) {
            const presetCoord = PRESET_COORDS[c.locationId] || { lat: 16.047, lng: 108.206 };
            return {
              ...c,
              lat: presetCoord.lat,
              lng: presetCoord.lng
            };
          }
          return c;
        });
        setCheckins(migrated);
        if (migrated.length > 0) {
          setSelectedCheckin(migrated[0]);
        }
      } catch (e) {
        setCheckins(INITIAL_CHECKINS);
        setSelectedCheckin(INITIAL_CHECKINS[0]);
      }
    } else {
      setCheckins(INITIAL_CHECKINS);
      setSelectedCheckin(INITIAL_CHECKINS[0]);
      localStorage.setItem("dieu_travel_checkins", JSON.stringify(INITIAL_CHECKINS));
    }
  }, []);

  // Theme observer to detect light/dark changes dynamically
  useEffect(() => {
    const checkTheme = () => {
      setIsLightMode(document.body.classList.contains("light"));
    };
    checkTheme();

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === "class") {
          checkTheme();
        }
      });
    });

    observer.observe(document.body, { attributes: true });
    return () => observer.disconnect();
  }, []);

  // Dynamically load Leaflet library on mount
  useEffect(() => {
    if (typeof window === "undefined") return;

    import("leaflet").then((leafletModule) => {
      LRef.current = leafletModule.default || leafletModule;
      initializeMap();
    });

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Initialize Map function
  const initializeMap = () => {
    const L = LRef.current;
    if (!L || mapInstanceRef.current) return;

    // Set default icon asset paths to avoid broken images in Leaflet
    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
      iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
      shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
    });

    const map = L.map("map-container", {
      zoomControl: false,
      attributionControl: true,
    }).setView([16.047, 108.206], 5.5); // Centered on Da Nang

    // Add zoom control at top right
    L.control.zoom({ position: "topright" }).addTo(map);

    // Save map instance
    mapInstanceRef.current = map;

    // Create a markers LayerGroup
    const markersGroup = L.layerGroup().addTo(map);
    markersGroupRef.current = markersGroup;

    // Register map click listener to pick coordinates
    map.on("click", (e: any) => {
      if (!isPickerActiveRef.current) return;
      
      const { lat, lng } = e.latlng;
      const roundedLat = Math.round(lat * 10000) / 10000;
      const roundedLng = Math.round(lng * 10000) / 10000;

      setFormData(prev => ({
        ...prev,
        lat: roundedLat,
        lng: roundedLng
      }));
      setIsPickerActive(false);
    });

    // Initial triggers
    updateTiles();
    renderMarkers();
  };

  // Update Tile Layer dynamically on theme change
  const updateTiles = () => {
    const L = LRef.current;
    const map = mapInstanceRef.current;
    if (!L || !map) return;

    if (tileLayerRef.current) {
      map.removeLayer(tileLayerRef.current);
    }

    const tileUrl = isLightMode
      ? "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
      : "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png";

    const newTiles = L.tileLayer(tileUrl, {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: "abcd",
      maxZoom: 20,
    });

    newTiles.addTo(map);
    tileLayerRef.current = newTiles;
  };

  // Re-run tiles updater when isLightMode changes
  useEffect(() => {
    updateTiles();
  }, [isLightMode]);

  // Sync markers whenever checkins or selectedCheckin changes
  const renderMarkers = () => {
    const L = LRef.current;
    const map = mapInstanceRef.current;
    const markersGroup = markersGroupRef.current;
    if (!L || !map || !markersGroup) return;

    // Clear existing markers
    markersGroup.clearLayers();

    // Remove any previous temporary marker
    if (tempMarkerRef.current) {
      map.removeLayer(tempMarkerRef.current);
      tempMarkerRef.current = null;
    }

    // Custom CSS-styled divIcons
    const normalIcon = L.divIcon({
      className: "custom-radar-marker",
      html: `
        <div class="relative flex items-center justify-center">
          <span class="animate-ping absolute inline-flex h-6 w-6 rounded-full bg-game-green opacity-40"></span>
          <span class="relative inline-flex rounded-full h-3.5 w-3.5 bg-game-green border-2 border-white shadow-[0_0_8px_#00ff87]"></span>
        </div>
      `,
      iconSize: [24, 24],
      iconAnchor: [12, 12]
    });

    const selectedIcon = L.divIcon({
      className: "custom-selected-marker",
      html: `
        <div class="relative flex items-center justify-center">
          <span class="animate-ping absolute inline-flex h-8 w-8 rounded-full bg-game-cyan opacity-60"></span>
          <span class="relative inline-flex rounded-full h-4.5 w-4.5 bg-game-cyan border-2 border-white shadow-[0_0_10px_#00f2fe]"></span>
        </div>
      `,
      iconSize: [32, 32],
      iconAnchor: [16, 16]
    });

    const presetIcon = L.divIcon({
      className: "custom-preset-marker",
      html: `
        <div class="relative flex items-center justify-center">
          <span class="relative inline-flex rounded-full h-2 w-2 bg-slate-500 border border-slate-300 shadow-sm hover:scale-125 transition-transform duration-200"></span>
        </div>
      `,
      iconSize: [16, 16],
      iconAnchor: [8, 8]
    });

    // 1. Draw small markers for unvisited presets
    PRESET_LOCATIONS.forEach((preset) => {
      const isVisited = checkins.some(c => c.locationId === preset.id);
      if (isVisited) return;

      const marker = L.marker([preset.lat, preset.lng], { icon: presetIcon });
      
      marker.bindTooltip(`
        <div class="bg-slate-950/95 border border-white/10 p-2 rounded font-mono text-[9px] text-white">
          <span class="font-bold flex items-center gap-1"><span class="w-1.5 h-1.5 rounded-full bg-slate-400"></span> ${preset.name}</span>
          <span class="text-slate-400 block mt-0.5">+ Click to Log</span>
        </div>
      `, { direction: "top", className: "clean-tooltip", opacity: 0.95 });

      marker.on("click", (e: any) => {
        L.DomEvent.stopPropagation(e);
        if (isPickerActiveRef.current) return;
        
        setFormData(prev => ({
          ...prev,
          locationId: preset.id,
          customName: preset.name,
          lat: preset.lat,
          lng: preset.lng
        }));
        setShowAddForm(true);
      });

      markersGroup.addLayer(marker);
    });

    // 2. Draw visited markers
    checkins.forEach((checkin) => {
      const isSelected = selectedCheckin?.id === checkin.id;
      const marker = L.marker([checkin.lat, checkin.lng], {
        icon: isSelected ? selectedIcon : normalIcon
      });

      marker.bindTooltip(`
        <div class="bg-slate-950/95 border border-white/10 p-2 rounded font-mono text-[9px] text-white">
          <span class="font-bold flex items-center gap-1 text-game-green">✓ ${checkin.locationName}</span>
          <span class="text-slate-400 block mt-0.5">Visited: ${checkin.date}</span>
        </div>
      `, { direction: "top", className: "clean-tooltip", opacity: 0.95 });

      marker.on("click", (e: any) => {
        L.DomEvent.stopPropagation(e);
        if (isPickerActiveRef.current) return;
        setSelectedCheckin(checkin);
        setShowAddForm(false);
      });

      markersGroup.addLayer(marker);

      // Pan map to selected checkin
      if (isSelected) {
        map.panTo([checkin.lat, checkin.lng], { animate: true });
      }
    });

    // 3. Draw temporary unsaved marker if in add form
    if (showAddForm) {
      const tempIcon = L.divIcon({
        className: "custom-temp-marker",
        html: `
          <div class="relative flex items-center justify-center">
            <span class="animate-pulse absolute inline-flex h-8 w-8 rounded-full border-2 border-dashed border-game-cyan bg-game-cyan/5"></span>
            <span class="relative inline-flex rounded-full h-3.5 w-3.5 bg-game-cyan border-2 border-white shadow-[0_0_10px_#00f2fe]"></span>
            <span class="text-game-cyan font-mono text-[8px] font-bold absolute -bottom-6 whitespace-nowrap bg-slate-950/80 px-1 py-0.5 rounded border border-game-cyan/30">PINNING POSITION</span>
          </div>
        `,
        iconSize: [32, 32],
        iconAnchor: [16, 16]
      });

      const tempMarker = L.marker([formData.lat, formData.lng], { icon: tempIcon });
      tempMarker.addTo(map);
      tempMarkerRef.current = tempMarker;

      map.panTo([formData.lat, formData.lng], { animate: true });
    }
  };

  // Re-run markers whenever checkins, selectedCheckin, or showAddForm changes
  useEffect(() => {
    renderMarkers();
  }, [checkins, selectedCheckin, showAddForm, formData.lat, formData.lng]);

  // Sync back to local storage
  const saveToCheckins = (newList: CheckIn[]) => {
    setCheckins(newList);
    localStorage.setItem("dieu_travel_checkins", JSON.stringify(newList));
  };

  // Auto-update coordinates when selecting preset from dropdown
  const handleLocationSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const locId = e.target.value;
    if (locId === "custom") {
      setFormData(prev => ({
        ...prev,
        locationId: "custom",
        lat: 16.047,
        lng: 108.206 // Da Nang center as fallback
      }));
    } else {
      const presetCoord = PRESET_COORDS[locId] || { lat: 16.047, lng: 108.206 };
      const presetName = PRESET_LOCATIONS.find(p => p.id === locId)?.name || "";
      
      setFormData(prev => ({
        ...prev,
        locationId: locId,
        customName: presetName,
        lat: presetCoord.lat,
        lng: presetCoord.lng
      }));
    }
  };

  // Convert uploaded image to base64
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData(prev => ({ ...prev, image: reader.result as string }));
    };
    reader.readAsDataURL(file);
  };

  // Submit check-in form
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const matchedPreset = PRESET_LOCATIONS.find(l => l.id === formData.locationId);
    
    const finalName = formData.locationId === "custom" 
      ? formData.customName || "Custom Location"
      : matchedPreset?.name || "Location";

    const newCheckin: CheckIn = {
      id: "checkin-" + Date.now(),
      locationId: formData.locationId,
      locationName: finalName,
      date: formData.date || new Date().toISOString().split("T")[0],
      description: formData.description || "Logged my visit to this awesome destination.",
      image: formData.image,
      lat: formData.lat,
      lng: formData.lng
    };

    const newList = [...checkins, newCheckin];
    saveToCheckins(newList);
    setSelectedCheckin(newCheckin);
    setShowAddForm(false);
    
    // Reset Form
    setFormData({
      locationId: "hanoi",
      customName: "",
      date: "",
      description: "",
      image: PRESET_IMAGES[3].url,
      lat: 21.0285,
      lng: 105.8542
    });
  };

  // Delete check-in
  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this check-in from your travel journal?")) {
      const newList = checkins.filter(c => c.id !== id);
      saveToCheckins(newList);
      if (selectedCheckin?.id === id) {
        setSelectedCheckin(newList.length > 0 ? newList[0] : null);
      }
    }
  };

  // Statistics calculations
  const totalVisitedCount = checkins.length;
  const uniqueVisitedIds = new Set(checkins.map(c => c.locationId).filter(id => id !== "custom"));
  const presetsVisitedCount = uniqueVisitedIds.size;
  const regionsUnlockedPercent = Math.round((presetsVisitedCount / PRESET_LOCATIONS.length) * 100);

  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-[#090b1e] flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 rounded-full border-t-2 border-r-2 border-game-cyan animate-spin mb-4" />
          <p className="font-mono text-xs tracking-widest text-game-cyan uppercase animate-pulse">
            Loading Travel Modules...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen text-slate-100 overflow-x-hidden pb-12">
      <Navbar />

      <main className="pt-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
        
        {/* Breadcrumb back button */}
        <div className="mb-6 flex justify-between items-center">
          <Link 
            href="/" 
            className="btn-game-secondary px-4 py-2 font-mono text-xs text-slate-300 flex items-center gap-2 group hover:text-game-cyan transition-colors"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Control Tower
          </Link>
          <span className="text-xs font-mono text-slate-400 uppercase tracking-widest hidden sm:inline">
            Module ID: TRVL_MAP_04
          </span>
        </div>

        {/* Header section */}
        <div className="flex flex-col items-center mb-12 text-center">
          <span className="text-xs font-mono tracking-widest text-game-cyan uppercase flex items-center gap-1.5">
            <Globe className="w-3.5 h-3.5 animate-spin-slow text-game-cyan" /> Interactive Map Module
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-1 uppercase tracking-wider text-glow-cyan">
            Vietnam Travel Ledger
          </h1>
          <p className="text-xs font-mono text-slate-400 mt-2 max-w-xl text-center leading-relaxed">
            Tactical Map system recording footsteps, check-ins, and visual memory logs of Dylan.
          </p>
          <div className="h-1 w-24 bg-gradient-to-r from-game-purple to-game-cyan mt-4 rounded-full" />
        </div>

        {/* Dashboard layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: Tactical Map Panel */}
          <div className="lg:col-span-5 glass-panel p-6 rounded-2xl border border-white/5 relative overflow-hidden flex flex-col items-center">
            
            {/* Visual tech overlays */}
            <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-game-green/40" />
            <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-game-green/40" />
            <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-game-green/40" />
            <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-game-green/40" />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:25px_25px] pointer-events-none opacity-40" />
            
            <div className="w-full flex items-center justify-between border-b border-white/5 pb-3 mb-4 font-mono text-[10px] text-slate-400">
              <span className="flex items-center gap-1.5 uppercase font-bold text-game-green">
                <Compass className="w-3.5 h-3.5 text-game-green" /> Tactical Grid Scan
              </span>
              <span>Map scale: 1:2,500,000</span>
            </div>

            {/* Real Interactive Leaflet Map Container */}
            <div className="relative w-full aspect-[812/873] max-w-[420px] min-h-[420px] h-auto bg-slate-950/20 rounded-xl overflow-hidden border border-white/5 flex items-center justify-center">
              
              {/* Pulsing picker visual indicator overlay */}
              {isPickerActive && (
                <div className="absolute inset-0 bg-game-cyan/5 border-2 border-dashed border-game-cyan/30 flex items-center justify-center z-20 pointer-events-none animate-pulse">
                  <div className="glass-panel py-2.5 px-4 rounded-lg text-center shadow-lg bg-slate-950/90 border border-game-cyan/40">
                    <span className="text-[10px] font-mono text-game-cyan font-bold tracking-wider uppercase block">
                      MAP PICKER ACTIVE
                    </span>
                    <span className="text-[9px] text-slate-300">
                      Click anywhere on the map to capture coordinates
                    </span>
                  </div>
                </div>
              )}

              {/* Leaflet map div */}
              <div 
                id="map-container" 
                className="absolute inset-0 w-full h-full z-10 bg-slate-950/40" 
              />
            </div>

            {/* visited metrics progress */}
            <div className="w-full mt-6 flex flex-col gap-2 font-mono text-xs text-slate-300">
              <div className="flex justify-between items-center text-[10px] text-slate-400">
                <span>UNLOCK PROGRESS:</span>
                <span className="font-bold text-game-green">{presetsVisitedCount}/{PRESET_LOCATIONS.length} Preset Regions</span>
              </div>
              <div className="w-full h-2.5 bg-slate-950 border border-white/5 rounded-full overflow-hidden flex">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${regionsUnlockedPercent}%` }}
                  transition={{ duration: 1 }}
                  className="h-full bg-gradient-to-r from-game-green to-game-cyan shadow-[0_0_10px_rgba(0,255,137,0.4)]"
                />
              </div>
              <span className="text-[10px] text-slate-500 text-center italic mt-1">
                ⚡ Click directly on the provinces or map pins to view logs.
              </span>
            </div>
          </div>

          {/* RIGHT: Active Details / Form Panel */}
          <div className="lg:col-span-7 flex flex-col gap-6 w-full">
            
            {/* Header controls for right panel */}
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold font-mono text-white flex items-center gap-2 uppercase tracking-wide">
                <Layers className="w-5 h-5 text-game-cyan" /> Check-In Operations Panel
              </h2>
              <button
                onClick={() => setShowAddForm(!showAddForm)}
                className="btn-game-primary py-2 px-4 font-mono text-xs text-white flex items-center gap-2"
              >
                {showAddForm ? (
                  <>Cancel Form</>
                ) : (
                  <>
                    <Plus className="w-4 h-4" /> Check-in New Landmark
                  </>
                )}
              </button>
            </div>

            <AnimatePresence mode="wait">
              {/* CHECK-IN FORM PANEL */}
              {showAddForm ? (
                <motion.div
                  key="form-panel"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.25 }}
                  className="glass-panel p-6 rounded-2xl border border-white/10 relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-24 h-24 bg-game-cyan/5 rounded-full filter blur-xl pointer-events-none" />
                  
                  <h3 className="text-sm font-bold font-mono tracking-wide text-white uppercase border-b border-white/5 pb-2.5 mb-4 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-game-cyan" /> Log New Footstep / Landmark
                  </h3>

                  <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Location selector */}
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-mono tracking-wider text-slate-400 uppercase">
                          Select Destination
                        </label>
                        <select
                          value={formData.locationId}
                          onChange={handleLocationSelect}
                          className="w-full bg-[#0a0c1f]/80 border border-white/10 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-game-cyan/50 focus:shadow-[0_0_15px_rgba(0,242,254,0.15)] transition-all"
                        >
                          {PRESET_LOCATIONS.map(p => (
                            <option key={p.id} value={p.id}>
                              {p.name}
                            </option>
                          ))}
                          <option disabled>──────────</option>
                          <option value="custom">Custom Location...</option>
                        </select>
                      </div>

                      {/* Date selection */}
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-mono tracking-wider text-slate-400 uppercase">
                          Visit Date
                        </label>
                        <input
                          type="date"
                          required
                          value={formData.date}
                          onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                          className="w-full bg-[#0a0c1f]/80 border border-white/10 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-game-cyan/50 transition-all font-mono"
                        />
                      </div>
                    </div>

                    {/* Custom location text input (only if Custom is selected) */}
                    {formData.locationId === "custom" && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="grid grid-cols-1 md:grid-cols-1 gap-4"
                      >
                        <div className="flex flex-col gap-1.5">
                          <label className="text-[10px] font-mono tracking-wider text-slate-400 uppercase">
                            Custom Destination Name
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="Enter city or landmark name..."
                            value={formData.customName}
                            onChange={(e) => setFormData(prev => ({ ...prev, customName: e.target.value }))}
                            className="w-full bg-[#0a0c1f]/80 border border-white/10 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-game-cyan/50 transition-all"
                          />
                        </div>
                      </motion.div>
                    )}

                    {/* Coordinates settings */}
                    <div className="p-3 bg-white/5 border border-white/5 rounded-xl flex items-center justify-between gap-4 font-mono text-xs">
                      <div>
                        <span className="text-[10px] text-slate-400 uppercase block">Pin Coordinates (lat, lng):</span>
                        <span className="font-bold text-game-cyan">{formData.lat.toFixed(4)}°, {formData.lng.toFixed(4)}°</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setIsPickerActive(true)}
                        className={`py-1.5 px-3 rounded-lg border font-mono text-[10px] font-bold uppercase transition-all duration-300 ${
                          isPickerActive 
                            ? "bg-game-cyan/15 border-game-cyan text-game-cyan animate-pulse" 
                            : "bg-[#0a0c1f] border-white/10 text-slate-300 hover:border-game-cyan hover:text-game-cyan"
                        }`}
                      >
                        {isPickerActive ? "Click on the map" : "Pick spot on map"}
                      </button>
                    </div>

                    {/* Description */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-mono tracking-wider text-slate-400 uppercase">
                        Visit Notes / Memories
                      </label>
                      <textarea
                        rows={3}
                        required
                        placeholder="Describe your trip, weather, sights visited, activities, or visual highlights..."
                        value={formData.description}
                        onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                        className="w-full bg-[#0a0c1f]/80 border border-white/10 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-game-cyan/50 transition-all resize-none"
                      />
                    </div>

                    {/* Photo upload options */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Image preset selector */}
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-mono tracking-wider text-slate-400 uppercase">
                          Select Preset Scenic Photo
                        </label>
                        <select
                          value={formData.image}
                          onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
                          className="w-full bg-[#0a0c1f]/80 border border-white/10 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-game-cyan/50 transition-all"
                        >
                          {PRESET_IMAGES.map((img, i) => (
                            <option key={i} value={img.url}>
                              {img.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Custom image upload */}
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-mono tracking-wider text-slate-400 uppercase">
                          Or Upload Your Custom Photo
                        </label>
                        <div className="relative w-full h-[38px] bg-[#0a0c1f]/80 border border-white/10 rounded-xl flex items-center px-3 gap-2 overflow-hidden hover:border-game-cyan/50 cursor-pointer">
                          <Upload className="w-4 h-4 text-slate-400 flex-shrink-0" />
                          <span className="text-xs text-slate-400 truncate flex-grow">
                            {formData.image.startsWith("data:image") ? "✓ Photo uploaded" : "Select image file (.png, .jpg)..."}
                          </span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="absolute inset-0 opacity-0 cursor-pointer"
                          />
                        </div>
                      </div>
                    </div>

                    {/* image preview */}
                    {formData.image && (
                      <div className="relative w-full h-24 rounded-lg overflow-hidden border border-white/10">
                        <img 
                          src={formData.image} 
                          alt="Preview" 
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-2 left-2 bg-[#090b1e]/90 text-[8px] font-mono text-game-cyan px-2 py-0.5 rounded border border-game-cyan/30">
                          PREVIEW IMAGE
                        </div>
                      </div>
                    )}

                    <button
                      type="submit"
                      className="btn-game-primary py-3 px-6 font-mono text-xs font-bold text-white flex items-center justify-center gap-2 mt-2"
                    >
                      <CheckCircle2 className="w-4 h-4" /> Confirm Footstep Check-In
                    </button>
                  </form>
                </motion.div>
              ) : selectedCheckin ? (
                
                /* DETAILED VIEW CARD OF SELECTED CHECK-IN */
                <motion.div
                  key="detail-panel"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.25 }}
                  className="glass-panel rounded-2xl border border-white/10 overflow-hidden flex flex-col"
                >
                  {/* Glowing upper backpiece bar */}
                  <div className="h-1 w-full bg-gradient-to-r from-game-green to-game-cyan" />
                  
                  {/* Photo representation */}
                  <div className="relative w-full h-[260px] overflow-hidden group">
                    <img 
                      src={selectedCheckin.image} 
                      alt={selectedCheckin.locationName}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    
                    {/* Dark gradient shadow overlays */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0b1e] via-[#0a0b1e]/30 to-transparent pointer-events-none" />
                    
                    {/* Floating HUD tags on image */}
                    <div className="absolute top-4 left-4 bg-slate-950/80 backdrop-blur-sm border border-white/10 px-3 py-1.5 rounded-lg flex items-center gap-1.5 text-xs text-white font-mono">
                      <Calendar className="w-3.5 h-3.5 text-game-cyan" /> {selectedCheckin.date}
                    </div>
                    
                    <div className="absolute bottom-4 left-6 flex items-center gap-3">
                      <div className="p-2.5 rounded-xl bg-game-green/20 backdrop-blur-md border border-game-green/40 text-game-green">
                        <MapPin className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-black text-white uppercase tracking-wider text-glow-cyan">
                          {selectedCheckin.locationName}
                        </h3>
                        <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block">
                          COORDINATES: {selectedCheckin.lat.toFixed(4)}°, {selectedCheckin.lng.toFixed(4)}°
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Body description */}
                  <div className="p-6 flex flex-col gap-5">
                    <div className="flex flex-col gap-2">
                      <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase flex items-center gap-1">
                        <Camera className="w-3.5 h-3.5 text-game-cyan" /> Check-in Log Details
                      </span>
                      <p className="text-slate-200 text-sm leading-relaxed font-light font-sans">
                        {selectedCheckin.description}
                      </p>
                    </div>

                    <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between gap-4 font-mono text-xs text-slate-400">
                      <span className="flex items-center gap-1.5 text-game-green">
                        ⚡ Verification status: Logged & Unlocked
                      </span>
                      
                      {/* Delete checkin button */}
                      <button
                        onClick={() => handleDelete(selectedCheckin.id)}
                        className="p-2 rounded-lg bg-red-500/5 hover:bg-red-500/15 border border-red-500/10 hover:border-red-500/30 text-red-400 hover:text-red-300 transition-all cursor-pointer flex items-center gap-1.5"
                        title="Delete this check-in"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span className="text-[10px] font-bold uppercase">Delete Log</span>
                      </button>
                    </div>
                  </div>
                </motion.div>
              ) : (
                
                /* EMPTY STATE CARD */
                <motion.div
                  key="empty-panel"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="glass-panel p-8 rounded-2xl border border-white/5 flex flex-col items-center justify-center text-center h-[300px]"
                >
                  <MapIcon className="w-12 h-12 text-slate-600 animate-pulse mb-4" />
                  <span className="text-sm font-mono text-slate-400 font-bold uppercase">Tactical Map Empty</span>
                  <p className="text-xs text-slate-500 max-w-sm mt-2 leading-relaxed font-sans">
                    You haven't logged any check-ins yet. Click the button above to record your first footstep in Vietnam!
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* QUICK LIST OF ALL CHECK-INS */}
            <div className="glass-panel p-6 rounded-2xl border border-white/5">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block mb-4">
                Pinned Landmarks Ledger ({checkins.length})
              </span>

              {checkins.length === 0 ? (
                <div className="text-center py-6 text-xs text-slate-500 font-mono italic">
                  No footsteps logged yet.
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-48 overflow-y-auto pr-1">
                  {checkins.map((item) => {
                    const isSelected = selectedCheckin?.id === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => {
                          setSelectedCheckin(item);
                          setShowAddForm(false);
                        }}
                        className={`p-3 rounded-xl border text-left flex items-center gap-3 transition-all duration-300 cursor-pointer ${
                          isSelected
                            ? "bg-game-green/5 border-game-green/60 text-white shadow-[0_0_10px_rgba(0,255,137,0.15)]"
                            : "bg-slate-900/30 border-white/5 hover:border-white/20 text-slate-300"
                        }`}
                      >
                        <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 border border-white/10">
                          <img src={item.image} alt={item.locationName} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex flex-col truncate">
                          <span className="text-xs font-bold leading-tight truncate">{item.locationName}</span>
                          <span className="text-[9px] font-mono text-slate-400 mt-1 flex items-center gap-1">
                            <Calendar className="w-2.5 h-2.5 text-game-cyan" /> {item.date}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
}
