import { useEffect, useRef } from "react";
import { Map as MapLibreMap, Marker, AttributionControl } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

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
