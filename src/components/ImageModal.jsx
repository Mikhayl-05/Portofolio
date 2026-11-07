import React, { useState, useCallback } from 'react';

export default function ImageModal() {
  const [src, setSrc] = useState('');
  const [visible, setVisible] = useState(false);

  // Expose globally for pameran detail to call
  React.useEffect(() => {
    window.openImageModal = (s) => { setSrc(s); setVisible(true); };
  }, []);

  if (!visible) return null;

  return (
    <div id="image-modal" style={{ display: 'flex' }} onClick={() => setVisible(false)}>
      <img id="modal-img" src={src} alt="" />
    </div>
  );
}

