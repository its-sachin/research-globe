import React, { useEffect, useRef, useState } from 'react';
import Globe from 'react-globe.gl';
import type { UniversityCollaborationLocation } from '../types';
import './GlobeMarkers.css';

interface UniversityCollaborationsGlobeProps {
  data: UniversityCollaborationLocation[];
  onLocationClick: (location: UniversityCollaborationLocation) => void;
}

const UniversityCollaborationsGlobe: React.FC<UniversityCollaborationsGlobeProps> = ({ data, onLocationClick }) => {
  const globeEl = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ width: 800, height: 800 });
  const isHoveringPointRef = useRef(false);

  useEffect(() => {
    const updateSize = () => {
      if (!containerRef.current) return;
      const { width, height } = containerRef.current.getBoundingClientRect();
      setSize({ width: Math.floor(width), height: Math.floor(height) });
    };

    updateSize();
    const ro = new ResizeObserver(updateSize);
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

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

  const points = data.filter((d) => typeof d.lat === 'number' && typeof d.lng === 'number');

  // Reuse the same "connect consecutive points" linking style used in ResearchGlobe.
  const arcsData = points.slice(0, -1).map((d, i) => ({
    startLat: d.lat as number,
    startLng: d.lng as number,
    endLat: points[i + 1].lat as number,
    endLng: points[i + 1].lng as number
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
        bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
        backgroundColor="rgba(0,0,0,0)"
        pointsData={points}
        pointLat={(d: any) => d.lat}
        pointLng={(d: any) => d.lng}
        pointColor={() => '#f4bd3e'}
        pointAltitude={0.02}
        pointRadius={0.8}
        pointLabel={(d: any) => {
          const title = (d?.institution || d?.city || d?.country || '').toString();
          const subtitle = [d?.city, d?.country].map((s: any) => (s ?? '').toString().trim()).filter(Boolean).join(', ');
          return `
            <div class="globe-tooltip">
              <div class="globe-tooltip-title">${title}</div>
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

        ringsData={points}
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

export default UniversityCollaborationsGlobe;
