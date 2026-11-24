import { useEffect, useRef } from "react";
import { Map as MapLibreMap, Marker, AttributionControl, setWorkerUrl } from "maplibre-gl";
import mapLibreWorkerUrl from "maplibre-gl/dist/maplibre-gl-worker.mjs?worker&url";
import "maplibre-gl/dist/maplibre-gl.css";

// Vite must serve MapLibre's worker as a separate asset in production.
setWorkerUrl(mapLibreWorkerUrl);

export function W3CLocationMap() {
  const mapContainer = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    const map = new MapLibreMap({
      container: mapContainer.current,
      style: "https://tiles.openfreemap.org/styles/dark",
      center: [3.3792, 6.5244],
      zoom: 3.15,
      minZoom: 2,
      maxZoom: 16,
      attributionControl: false,
      cooperativeGestures: true,
    });

    // Keep country-name labels only. Hide state, city, road, POI and other symbol labels at every zoom.
    map.on("style.load", () => {
      for (const layer of map.getStyle().layers) {
        if (layer.type === "symbol" && !/country/i.test(layer.id)) {
          map.setLayoutProperty(layer.id, "visibility", "none");
        }
      }
    });

    const markerElement = document.createElement("div");
    markerElement.className = "w3c-map-marker";
    markerElement.setAttribute("role", "img");
    markerElement.setAttribute("aria-label", "W3C location marker: Lagos, Nigeria");
    markerElement.innerHTML = '<span class="w3c-map-marker__pulse"></span><span class="w3c-map-marker__dot"></span>';

    new Marker({ element: markerElement, anchor: "center" })
      .setLngLat([3.3792, 6.5244])
      .addTo(map);

    map.addControl(
      new AttributionControl({
        compact: true,
        customAttribution: "© OpenStreetMap contributors",
      }),
      "bottom-right",
    );

    return () => map.remove();
  }, []);

  return (
    <div
      ref={mapContainer}
      className="w3c-location-map h-[340px] w-full sm:h-[400px]"
      aria-label="Interactive map centred on Lagos, Nigeria, with Africa visible"
    />
  );
}
