import React, { useState, useEffect, useContext } from 'react'

// material-ui
import { Button, Stack, TextField, Alert, Grid, Box, Divider,Typography,ListItemButton,ListItemText,List,ListItem ,Checkbox } from '@mui/material'
import _ from 'lodash'
import axios from 'axios'
import MainCard from 'components/MainCard'
import { useNavigate, useParams } from 'react-router-dom'

const EmailPage = () => {

  let { id } = useParams()
  const [ listMessages, setListMessages ] = useState([])

  let ignore = false
  useEffect(() => {
    if (!ignore) {
      if (id) {
        getListMessage(id)
      }
    }
  }, [ignore])

  const getListMessage = (id) => {
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'https://gmail.googleapis.com/gmail/v1/users/'+JSON.parse(localStorage.user)?.email+'/threads/'+id+'?key='+process.env.REACT_APP_API_KEY,
      headers: { 
        'Authorization': 'Bearer '+ localStorage.getItem('authtoken')
      }
    };
    axios.request(config).then(function (response) {
      console.log(response)
      setListMessages(response.data.messages)
    }).catch(err=>console.error(err));
  }

  
function getHeader(headers, index) {
  let header = '';

    headers.forEach(item => {
      if (item.name === index) {
        header = item.value;
      }
    });
    
    return header;
}

function getBody(message) {
  var encodedBody = '';
  if (typeof message.parts === 'undefined') {
      encodedBody = message.body.data;
  }
  else {
      encodedBody = getHTMLPart(message.parts);
  }
  encodedBody = encodedBody.replace(/-/g, '+').replace(/_/g, '/').replace(/\s/g, '');
  return decodeURIComponent(escape(window.atob(encodedBody)));
}

function getHTMLPart(arr) {
  for (var x = 0; x <= arr.length; x++) {
      if (typeof arr[x].parts === 'undefined') {
          if (arr[x].mimeType === 'text/html') {
              return arr[x].body.data;
          }
      }
      else {
          return getHTMLPart(arr[x].parts);
      }
  }
  return '';
}

  return (
    <>
      <MainCard
        title='Email'>
          <List dense sx={{ width: '100%', bgcolor: 'background.paper' }}>
            {listMessages.map((value) => {
              const labelId = `checkbox-list-secondary-label-${value.snippet}`;
              return (
                <ListItem
                  key={value.id}
                  disablePadding
                >
                  <div style={{borderBottom:"1px solid #e0e0e0",paddingTop:10,paddingBottom:10}}>
                  <div style={{mb:1}}>From : {getHeader(value.payload.headers,'From')} <br/> Date : {getHeader(value.payload.headers,'Date')}</div>
                  <Grid 
                  sx={{justifyContent:"center"}}>
                  <div dangerouslySetInnerHTML={{__html: getBody(value.payload)}} />
                  </Grid>
                  </div>
                </ListItem>
              );
            })}
          </List>
      </MainCard>
    </>
  )
}

export default EmailPage
