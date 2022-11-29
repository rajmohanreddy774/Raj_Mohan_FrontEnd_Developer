import React from 'react'
import Header from './Header';
import Capsules from './capsules';
import {Box} from "@mui/material";
import HomeBanner from './HomeBannger';

export const Home = () => {
  return (
    <Box sx={{
backgroundColor:"#b5ebda"
}}>
    <Box>
       <Header/>
    </Box>
    <Box>
      <HomeBanner/>
    </Box>
    <Box>
        <Capsules/>
    </Box>

    </Box>
  )
}
