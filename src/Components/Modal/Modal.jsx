import { Component } from 'react';
import { Overlay, ContentModal } from './Modal.Styled';
import { createPortal } from 'react-dom';

const modalRoot = document.querySelector('#modal-root');

class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onSelect();
    }
  };

  handleBackDropClick = e => {
    if (e.currentTarget === e.target) {
      this.props.onSelect();
    }
  };

  render() {
    const { src, alt} = this.props;
    const { handleBackDropClick } = this;
    return createPortal(
      <>
        <Overlay onClick={handleBackDropClick}>
          <ContentModal>
            <img src={src} alt={alt} />
          </ContentModal>
        </Overlay>
      </>,
      modalRoot,
    );
  }
}

export default Modal;