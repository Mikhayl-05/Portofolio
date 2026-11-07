import React from 'react';

export default function KonamiFlash({ active }) {
  return (
    <div id="konami-flash" style={{ opacity: active ? '1' : '0' }}></div>
  );
}

