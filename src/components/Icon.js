import React from 'react';

const paths = {
  play: 'm9 5 11 7-11 7V5Z',
  info: 'M12 11v6m0-10v.01',
  left: 'm14 6-6 6 6 6',
  right: 'm10 6 6 6-6 6',
  close: 'm6 6 12 12M6 18 18 6',
  external: 'M14 3h7v7m0-7L10 14M10 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5',
};

export default function Icon({ name }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill={name === 'play' ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      {name === 'info' && <circle cx="12" cy="12" r="9" />}
      <path d={paths[name]} />
    </svg>
  );
}
