import React, { useState, useEffect } from 'react'
import Nav from "./components/Nav"
import Feed from "./components/Feed"
import Header from "./components/Header"
import "./App.css"
import { StateProvider } from "./context/Context";


const App = () => {

  const [photos, setPhotos] = useState([]); // For display all the photos 
  const [selectedPhoto, setSelectedPhoto] = useState(null); // For Display selected image in image modal
  const [searchResults, setSearchResults] = useState([]); // For display searched photos
  const [modalIsOpen, setIsOpen] = useState(false); // For image modal
  const [currentPage, setCurrentPage] = useState(1); // Current page of photos
  const [totalPages, setTotalPages] = useState(1); // Total number of pages of photos


  const fetchPhotos = async () => {
    const response = await fetch(
      `https://api.pexels.com/v1/curated?page=${currentPage}&per_page=40`,
      {
        headers: {
          Authorization: 'YOUR__API__KEY',
        },
      }
    );
    const data = await response.json();
    setPhotos(data.photos);
    setTotalPages(data.total_results);
    console.log(data)
  };

  const searchPhotos = async (query) => {
    const response = await fetch(
      `https://api.pexels.com/v1/search?query=${query}&page=${currentPage}&per_page=40`,
      {
        headers: {
          Authorization: 'YOUR__API__KEY',
        },
      }
    );
    const data = await response.json();
    setSearchResults(data.photos);
    setTotalPages(data.total_results);
  };

  useEffect(() => {
    fetchPhotos();
  }, [currentPage]);

  const handleSearch = (query) => {
    if (query === "") {
      setSearchResults([]);
      setCurrentPage(1);
    } else {
      searchPhotos(query);
      setCurrentPage(1);
    }
  }

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  }

  const openModal = (photo) => {
    setIsOpen(true)
    setSelectedPhoto(photo);
  };


  const closeModal = () => {
    setIsOpen(false)
  };

  return (
    <StateProvider>
      <div>
        <Nav
          handleSearch={handleSearch}/>
        
        <Feed
          modalIsOpen={modalIsOpen}
          setIsOpen={setIsOpen}
          openModal={openModal}
          closeModal={closeModal}
          photos={searchResults.length > 0 ? searchResults : photos}
          selectedPhoto={selectedPhoto}
          setSelectedPhoto={setSelectedPhoto}
          currentPage={currentPage}
          totalPages={totalPages}
          handlePrevPage={handlePrevPage}
          handleNextPage={handleNextPage}
        />
      </div>
    </StateProvider>

  )
}

export default App;

