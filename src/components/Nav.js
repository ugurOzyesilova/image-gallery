import React, { useState, useContext, useEffect } from 'react';
import { GiLightningTear } from "react-icons/gi"
import { CiSaveDown2, CiSearch } from "react-icons/ci"
import { Context } from '../context/Context';
import SavedImagesModal from "./SavedImagesModal";

const Nav = ({ handleSearch  }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const { savedImages } = useContext(Context);
    const [count, setCount] = useState(savedImages.length);
    const [isSavedImagesModalOpen, setIsSavedImagesModalOpen] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        handleSearch(searchTerm);
    };

    const handleInputChange = (e) => {
        setSearchTerm(e.target.value);
        if (e.target.value === "") {
            handleSearch("");
        }
    };

    const handleSavedImagesModalOpen = () => {
        setIsSavedImagesModalOpen(true);
    };

    const handleSavedImagesModalClose = () => {
        setIsSavedImagesModalOpen(false);
    };


    useEffect(() => {
        setCount(savedImages.length);
    }, [savedImages]);

    return (
        <nav>
            <GiLightningTear className="nav__logo"/>
            <form className="nav__search" onSubmit={handleSubmit} >
                <input type="text" placeholder="Search" value={searchTerm} onChange={handleInputChange} />
                <CiSearch />
            </form>
            <div className="nav__saved" onClick={handleSavedImagesModalOpen}>
                <CiSaveDown2 />
                <div className="nav__saved__counter">
                    <span>{count}</span>
                </div>
            </div>
            <SavedImagesModal isOpen={isSavedImagesModalOpen} closeModal={handleSavedImagesModalClose} />
        </nav>
    )
}

export default Nav;
