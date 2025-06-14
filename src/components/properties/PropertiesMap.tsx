
import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { mockProperties } from "@/data/mockProperties";
import { Property } from "@/types/property";
import { Locate } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

/**
 * Utilitaire simple pour obtenir un label depuis l'adresse
 */
const getAddressLabel = (prop: Property) =>
  `${prop.address.number || ""} ${prop.address.street}, ${prop.address.postalCode} ${prop.address.city}`;

const DEFAULT_MAPBOX = localStorage.getItem("mapbox_token") || "";

const PropertiesMap: React.FC = () => {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = useState<string>(DEFAULT_MAPBOX);
  const [tokenSaved, setTokenSaved] = useState<boolean>(!!DEFAULT_MAPBOX);

  // Propriétés possédant latitude/longitude valides
  const propertiesWithCoords = mockProperties.filter(
    (p) => p.address.latitude && p.address.longitude
  );

  useEffect(() => {
    if (!tokenSaved || !mapboxToken || !mapContainer.current) return;

    if (map.current) {
      map.current.remove();
      map.current = null;
    }

    mapboxgl.accessToken = mapboxToken;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center:
        propertiesWithCoords.length > 0
          ? [
              propertiesWithCoords[0].address.longitude!,
              propertiesWithCoords[0].address.latitude!,
            ]
          : [2.3522, 48.8566], // Paris default
      zoom: propertiesWithCoords.length > 0 ? 11 : 5,
      pitch: 0,
    });

    map.current.addControl(new mapboxgl.NavigationControl(), "top-right");

    // Ajout des markers
    propertiesWithCoords.forEach((prop) => {
      if (
        typeof prop.address.latitude !== "number" ||
        typeof prop.address.longitude !== "number"
      )
        return;

      const popup = new mapboxgl.Popup({ offset: 16 }).setHTML(
        `<div>
          <strong>${prop.reference}</strong>
          <br />
          ${getAddressLabel(prop)}
          <br />
          <a href="/properties/${prop.id}" class="text-indigo-600 hover:underline" target="_blank">Voir la fiche</a>
        </div>`
      );

      const el = document.createElement("div");
      el.className =
        "bg-indigo-500 rounded-full shadow-lg flex items-center justify-center";
      el.style.width = "26px";
      el.style.height = "26px";
      el.innerHTML =
        '<svg width="22" height="22" fill="white" viewBox="0 0 24 24"><path d="M12 2C8.1 2 5 5.1 5 9c0 5.2 5.8 12.3 6 12.5.2.2.5.2.7 0 .2-.2 6-7.3 6-12.5 0-3.9-3.1-7-7-7zm0 9.8c-1.6 0-2.8-1.3-2.8-2.8S10.4 6.2 12 6.2s2.8 1.3 2.8 2.8S13.6 11.8 12 11.8z"/></svg>';
      // Manipule le curseur sur Hover
      el.style.cursor = "pointer";

      const marker = new mapboxgl.Marker(el)
        .setLngLat([prop.address.longitude!, prop.address.latitude!])
        .setPopup(popup)
        .addTo(map.current!);
    });

    return () => {
      map.current?.remove();
    };
    // eslint-disable-next-line
  }, [tokenSaved, mapboxToken]);

  const handleTokenSave = () => {
    if (!mapboxToken.trim()) {
      toast.error("Merci de saisir un token Mapbox valide !");
      return;
    }
    localStorage.setItem("mapbox_token", mapboxToken);
    setTokenSaved(true);
    toast.success("Token Mapbox sauvegardé !");
  };

  if (!tokenSaved) {
    return (
      <div className="max-w-md mx-auto flex flex-col items-center gap-4 py-10">
        <Locate className="w-10 h-10 text-indigo-600 mb-2" />
        <h2 className="text-xl font-semibold mb-2">Carte des biens</h2>
        <p>
          Merci d’entrer votre&nbsp;
          <a
            href="https://account.mapbox.com/access-tokens/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-600 underline"
          >
            Mapbox public token
          </a>
          &nbsp;pour activer la carte.
        </p>
        <Input
          placeholder="Votre Mapbox public token"
          value={mapboxToken}
          onChange={(e) => setMapboxToken(e.target.value)}
          className="max-w-full"
        />
        <Button onClick={handleTokenSave}>Enregistrer le token</Button>
        <div className="text-xs text-gray-500">
          Vous trouverez gratuitement ce token sur votre compte mapbox.com.
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[70vh] lg:h-[80vh]">
      <div ref={mapContainer} className="absolute inset-0 rounded-lg shadow-lg" />
      <div className="absolute top-4 left-4 z-10 bg-white/90 shadow px-2 py-1 rounded text-gray-700 text-xs">
        {propertiesWithCoords.length} biens géolocalisés
      </div>
    </div>
  );
};

export default PropertiesMap;
