//import logo from './logo.svg';
//import './App.css';
import React, {Component, useEffect, useState } from 'react';
//import axios from 'axios';
import newApi from './services/api-services';
import Searchbar from './components/Searchbar/Searchbar';
import Button from './components/Button/Button';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Modal from './components/Modal/Modal';
import LoaderSpiner from './components/Loader/Loader';
import Section from './components/Section/Section';

// export default function App() {
//   const [hits, setHits] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [largeImageURL, setLargeImageURL] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [showModal, setShowModal] = useState(false);
//   const [error, setError] = useState(null);

// const onChangeQuery = query => {
//       setSearchQuery(query);
//       setCurrentPage(1);
//       setHits([]);
//       setError(null);
//       setIsLoading(true);
// }
  
//   useEffect(() => {
//     if (!searchQuery) {
//       return;
//     }

 
//   })

    

//     const onToggleModal = () => {
//       setShowModal((showModal) => ({
//         showModal: !showModal,
//       }));
//     }
  
//     const clickOpenModal = e => {
//       setLargeImageURL(e.target.dataset.source);
//       onToggleModal();
//     };

//     const scrollImages = () => {
//       window.scrollBy({
//         top: document.documentElement.clientHeight - 100,
//         behavior: 'smooth',
//       });
//     }

//     const onLoadeMore = () => {
//       setCurrentPage(prevCurrentPage => currentPage + 1)
//     };


//     return (
//       <div>
//         {error && <h1> Перезавантажте, будь ласка, ще раз сторінку </h1>}
//         <Section>
        
//           {showModal && <Modal onClickModal={onToggleModal} largeImageURL={largeImageURL} />}

//           <Searchbar onSubmit={onChangeQuery} />
//           <ImageGallery hits={hits} clickOpenModal={clickOpenModal} />

//           {isLoading && <LoaderSpiner />}
      
//           {hits.length > 0 && !isLoading &&
//             <Button onButton={onLoadeMore} onScroll={scrollImages()} />
//           }
//         </Section>
      
      
//       </div>
//     )
//   }
  


class App extends Component {
  state = {
    hits: [],
    currentPage: 1,
    searchQuery: '',
    largeImageURL: '',
    isLoading: false,
    showModal: false,
    error: null,
  };

  onToggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    })); 
  }

  clickOpenModal = e => {
    this.setState({
      largeImageURL: e.target.dataset.source}
  )
    this.onToggleModal();
  }

  scrollImages = () => {
     window.scrollBy({
  top: document.documentElement.clientHeight - 100,
  behavior: 'smooth',
});
  }
 
 
  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchQuery !== this.state.searchQuery) {
      this.fetchHits();
    }
  }

  onChangeQuery = query => {
    this.setState({ searchQuery: query, currentPage: 1, hits: [], error: null, });
    
  }
  
  fetchHits = () => {
    
    const { currentPage, searchQuery } = this.state;
    
    this.setState({ isLoading: true });
  
    const options = { currentPage, searchQuery };
    
    newApi.fetchHitsImages(options)
      .then(hits => {
        this.setState(prevState => ({
          hits: [...prevState.hits, ...hits],
          currentPage: prevState.currentPage + 1,
        }))
      })
      .catch(error => this.setState({error}))
      .finally(() => this.setState({ isLoading: false }));
    
    //this.scrolImages();
  }
  

  render() {
    const { hits, isLoading, showModal, largeImageURL, error } = this.state;

    return <div>
      {error && <h1> Перезавантажте, будь ласка, ще раз сторінку </h1>}
      <Section>
        
        {showModal && <Modal onClickModal={this.onToggleModal} largeImageURL={largeImageURL} />}

      <Searchbar onSubmit={this.onChangeQuery}/>
      <ImageGallery hits={hits} clickOpenModal={this.clickOpenModal} />

      {isLoading && <LoaderSpiner/>}
      
      {hits.length > 0 && !isLoading &&
          <Button onButton={this.fetchHits} onScroll={ this.scrollImages()}/>
    }
      </Section>
      
      
    </div>;
  }
}
export default App;