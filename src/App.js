import { Component } from 'react';
import './App.css';
import ImageGallery from './Components/ImageGallery/imageGallery.jsx';
import { fetchImages } from './Components/Utils/fetchApi.jsx';
import { Searchbar } from './Components/Searchbar/Searchbar.jsx';
import Modal from './Components/Modal/Modal.jsx';
import Spinner from './Components/Loader/Loader.jsx';
import LoadMoreButton from './Components/Button/Button.jsx';
import toast, { Toaster } from 'react-hot-toast';

export default class App extends Component {
  state = {
    images: [],
    page: 1,
    selectedImage: null,
    searchImage: null,
    status: 'free',
    error: null,
    loading: false,
    showModal: false,
  };

  async componentDidUpdate(prevProps, prevState) {
    const { searchImage, page } = this.state;

    if (prevState.searchImage !== searchImage || prevState.page !== page) {
      try {
        this.setState({ status: 'pending' });
        const gallery = await fetchImages(searchImage, page);

        this.setState({ status: 'resolved' });

        if (searchImage.trim() === '' || gallery.length === 0) {
          return toast(`Here is no images to show`, {
            icon: '👏',
            style: {
              borderRadius: '10px',
              background: '#333',
              color: '#fff',
              duration: 4000,
            },
          });
        }
        this.setState({ images: [...this.state.images, ...gallery] });

        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: 'smooth',
        });
      } catch (error) {
        this.setState({ status: 'reject' });
        toast.error('Error');
      }
    }
  }

  handleSubmit = searchImage => {
    this.setState({ searchImage: searchImage, page: 1, images: [] });
  };

  handleSelectImg = imageURL => {
    this.setState(prevState => ({
      showModal: !prevState.showModal,
      selectedImage: imageURL,
    }));
  };

  BtnLoadMore = () => {
    this.setState(p => ({ page: p.page + 1 }));
  };

  render() {
    const { images, status, selectedImage, showModal } = this.state;
    const showBtn = images.length >= 1;

    return (
      <>
        <Searchbar onSubmit={this.handleSubmit} />
        {status === 'pending' && <Spinner />}
        <ImageGallery images={images} onSelect={this.handleSelectImg} />
        {showBtn && <LoadMoreButton onClick={this.BtnLoadMore} />}
        {showModal && (
          <Modal
            src={selectedImage.largeImageURL}
            alt={selectedImage.tags}
            onSelect={this.handleSelectImg}
          />
        )}
        <Toaster />
      </>
    );
  }
}
