import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';

import WhatshotIcon from '@material-ui/icons/Whatshot';
import MovieIcon from '@material-ui/icons/Movie';
import TvIcon from '@material-ui/icons/Tv';
import SearchIcon from '@material-ui/icons/Search';

import {useNavigate,  useLocation} from 'react-router-dom'
import { useEffect } from 'react';

const useStyles = makeStyles({
  root: {
    width: '100%',
    position:'fixed',
    bottom:0,
    zIndex:100,
    background:'#2d313a'
    
  },
});

export default function SimpleBottomNavigation() {

  const location = useLocation()
  
  const classes = useStyles();

  const [navValue, setnavValue] = React.useState(0);

  const [value1, setValue1] = React.useState(0);


  const navigate = useNavigate();

  useEffect(()=>{
    if(navValue === 0) navigate('/')
    else if(navValue === 1) navigate('/movies')
    else if(navValue === 2) navigate('/series')
    else if(navValue === 3) navigate('/search')
    
    // eslint-disable-next-line
  },[value1])

  useEffect(()=>{
    if(location.pathname === "/") setnavValue(0)
    else if(location.pathname === "/movies") setnavValue(1)
    else if(location.pathname === "/series") setnavValue(2)
    else if(location.pathname === "/search") setnavValue(3)
  },[location.pathname])

  return (
    <BottomNavigation
      value={navValue}
      onChange={(event, newValue) => {
        setnavValue(newValue);
        setValue1(newValue);
      }}
      // showLabels
      className={classes.root}
    >
      <BottomNavigationAction
       style={{color:"#fff"}}
       label="Trending" icon={<WhatshotIcon />} />
      <BottomNavigationAction
       style={{color:"#fff"}}
       label="Movies" icon={<MovieIcon />} />
      <BottomNavigationAction 
        style={{color:"#fff"}}
        label="Tv Series" icon={<TvIcon />} />
      <BottomNavigationAction
       style={{color:"#fff"}}
       label="Search" icon={<SearchIcon />} />
    </BottomNavigation>
  );
}
