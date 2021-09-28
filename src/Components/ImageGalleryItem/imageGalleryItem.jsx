function ImageGalleryItem({ image, onClick }) {
  const { id, tags, webformatURL } = image;
  return (
    <li key={id} className="ImageGalleryItem" onClick={onClick}>
      <img src={webformatURL} alt={tags} className="ImageGalleryItem-image" />
    </li>
  );
}

export default ImageGalleryItem;

