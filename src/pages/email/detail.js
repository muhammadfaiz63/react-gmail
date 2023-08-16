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
      url: 'https://gmail.googleapis.com/gmail/v1/users/muhammadfaiz7130%40gmail.com/threads/'+id+'?key='+process.env.REACT_APP_API_KEY,
      headers: { 
        'Authorization': 'Bearer '+ localStorage.getItem('authtoken')
      }
    };
    axios.request(config).then(function (response) {
      console.log(response)
      setListMessages(response.data.messages)
    }).catch(err=>console.error(err));
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
                  <div style={{mb:1}}>from : {value.payload.headers[15]?.value}</div>
                  <div dangerouslySetInnerHTML={{__html: value.snippet}} />
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
