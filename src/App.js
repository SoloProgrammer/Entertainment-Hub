
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './Components/Header/Header';
import BottomNaviagion from './Components/Bottom_nav';
import Movies from './Components/Pages/Movies/Movies'
import Trending from './Components/Pages/Trending/Trending'
import TvSeries from './Components/Pages/TvSeries/Tv_Series'
import Search from './Components/Pages/Search/Search'
import { Container } from '@material-ui/core';

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <div className='App'>
          <Container>
            <Routes>

              <Route exact path="/" element={<Trending />} />

              <Route exact path="/movies" element={<Movies />} />

              <Route exact path="/series" element={<TvSeries />} />

              <Route exact path="/search" element={<Search />} />

            </Routes>
          </Container>
        </div>
        <BottomNaviagion />
      </BrowserRouter>
    </>
  );
}

export default App;
