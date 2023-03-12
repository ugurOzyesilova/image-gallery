import React from 'react';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import ImageModal from './ImageModal';

const Feed = ({
    modalIsOpen,
    setIsOpen,
    openModal,
    closeModal,
    photos,
    selectedPhoto,
    setSelectedPhoto,
    currentPage,
    totalPages,
    handlePrevPage,
    handleNextPage
}) => {
    return (
        <>
            <ResponsiveMasonry
                columnsCountBreakPoints={{ 350: 2, 750: 6, 900: 8 }}
                className="feed"
            >
                <Masonry gutter="10px">
                    {photos.map((photo) => (
                        <img
                            key={photo.id}
                            className="feed__image"
                            src={photo.src.large}
                            alt=""
                            onClick={() => openModal(photo)}
                        />
                    ))}
                </Masonry>
            </ResponsiveMasonry>
            <div className="pagination">
                <button onClick={handlePrevPage}>Prev</button>
                    <button onClick={handleNextPage}>Next</button>
            </div>
            <ImageModal
                isOpen={modalIsOpen}
                openModal={openModal}
                closeModal={closeModal}
                selectedPhoto={selectedPhoto}
                setSelectedPhoto={setSelectedPhoto}
            />
        </>
    );
};

export default Feed;
