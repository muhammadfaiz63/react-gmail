import React, { useState, useEffect, useContext } from 'react'

// material-ui
import { Button, Stack, TextField, Alert, Grid, Box, Divider,Typography,ListItemButton,ListItemText,List,ListItem ,Checkbox } from '@mui/material'
import _ from 'lodash'
import axios from 'axios'
import MainCard from 'components/MainCard'
import { Link } from 'react-router-dom'

const EmailPage = () => {

  const [ listMessages, setListMessages ] = useState([])

  const [checked, setChecked] = React.useState([1]);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

 
  useEffect(() => {
    getListMessage()
  }, [])

  const getListMessage = () => {

    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'https://gmail.googleapis.com/gmail/v1/users/muhammadfaiz7130%40gmail.com/threads?key='+process.env.REACT_APP_API_KEY,
      headers: { 
        'Authorization': 'Bearer '+ localStorage.getItem('authtoken')
      }
    };


    axios.request(config).then(function (response) {
      console.log(response)
      setListMessages(response.data.threads)
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
                  secondaryAction={
                    <Checkbox
                      edge="end"
                      onChange={handleToggle(value.snippet)}
                      checked={checked.indexOf(value.snippet) !== -1}
                      inputProps={{ 'aria-labelledby': labelId }}
                    />
                  }
                  disablePadding
                >
                  <ListItemButton sx={{borderBottom:"1px solid #e0e0e0",py:1}} component={Link} to={'/app/email/'+value.id}>
                  <div dangerouslySetInnerHTML={{__html: value.snippet.replace(/\s/g,'').length > 157 ? value.snippet.slice(0,155) + "..." : value.snippet}} />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
      </MainCard>
    </>
  )
}

export default EmailPage
