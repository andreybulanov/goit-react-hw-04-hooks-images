import { useEffect } from 'react';
import { Overlay, ContentModal } from './Modal.Styled';
import { createPortal } from 'react-dom';

const modalRoot = document.querySelector('#modal-root');

export default function Modal ({src, alt, onSelect}) {
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
       window.removeEventListener('keydown', handleKeyDown);
    }
  })

  const handleKeyDown = e => {
    if (e.code === 'Escape') {
      onSelect();
    }
  };

  const handleBackDropClick = e => {
    if (e.currentTarget === e.target) {
      onSelect();
    }
  };
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


// class Modal extends Component {
//   componentDidMount() {
//     window.addEventListener('keydown', this.handleKeyDown);
//   }

//   componentWillUnmount() {
//     window.removeEventListener('keydown', this.handleKeyDown);
//   }

//   handleKeyDown = e => {
//     if (e.code === 'Escape') {
//       this.props.onSelect();
//     }
//   };

//   handleBackDropClick = e => {
//     if (e.currentTarget === e.target) {
//       this.props.onSelect();
//     }
//   };

//   render() {
//     const { src, alt} = this.props;
//     const { handleBackDropClick } = this;
//     return createPortal(
//       <>
//         <Overlay onClick={handleBackDropClick}>
//           <ContentModal>
//             <img src={src} alt={alt} />
//           </ContentModal>
//         </Overlay>
//       </>,
//       modalRoot,
//     );
//   }
// }

// export default Modal;