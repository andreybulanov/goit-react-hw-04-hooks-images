import ImageGalleryItem from "../ImageGalleryItem/imageGalleryItem";
import PropTypes from 'prop-types';

function ImageGallery({ images, onSelect, selectImg }) {
  return (
      <ul className="ImageGallery">      
              {images.map((image, id) => (
                <ImageGalleryItem key={id} image={image}
                  onClick ={()=> onSelect(image)}
               />
            ))}
    </ul>
  );
}

export default ImageGallery;

 ImageGallery.propTypes = {
    images: PropTypes.arrayOf(PropTypes.object),
    onSelect: PropTypes.func,
};
