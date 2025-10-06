import React, { useState } from "react";

interface Image {
  src: string;
  alt: string;
}

interface PhotoGalleryProps {
  images?: Image[];
}

export function PhotoGallery({
  images = [],
}: PhotoGalleryProps): React.JSX.Element {
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);

  if (!images || images.length === 0) {
    return (
      <div className="photo-gallery">
        <div
          style={{
            padding: "2rem",
            textAlign: "center",
            background: "var(--ifm-color-emphasis-100)",
            borderRadius: "8px",
            border: "2px dashed var(--ifm-color-emphasis-300)",
          }}
        >
          <p style={{ margin: 0, color: "var(--ifm-color-emphasis-600)" }}>
            📸 Personal photos coming soon!
          </p>
          <small style={{ color: "var(--ifm-color-emphasis-500)" }}>
            Placeholder for travel photos and food shots
          </small>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="photo-gallery">
        {images.map((image, index) => (
          <img
            key={index}
            src={image.src}
            alt={image.alt}
            onClick={() => setSelectedImage(image)}
            loading="lazy"
          />
        ))}
      </div>

      {selectedImage && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0, 0, 0, 0.9)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
            cursor: "pointer",
          }}
          onClick={() => setSelectedImage(null)}
        >
          <img
            src={selectedImage.src}
            alt={selectedImage.alt}
            style={{
              maxWidth: "90%",
              maxHeight: "90%",
              objectFit: "contain",
            }}
          />
        </div>
      )}
    </>
  );
}
