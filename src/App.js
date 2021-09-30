import { useState, useEffect } from 'react';
import './App.css';
import ImageGallery from './Components/ImageGallery/imageGallery.jsx';
import { fetchImages } from './Components/Utils/fetchApi.jsx';
import { Searchbar } from './Components/Searchbar/Searchbar.jsx';
import Modal from './Components/Modal/Modal.jsx';
import Spinner from './Components/Loader/Loader.jsx';
import LoadMoreButton from './Components/Button/Button.jsx';
import toast, { Toaster } from 'react-hot-toast';

export default function App() {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);
  const [searchImage, setSearchImage] = useState('');
  const [status, setStatus] = useState('idle');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!searchImage) return;

    (async () => {
      try {
        setStatus('pending');
        setSelectedImage('');

        const images = await fetchImages(searchImage);
        if (images.length === 0) {
          toast(`Here is no images to show`, {
            icon: '👏',
            style: {
              borderRadius: '10px',
              background: '#333',
              color: '#fff',
              duration: 4000,
            },
          });
        }
        setStatus('resolved');
        setImages(images);
      } catch (error) {
        toast.error('Error');
      }
    })();
  }, [searchImage]);

  const BtnLoadMore = async () => {
    setPage(prev => prev + 1);
    const images = await fetchImages(searchImage, page + 1);
    setImages(prev => [...prev, ...images]);
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  const handleSubmit = searchImage => {
    setImages([]);
    setSearchImage(searchImage);
    setPage(1);
  };

  const handleSelectImg = imageURL => {
    setShowModal(!showModal);
    setSelectedImage(imageURL);
  };

  const showBtn = images.length >= 1;

  return (
    <>
      <Searchbar onSubmit={handleSubmit} />
      {status === 'pending' && <Spinner />}
      <ImageGallery images={images} onSelect={handleSelectImg} />
      {showBtn && <LoadMoreButton onClick={BtnLoadMore} />}
      {showModal && (
        <Modal
          src={selectedImage.largeImageURL}
          alt={selectedImage.tags}
          onSelect={handleSelectImg}
        />
      )}
      <Toaster />
    </>
  );
}
