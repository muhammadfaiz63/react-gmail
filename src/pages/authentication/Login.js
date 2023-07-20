// import { Link } from 'react-router-dom';

// material-ui
import { Grid, Box, Typography, Card } from '@mui/material'

// logo
import Logo from '../../assets/logo/logo-black.png'

// project import
import AuthLogin from './auth-forms/AuthLogin'

// ================================|| LOGIN ||================================ //

const Login = () => (
  <Grid container sx={{  height:'100vh' }}>
    <Grid item xs={3.5}>
    </Grid>
    <Grid item xs={5} sx={{ display:'flex', alignItems:'center', justifyContent:'center' }} >
      {/* <Card>
        <Stack>
          <AuthLogin />
        </Stack>
      </Card> */}
      <Card
        sx={{  
          width:'100%',
          borderRadius:0
        }}
      >
        <Box
          sx={{  
            backgroundColor:'#293D4F',
            paddingY:2,
            display:'flex',
            justifyContent:'center'
          }}
        >
          <img src={require('../../assets/images/affa-logo.png')} style={{ width:120 }} />
        </Box>
        <Box
          sx={{  
            paddingY:2
          }}
        >
          <AuthLogin />
        </Box>
      </Card>
    </Grid>
    <Grid item xs={3.5}></Grid>
  </Grid>
)

export default Login
