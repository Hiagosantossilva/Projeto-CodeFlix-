import React from 'react';
import { getProjectTitle, resolveAsset } from '../projectUtils';
import './ProjectBrand.css';

export default function ProjectBrand({ item, variant = 'card' }) {
  if (!item.logo_path) return null;

  return (
    <span
      className={`project-brand project-brand--${variant}${item.suite_name ? ' project-brand--suite' : ''}`}
      style={{
        '--brand-color': item.brand_color || '#149cff',
        '--logo-scale': item.logo_scale || 1,
      }}
      aria-hidden="true"
    >
      <img
        className="project-brand--logo"
        src={resolveAsset(item.logo_path)}
        alt=""
        decoding="async"
        loading={variant === 'card' ? 'lazy' : undefined}
      />
      {variant === 'card' && (
        <>
          <span className="project-brand--name">{item.brand_name || getProjectTitle(item)}</span>
          {item.brand_caption && <span className="project-brand--caption">{item.brand_caption}</span>}
        </>
      )}
    </span>
  );
}
