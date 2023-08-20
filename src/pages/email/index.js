import React, { useState, useEffect, useContext } from 'react'

// material-ui
import { Button, Stack, TextField,IconButton , Alert, Grid, Box, Divider,Typography,ListItemButton,ListItemText,List,ListItem ,Checkbox } from '@mui/material'
import _ from 'lodash'
import axios from 'axios'
import { Delete as DeleteIcon } from '@mui/icons-material';
import MainCard from 'components/MainCard'
import { Link } from 'react-router-dom'
import FormDialog from 'components/dialogs/FormDialog';
import ContentEditor from "components/contentEditor"

const EmailPage = () => {

  const [ listMessages, setListMessages ] = useState([])

  const [checked, setChecked] = useState([]);
  const [open, setOpen] = useState(false);
  const [newMessage, setNewMessage] = useState(false);
  const [idTo, setIdTo] = useState("");
  const [subject, setSubject] = useState("");

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
      url: 'https://gmail.googleapis.com/gmail/v1/users/'+JSON.parse(localStorage.user)?.email+'/threads?key='+process.env.REACT_APP_API_KEY,
      headers: { 
        'Authorization': 'Bearer '+ localStorage.getItem('authtoken')
      }
    };


    axios.request(config).then(function (response) {
      console.log(response)
      setListMessages(response.data.threads)
    }).catch(err=>console.error(err));
  }

  const deleteBatch = () => {
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://gmail.googleapis.com/gmail/v1/users/'+JSON.parse(localStorage.user)?.email+'/messages/batchDelete?key='+process.env.REACT_APP_API_KEY,
      data:{
        "ids": checked
      },
      headers: { 
        'Authorization': 'Bearer '+ localStorage.getItem('authtoken')
      }
    };

    axios.request(config).then(function (response) {
      console.log(response)
      alert("data berhasil di hapus")
      const deletedMessage = listMessages.filter(message => !checked.includes(message.id))
      setListMessages(deletedMessage)
    }).catch(err=>alert(err));
  }
  const sendEmail = () => {
    sendMessage(
      {
        'To': idTo,
        'Subject': subject
      },
      `${newMessage}`,
    );

    return false;
  };

  // const composeTidy = () => {
  //   setComposeModalVisible(false);
  //   setComposeTo('');
  //   setComposeSubject('');
  //   setComposeMessage('');

  //   setSendButtonDisabled(false);
  // };

  // const sendReply = () => {
  //   setReplyButtonDisabled(true);

  //   sendMessage(
  //     {
  //       'To': replyTo,
  //       'Subject': replySubject,
  //       'In-Reply-To': replyMessageId
  //     },
  //     replyMessage,
  //     replyTidy
  //   );

  //   return false;
  // };

  // const replyTidy = () => {
  //   setReplyModalVisible(false);
  //   setReplyMessage('');

  //   setReplyButtonDisabled(false);
  // };

  // const fillInReply = (to, subject, message_id) => {
  //   setReplyTo(to);
  //   setReplySubject(subject);
  //   setReplyMessageId(message_id);
  // };

  const sendMessage = (headers_obj, message) => {
    let email = '';

    for (const header in headers_obj) {
      email += `${header}: ${headers_obj[header]}\r\n`;
    }

    email += `\r\n${message}`;

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://gmail.googleapis.com/gmail/v1/users/'+JSON.parse(localStorage.user)?.email+'/messages/send?key='+process.env.REACT_APP_API_KEY,
      data:{
        'raw': window.btoa(email).replace(/\+/g, '-').replace(/\//g, '_')
      },
      headers: { 
        'Authorization': 'Bearer '+ localStorage.getItem('authtoken')
      }
    };

    axios.request(config).then(function (response) {
      alert("data berhasil di kirim")
      setOpen(false)
    }).catch(err=>alert(err));
  };

  return (
    <>
      <MainCard
        title='Email'>
          <List dense sx={{ width: '100%', bgcolor: 'background.paper' }}>
            <Grid container justifyContent="space-between" sx={{padding:1,bottomPadding:3}}>
            <Button variant="contained" color="primary" onClick={()=>setOpen(true)}>Compose</Button>
            <IconButton onClick={deleteBatch}><DeleteIcon/></IconButton>
            </Grid>
            {listMessages.map((value) => {
              const labelId = `checkbox-list-secondary-label-${value.snippet}`;
              return (
                <ListItem
                  key={value.id}
                  secondaryAction={
                    <Checkbox
                      edge="end"
                      onChange={handleToggle(value.id)}
                      checked={checked.indexOf(value.id) !== -1}
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
      <FormDialog open={open}
			onClose={()=>setOpen(false)}
      title="New Message"
      minWidth="md"
      maxWidth="md"
      content={
        <div style={{width:600}}>
          <TextField
            placeholder="Recipients"
            value={idTo}
            fullWidth
            onChange={(e)=>setIdTo(e.target.value)}
            sx={{mb:1}}
          />
          <TextField
            placeholder="Subject"
            value={subject}
            fullWidth
            onChange={(e)=>setSubject(e.target.value)}
            sx={{mb:1}}
          />
          <ContentEditor
              handleChange={(event, editor) =>
                  setNewMessage(editor.getData())
              }
              value={newMessage}
          />
        </div>
      }
      actions={
        <Grid container justifyContent="flex-end" sx={{pr:2,pb:2}}>
          <Button variant="contained" sx={{border:"2px solid #293D4F",backgroundColor:"#fff",color:"#293D4F",mr:2}} onClick={()=>setOpen(false)}>Batalkan</Button>
          <Button color="primary" variant="contained" sx={{width:80}} onClick={sendEmail}>Kirim</Button>
        </Grid>
      }
      ></FormDialog>
    </>
  )
}

export default EmailPage
