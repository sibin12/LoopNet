import React, { useState, useRef } from 'react';
import AvatarEditor from 'react-avatar-editor';

function ImageUploaderWithManualCrop() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [scale, setScale] = useState(1);
  const [editor, setEditor] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  const handleScaleChange = (e) => {
    const newScale = parseFloat(e.target.value);
    setScale(newScale);
  };

  const handleSave = () => {
    if (editor) {
      const canvas = editor.getImageScaledToCanvas();
      const croppedImage = canvas.toDataURL('image/png');
      // Handle the cropped image as needed
    }
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      {selectedImage && (
        <div>
          <h2>Selected Image:</h2>
          <img src={selectedImage} alt="Selected" style={{ maxWidth: '100%' }} />
          <h2>Manual Crop:</h2>
          <input
            type="range"
            min="1"
            max="3"
            step="0.1"
            value={scale}
            onChange={handleScaleChange}
          />
          <AvatarEditor
            ref={(ref) => setEditor(ref)}
            image={selectedImage}
            width={200}
            height={200}
            border={50}
            borderRadius={100}
            scale={scale}
          />
          <button onClick={handleSave}>Save Crop</button>
        </div>
      )}
    </div>
  );
}

export default ImageUploaderWithManualCrop;
