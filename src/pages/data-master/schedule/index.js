import { useState, useEffect, useContext } from 'react'

// material-ui
import {
  Box,
  Card,
  Grid,
  Typography,
  Stack,
  Select,
  MenuItem,
  IconButton
} from '@mui/material'

import { Add, MoreVert, FormatListBulleted, ArrowDropDownRounded, ArrowLeftRounded, ArrowRightRounded } from '@mui/icons-material'

const SchedulePage = () => {
  // useEffect(() => {
  //     window.location.reload()
  // }, [])

  return (
    <Grid container>
      <Grid item xs={12} sm={12} md={12} lg={12}>
        <Stack direction='row' justifyContent='space-between' alignItems='center'>
          <Stack direction='row' spacing={1} alignItems='center'>
            <Typography variant='h5' sx={{ fontWeight:400 }}>My Task</Typography>
            <IconButton size='small' sx={{ backgroundColor:'#0e0e0e', color:'#d9d9d9', ':hover': { backgroundColor:'#0e0e0e' } }}>
              <ArrowDropDownRounded />
            </IconButton>
          </Stack>
          <Stack direction='row' spacing={2}>
            <IconButton size='small'>
              <FormatListBulleted />
            </IconButton>
            <IconButton size='small'>
              <Add />
            </IconButton>
            <IconButton size='small'>
              <MoreVert />
            </IconButton>
          </Stack>
        </Stack>
        <Stack direction='row' justifyContent='space-between' alignItems='center' sx={{ marginY:2 }}>
          <IconButton size='small' sx={{ backgroundColor:'#0e0e0e', color:'#d9d9d9', ':hover': { backgroundColor:'#0e0e0e' } }}>
            <ArrowLeftRounded />
          </IconButton>
          <Typography variant='h4'>MEI 2023</Typography>
          <IconButton size='small' sx={{ backgroundColor:'#0e0e0e', color:'#d9d9d9', ':hover': { backgroundColor:'#0e0e0e' } }}>
            <ArrowRightRounded />
          </IconButton>
        </Stack>
        <Grid container columnSpacing={0.5} rowSpacing={0.3}>
          {
            ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
            .map((day, index) => (
              <Grid key={index} item xs={1.71428571429}>
                <Box sx={{ backgroundColor:'#C7A76C', color:'#fff', paddingY:1 }}>
                  <Typography align='center'>{day}</Typography>
                </Box>
              </Grid>
            ))
          }
          {
            ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31']
            .map((date, index) => (
              <Grid key={index} item xs={1.71428571429}>
                <Box 
                  sx={{ 
                    backgroundColor: date === '3' ? '#293D4F' :
                    date === '10' ? '#293D4F' : 
                    date === '16' ? '#293D4F' :
                    date === '18' ? '#293D4F' :
                    date === '24' ? '#293D4F' :
                    date === '29' ? '#293D4F' : '#d9d9d9',
                    color: date === '3' ? '#fff' :
                    date === '10' ? '#fff' : 
                    date === '16' ? '#fff' :
                    date === '18' ? '#fff' :
                    date === '24' ? '#fff' :
                    date === '29' ? '#fff' : '#000',
                    height:135, 
                    paddingX:1, 
                    paddingY:0.8
                  }}
                >
                  <Typography align='right'>{date}</Typography>
                </Box>
              </Grid>
            ))
          }
        </Grid>
      </Grid>
    </Grid>
  )
}



export default SchedulePage
