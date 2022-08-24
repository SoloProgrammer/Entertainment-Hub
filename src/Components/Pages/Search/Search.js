import React, { useState } from 'react'
import { Button,Tab, Tabs, TextField, ThemeProvider } from '@material-ui/core'
import { createTheme } from '@material-ui/core/styles'

import SearchIcon from '@material-ui/icons/Search'
import axios from 'axios';
import CustomPagination from '../../Pagination/CustomPagination';
import SingleCard from '../Single_Card/SingleCard';
import { useEffect } from 'react';


const theme = createTheme({
  palette: {
    type: 'dark',
    primary: {
      main: "#ffff"
    }
  },
});


function Search() {

  const [type, setType] = useState(0)

  const [searchText, setSearchText] = useState("")

  const [totalpages, setTotalpages] = useState(0)

  const [not_found, setNot_found] = useState(false)

  const [page,setPage] = useState(1)

  const [searchContent,setSearchContent] = useState([])

  const Search_content = async () =>{
    if(searchText.length > 0){
        const data = await axios.get(`https://api.themoviedb.org/3/search/${type == 1 ? "tv" : "movie"}?api_key=${
          process.env.REACT_APP_API_KEY
        }&language=en-US&query=${searchText}&page=${page}&include_adult=false`)
    
        setSearchContent(data.data.results)

        setTotalpages(data.data.total_pages)

        if(data.data.results.length < 1){
          setNot_found(true)
        }
        else{
          setNot_found(false)
        }
    }
  }

  useEffect(()=>{
    window.scroll(0,0)
    Search_content();
  },[type,page])

  return (
    <>
      <ThemeProvider theme={theme}>
        <div style={{ display: 'flex' }}>
          <TextField
            style={{ flex: 1 }}
            id="filled-basic"
            label="Search"
            className='Search_bar'
            variant="filled"
            autoFocus
            value={searchText}
            onChange={(e) => { setSearchText(e.target.value); setNot_found(false) }} />
          <Button onClick={Search_content} size='large' style={{ marginLeft: "9px" }} variant='contained' >
            <SearchIcon />
          </Button>
        </div>
        <Tabs style={{ margin: "1rem 0" }} value={type} indicatorColor='primary' textColor='primary'>
          <Tab onClick={() => {setType(0) ; setPage(1)}} style={{ width: "50%" }} label='search Movies' />
          <Tab onClick={() => {setType(1) ; setPage(1)}} style={{ width: "50%" }} label='search tv Series' />
        </Tabs>
      </ThemeProvider>
      {
        not_found && <p className='not_found'>{!type ? "Movies" : "TV Series"}  not Found</p>
      }
      <div className={`${totalpages > 1 ? "Cards_container" : "Cards_container pad_bott_4"}`}>
        {
          searchContent.map((scontent, ind) => {
            return <SingleCard key={scontent.id} media_type={type ? "TV Series" : "Movie"} content={scontent} />
          })
        }
      </div>
      {
        totalpages > 1 && <CustomPagination setPage={setPage} totalpages={totalpages} />
      }
    </>
  )
}

export default Search
