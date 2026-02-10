import React, { useRef, useEffect, useState } from 'react';
import Globe from 'react-globe.gl';
import { PublicationVenueLocation } from '../types';
import './GlobeMarkers.css';

interface ResearchGlobeProps {
  data: PublicationVenueLocation[];
  onLocationClick: (location: PublicationVenueLocation) => void;
}

const ResearchGlobe: React.FC<ResearchGlobeProps> = ({ data, onLocationClick }) => {
  const globeEl = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ width: 800, height: 800 });
  const isHoveringPointRef = useRef(false);

  // Resize globe based on container, not window magic numbers
  useEffect(() => {
    const updateSize = () => {
      if (!containerRef.current) return;

      const { width, height } = containerRef.current.getBoundingClientRect();

      setSize({
        width: Math.floor(width),
        height: Math.floor(height)
      });
    };

    updateSize();

    const ro = new ResizeObserver(updateSize);
    if (containerRef.current) ro.observe(containerRef.current);

    return () => ro.disconnect();
  }, []);

  // Camera + controls setup
  useEffect(() => {
    if (!globeEl.current) return;

    const controls = globeEl.current.controls();

    const stop = () => (controls.autoRotate = false);
    const start = () => {
      if (!isHoveringPointRef.current) controls.autoRotate = true;
    };

    controls.addEventListener('start', stop);
    controls.addEventListener('end', start);

    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.6;

    return () => {
      controls.removeEventListener('start', stop);
      controls.removeEventListener('end', start);
    };
  }, []);


  // Optional arcs
  const arcsData = data.slice(0, -1).map((d, i) => ({
    startLat: d.lat,
    startLng: d.lng,
    endLat: data[i + 1].lat,
    endLng: data[i + 1].lng
  }));

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        height: '100%',
        minHeight: 0
      }}
    >
      <Globe
        ref={globeEl}
        width={size.width}
        height={size.height}

        globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
        bumpImageUrl={"//unpkg.com/three-globe/example/img/earth-topology.png"}
        backgroundColor="rgba(0,0,0,0)"

        pointsData={data}
        pointLat={(d: any) => d.lat}
        pointLng={(d: any) => d.lng}
        pointColor={() => '#f4bd3e'}
        pointAltitude={0.02}
        pointRadius={0.8}
        pointLabel={(d: any) => {
          const title = [d?.city, d?.country].map((s: any) => (s ?? '').toString().trim()).filter(Boolean).join(', ');
          const conferences = Array.isArray(d?.conferences) ? d.conferences : [];
          const conferenceCount = conferences.length;
          const paperCount = conferences.reduce(
            (sum: number, c: any) => sum + (Array.isArray(c?.papers) ? c.papers.length : 0),
            0
          );
          const subtitle = conferenceCount
            ? `${conferenceCount} conference${conferenceCount === 1 ? '' : 's'} • ${paperCount} paper${paperCount === 1 ? '' : 's'}`
            : '';
          return `
            <div class="globe-tooltip">
              <div class="globe-tooltip-title">${title || 'Location'}</div>
              ${subtitle ? `<div class="globe-tooltip-subtitle">${subtitle}</div>` : ''}
            </div>
          `;
        }}
        onPointHover={(p: any) => {
          isHoveringPointRef.current = Boolean(p);
          const controls = globeEl.current?.controls?.();
          if (!controls) return;
          controls.autoRotate = !isHoveringPointRef.current;
        }}
        onPointClick={(p: any) => onLocationClick(p)}

        ringsData={data}
        ringLat={(d: any) => d.lat}
        ringLng={(d: any) => d.lng}
        ringAltitude={0.02}
        ringColor={() => 'rgba(244, 189, 62, 0.45)'}
        ringMaxRadius={1.6}
        ringPropagationSpeed={2.2}
        ringRepeatPeriod={900}

        arcsData={arcsData}
        arcColor={() => 'rgba(255, 136, 0, 0.4)'}
        arcDashLength={0.4}
        arcDashGap={0.2}
        arcDashAnimateTime={2000}
        arcStroke={0.5}

        enablePointerInteraction
      />
    </div>
  );
};

export default ResearchGlobe;
