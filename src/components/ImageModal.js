import React, { useState, useContext, useEffect } from "react";
import Modal from "react-modal";
import { Context } from "../context/Context";

const ImageModal = ({ isOpen, closeModal, selectedPhoto }) => {
    const { saveImage, unsaveImage, savedImages } = useContext(Context);

    const [downloadLink, setDownloadLink] = useState("");
    const [isSaved, setIsSaved] = useState(false);

     useEffect(() => {
        localStorage.setItem("savedImages", JSON.stringify(savedImages));
    }, [savedImages]);

    useEffect(() => {
        if (selectedPhoto) {
            setIsSaved(savedImages.some(image => image.id === selectedPhoto.id));
        }
    }, [selectedPhoto, savedImages]);

    const handleDownload = async () => {
        const response = await fetch(selectedPhoto.src.original, {
            headers: {
                Authorization: "YOUR__API__KEY",
            },
        });
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);

        const img = new Image();
        img.onload = () => {
            const grayscaleImg = grayscaleImage(img);
            setDownloadLink(grayscaleImg.src);
        };
        img.src = url;
    };

    const handleSave = () => {
        saveImage(selectedPhoto);
        setIsSaved(true);
    };

    const handleUnsave = () => {
        unsaveImage(selectedPhoto.id);
        setIsSaved(false);
    };

    const grayscaleImage = (img) => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;

        ctx.drawImage(img, 0, 0);

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;

        for (let i = 0; i < data.length; i += 4) {
            const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
            data[i] = avg;
            data[i + 1] = avg;
            data[i + 2] = avg;
        }

        ctx.putImageData(imageData, 0, 0);

        const grayscaleImg = new Image();
        grayscaleImg.src = canvas.toDataURL();

        return grayscaleImg;
    };


    return (
        <Modal isOpen={isOpen} onRequestClose={closeModal} contentLabel="Image Modal" className="image__modal">
            {selectedPhoto && <img className="modal__image" src={selectedPhoto.src.large} alt="" />}
            <div className="modal__buttons">
                {downloadLink ? (
                    <>
                        <a href={downloadLink} download={selectedPhoto.id}>
                            <button>Download Image</button>
                        </a>
                        {isSaved ? (
                            <button disabled>Saved</button>
                        ) : (
                            <button onClick={handleSave}>Save Image</button>
                        )}
                    </>
                ) : (
                    <>
                        <button onClick={handleDownload}>Download Image</button>
                        {isSaved ? (
                            <button disabled>Saved</button>
                        ) : (
                            <button onClick={handleSave}>Save Image</button>
                        )}
                    </>
                )}
                {isSaved && <button onClick={handleUnsave}>Unsave Image</button>}
            </div>
        </Modal>
    );
};

export default ImageModal;
