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

import { Add, MoreVert, Dehaze } from '@mui/icons-material'

import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title, PointElement, LineElement, Filler } from 'chart.js';
import { Pie, Bar, Line } from 'react-chartjs-2';
import { faker } from '@faker-js/faker';

// ==============================|| DASHBOARD - DEFAULT ||============================== //

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title, PointElement, LineElement, Filler);
// const getRole = JSON.parse(localStorage.getItem('profile'))?.user?.role.name
// console.log(getRole)

const DashboardDefault = () => {
  // const [value, setValue] = useState('today')
  // const [slot, setSlot] = useState('week')

  const pieLabel = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11']

  const pieData = {
    datasets: [
      {
        data: pieLabel.map(() => faker.datatype.number({max:10, precision: 0.51})),
        backgroundColor: [
          'rgba(208,204,204,255)',
          'rgba(205,82,248,255)',
          'rgba(41,61,79,255)',
          'rgba(199,167,108,255)',
          'rgba(248,82,112,255)',
          'rgba(82,248,168,255)',
          'rgba(248,82,201,255)',
          'rgba(16,95,163,255)',
          'rgba(248,232,82,255)',
          'rgba(82,228,248,255)',
          'rgba(239,166,24,255)',
        ],
        borderColor:[
          'white',
        ],
        borderWidth:1
      }
    ]
  }

  const grantOption = {
    responsive: true,
    plugins: {
      legend: {
        // position: 'top' 
        display: false
      },
      title: {
        display:true,
        text:'Patent Grant by Month'
      }
    }
  }

  const grantLabels = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24']

  const grantData = {
    labels: grantLabels,
    datasets: [
      {
        data: grantLabels.map(() => faker.datatype.number({max:100})),
        backgroundColor:'rgba(222,105,26,255)'
      }
    ]
  }

  const [grant, setGrant] = useState('BYMONTH')

  const fillOption = {
    responsive: true,
    plugins: {
      legend: {
        // position: 'top' 
        display: false
      },
      title: {
        display:true,
        text:'Patent Fillings by Month'
      }
    }
  }

  const fillLabels = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24']

  const fillData = {
    labels: fillLabels,
    datasets: [
      {
        fill:false,
        data: fillLabels.map(() => faker.datatype.number({max:100})),
        borderColor: 'rgba(255,176,12,255)'
      }
    ]
  }

  const [fill, setFill] = useState('BYMONTH')

  // useEffect(() => {
  //     window.location.reload()
  // }, [])

  return (
    <Grid container>
      <Grid item xs={12} sm={12} md={12} lg={12}>
        <Grid container spacing={1}>
          <Grid item xs={6}>
            <Card sx={{ height:'40vh', padding:2, display:'flex', justifyContent:'center' }}>
              <Pie data={pieData} />
            </Card>
          </Grid>
          <Grid item xs={6}>
            <Card sx={{ height:'40vh', padding:2, display:'flex', justifyContent:'center' }}>
              <Stack 
                spacing={6}
                direction='row'
                sx={{ 
                  alignItems:'center'
                }}
              >
                <Stack spacing={1} sx={{ alignItems:'center' }}>
                  <Box 
                    sx={{ 
                      width:120,
                      height:120, 
                      borderRadius:'50%', 
                      backgroundColor:'#293D4F',
                      display:'flex',
                      alignItems:'center',
                      justifyContent:'center',
                      color:'#fff'
                    }}
                  >
                    <Typography sx={{ fontSize:'1.2rem' }}>17</Typography>
                  </Box>
                  <Typography>Total Overdue Tasks</Typography>
                </Stack>
                <Stack>
                  <Stack spacing={2} direction='row' alignItems='center'>
                    <img src={require('../../assets/images/cokocip_coklat.png')} />
                    <Typography sx={{ fontSize:'1rem' }}>9</Typography>
                  </Stack>
                  <Typography sx={{ fontSize:'0.8rem', marginY:0.6 }}>Final Dates</Typography>
                  <Stack spacing={2} direction='row' alignItems='center'>
                    <img src={require('../../assets/images/cokocip_kuning.png')} />
                    <Typography sx={{ fontSize:'1rem' }}>3</Typography>
                  </Stack>
                  <Typography sx={{ fontSize:'0.8rem', marginY:0.6 }}>Due Date</Typography>
                  <Stack spacing={2} direction='row' alignItems='center'>
                    <img src={require('../../assets/images/cokocip_ijo.png')} />
                    <Typography sx={{ fontSize:'1rem' }}>5</Typography>
                  </Stack>
                  <Typography sx={{ fontSize:'0.8rem', marginY:0.6 }}>Reminders</Typography>
                </Stack>
              </Stack>
            </Card>
          </Grid>
          <Grid item xs={6}>
            <Card >
              <Stack
                direction='row'
                sx={{ 
                  justifyContent:'space-between'
                }}
              >
                <Select
                  value={grant}
                  onChange={(e) => setGrant(e.target.value)}
                  size='small'
                >
                  <MenuItem value={'BYMONTH'}>@Patent Grant by Month</MenuItem>
                </Select>
                <Stack direction='row' spacing={1}>
                  <IconButton>
                    <Add />
                  </IconButton>
                  <IconButton>
                    <MoreVert />
                  </IconButton>
                  {/* <IconButton>
                    <Dehaze />
                  </IconButton> */}
                </Stack>
              </Stack>
              <Bar options={grantOption} data={grantData} />
            </Card>
          </Grid>
          <Grid item xs={6}>
            <Card>
             <Stack
                direction='row'
                sx={{ 
                  justifyContent:'space-between'
                }}
              >
                <Select
                  value={fill}
                  onChange={(e) => setFill(e.target.value)}
                  size='small'
                >
                  <MenuItem value={'BYMONTH'}>@Patent Fillings by Month</MenuItem>
                </Select>
                <Stack direction='row' spacing={1}>
                  <IconButton>
                    <Add />
                  </IconButton>
                  <IconButton>
                    <MoreVert />
                  </IconButton>
                  {/* <IconButton>
                    <Dehaze />
                  </IconButton> */}
                </Stack>
              </Stack>
              <Line options={fillOption} data={fillData} />
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}



export default DashboardDefault
