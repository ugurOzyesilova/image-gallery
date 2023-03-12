import React, { useContext } from "react";
import Modal from "react-modal";
import { Context } from "../context/Context";

const SavedImagesModal = ({ isOpen, closeModal }) => {
    const { savedImages, unsaveImage } = useContext(Context);


    return (
        <Modal isOpen={isOpen} onRequestClose={closeModal} contentLabel="Saved Images Modal" className="saved-images__modal">
            <h2>Saved Images</h2>
            <div className="saved-images__list">
                {savedImages.length > 0 ? (
                    savedImages.map((image) => (<div>
                        <img key={image.id} src={image.src.medium} alt="" />
                        <button onClick={() => unsaveImage(image.id)}>Unsave Image</button>
                    </div>
                        
                    ))
                ) : (
                    <p>You haven't saved any images yet.</p>
                )}
            </div>
        </Modal>
    );
};

export default SavedImagesModal;