import React, { useEffect, useContext, useState, useRef } from "react";
import { Grid, Box, Stack, Typography, Button, TextField, IconButton } from "@mui/material";
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import logo from "../../../assets/images/icons/approval.png";
import { Link } from "react-router-dom";
import { TrademarkContext } from "../../../context/TrademarkContext";
import { AddAPhoto } from '@mui/icons-material'
import StaticVar from 'config/StaticVar'
import { styled } from '@mui/material/styles';
import SettingsIcon from '@mui/icons-material/Settings';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import VideoLabelIcon from '@mui/icons-material/VideoLabel';
import { DataGrid } from '@mui/x-data-grid';
import PropTypes from 'prop-types';
// component
import schema from "./validation";

// context
import { UploadContext } from 'context/index'
import { ArrowBackIosNew } from "@mui/icons-material";
function Form(props) {
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  let { id } = useParams();

  const trademarkContext = useContext(TrademarkContext);
  const { createTrademark } = trademarkContext;
  const { updateTrademark } = trademarkContext;
  const { getDetailTrademark } = trademarkContext;
  const { getTrademark } = trademarkContext;
  const [trademarkingEventDate, settrademarkingEventDate] = useState("");
  const navigate = useNavigate();
  const [photo, setPhoto] = useState('')
  const uploadedImage = useRef(null)
  const { uploadPhoto } = useContext(UploadContext)
  const [loadingUpload, setLoadingUpload] = useState(false)
  const [errUpload, setErrUpload] = useState(false)
  const createby = JSON.parse(localStorage.getItem('merk'))
  //stepper
  const steps = ['Tahap 1', 'Tahap 2', 'Tahap 3'];
  
  // context

  //colorlib
  const ColorlibStepIconRoot = styled('div')(({ theme, ownerState }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
    zIndex: 1,
    color: '#fff',
    width: 50,
    height: 50,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    ...(ownerState.active && {
      background:
        '#293D4F',
      boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
    }),
    ...(ownerState.completed && {
      background:
        '#293D4F',
    }),
  }));
  function ColorlibStepIcon(props) {
    const { active, completed, className } = props;
  
    const icons = {
      1: <SettingsIcon />,
      2: <GroupAddIcon />,
      3: <VideoLabelIcon />,
    };
  
    return (
      <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
        {icons[String(props.icon)]}
      </ColorlibStepIconRoot>
    );
  }
  
  ColorlibStepIcon.propTypes = {
    /**
     * Whether this step is active.
     * @default false
     */
    active: PropTypes.bool,
    className: PropTypes.string,
    /**
     * Mark the step as completed. Is passed to child components.
     * @default false
     */
    completed: PropTypes.bool,
    /**
     * The label displayed in the step icon.
     */
    icon: PropTypes.node,
  };
  const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
      top: 22,
    },
    [`&.${stepConnectorClasses.active}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        background:
        '#293D4F',
      },
    },
    [`&.${stepConnectorClasses.completed}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        background:
        '#293D4F',
      },
    },
    [`& .${stepConnectorClasses.line}`]: {
      height: 3,
      border: 0,
      backgroundColor:
        theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
      borderRadius: 1,
    },
  }));
  //endcolorlib
  // membuat tombol tambah
  const onSubmit = async () => {
    let values = getValues();

    let datasend = {
      ...values,
      trademarkingEvent: values.trademarkingEvent,
      referenceNumber: values.referenceNumber,
      recordType: values.recordType,
      title: values.title,
      description: values.description,
      country: values.country,
      client: values.client,
      status: values.status,
      email: values.email,
      trademarkingEventDate,
    };
    try {
      if (id !== "register") {
        await updateTrademark(id, datasend);
      } else {
        await createTrademark({ ...datasend });
      }
      await navigate(`/app/trademark`);
    } catch (err) {
      alert(err);
    }
  };

  const handleUpload = async (e) => {
    setLoadingUpload(true)
    try {
      let reader = new FileReader()
      let file = e.target.files[0]
      // setDocumentFile(file)
      reader.onloadend = async () => {
        const base64String = reader.result
          .replace('data:', '')
          .replace(/^.+,/, '')
        const dateNow = Date.now()
        const datapost = {
          rootfile: `repo/img/assets/${createby?._id}/`,
          filename: `asset-${dateNow}.png`,
          filedata: base64String,
        }

        let res = await uploadPhoto(datapost)
        setPhoto(res.data)
        setErrUpload(false)
      }
      reader.readAsDataURL(file)
      reader.onabort = () => {
        setLoadingUpload(false)
      }
    } catch (error) {
      alert(error)
      setErrUpload(true)
    } finally {
      setLoadingUpload(false)
    }
  }
  let ignore = false;
  useEffect(() => {
    if (!ignore) {
      if (id !== "register") {
        const fetctData = async () => {
          const editedrows = await getTrademark({ _id: id });
          const response = await editedrows.data[0];
          setValue("trademarkingEvent", response?.trademarkingEvent);
          setValue("referenceNumber", response?.referenceNumber);
          setValue("recordType", response?.recordType);
          setValue("title", response?.title);
          setValue("description", response?.description);
          setValue("country", response?.country);
          setValue("client", response?.client);
          setValue("status", response?.status);
          setValue("email", response?.email);
          settrademarkingEventDate(response?.trademarkingEventDate);
        };
        fetctData();
      }
      getDetailTrademark();
    }
  }, [ignore, register]);
//stepper
const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());

  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };
//end stepper
//Table Prioritas
const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'TanggalPrioritas', headerName: 'Tanggal Prioritas', width: 130 },
  { field: 'KantorMerek', headerName: 'Negara / Kantor Merek', width: 130 },
  { field: 'NoPrioritas', headerName: 'No Prioritas',type:'number', width: 130  },
 
 
];

const rows = [
  { id: 1, TanggalPrioritas: 'Snow', KantorMerek: 'Jon', NoPrioritas: 35 },
  { id: 2, TanggalPrioritas: 'Lannister', KantorMerek: 'Cersei', NoPrioritas: 42 },
  { id: 3, TanggalPrioritas: 'Lannister', KantorMerek: 'Jaime', NoPrioritas: 45 },
  { id: 4, TanggalPrioritas: 'Stark', KantorMerek: 'Arya', NoPrioritas: 16 },
 
];
//end Table Prioritas
  return (
    <>
    <Grid item xs={12} md={12}>
        <Stepper alternativeLabel activeStep={activeStep} connector={<ColorlibConnector />}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          if (isStepOptional(index)) {
            labelProps.optional = (
              <Typography></Typography>
            );
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label}>
            <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
          </Step>
          );
        })}
      </Stepper>
          </Grid>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mb: 4
        }}
      >
        <Grid container direction="row">
          <Grid item xs={4} sx={{ height: "70px" }}>
            <Stack direction="row" spacing={1} alignItems="center">
              <IconButton
                component={Link}
                to="/app/trademark"
                sx={{
                  fontSize: "0.2rem",
                  backgroundColor: "#2F80ED",
                  borderRadius: "100%",
                  "&:hover": {
                    backgroundColor: "primary.dark",
                    borderRadius: "100%",
                  },
                  color: "#fff",
                }}
              >
                <ArrowBackIosNew />
              </IconButton>
              <Typography sx={{ fontSize: "15px" }}>Previous</Typography>
            </Stack>
          </Grid>
          <Grid item xs={4} sx={{ height: "70px" }} justifyContent="center" align="center">
            <Box sx={{ display: "flex" }} justifyContent="center">
              
              <Typography sx={{ fontSize: "12px", color: "#555555" }}>{id !== "register" ? "Edit " : ""} <b>FORMULIR PERMOHONAN PENDAFTARAN MEREK INDONESIA</b> <br/>APPLICATION FORM OF INDONESIAN TRADEMARK REGISTRATION</Typography>
              
            </Box>
          </Grid>
          <Grid item xs={4} sx={{ display: "flex", justifyContent: "end", height: "70px" }}>
            <Box direction="column" sx={{ width: "20vw" }}></Box>
          </Grid>
        </Grid>
        
        {activeStep === 0 ? (
        <React.Fragment>
          
          <form onSubmit={handleSubmit(onSubmit)} id="my-form">   
          <Grid container>
                <Grid container spacing={1}>
                  <Grid item xs={12} md={5}>
                  <Typography sx={{fontSize:'15px'}}><b>Data Permohonan</b> <i>Application</i></Typography>
                  <br/>
                    <Typography >Nomor Transaksi <i style={{color:'grey',fontSize:'12px'}}>Numbers Of transaction</i></Typography>
                    <TextField
                      sx={{ backgroundColor: "#fff" }}
                      size={"small"}
                      placeholder={"IPT2023070235"}
                      fullWidth
                      {...register("NoTransaksi")}
                      error={errors?.NoTransaksi}
                      helperText={errors?.NoTransaksi && errors.NoTransaksi.message}
                    />
  
                   <Typography>Nomor Permohonan <i style={{color:'grey',fontSize:'12px'}}>Number of Application</i></Typography>
                    <TextField
                      sx={{ backgroundColor: "#fff" }}
                      size={"small"}
                      placeholder={"DID2023034654"}
                      fullWidth
                      {...register("NoPermohonan")}
                      error={errors?.NoPermohonan}
                      helperText={errors?.NoPermohonan && errors.NoPermohonan.message}
                    />
                    <Typography>Tanggal Penerimaan <i style={{color:'grey',fontSize:'12px'}}>Receipt Date</i></Typography>
                    <TextField sx={{ backgroundColor: "#fff" }} size={"small"} placeholder={"2023-05-02 16:20:49"} fullWidth {...register("TglPenerimaan")} error={errors?.TglPenerimaan} helperText={errors?.TglPenerimaan && errors.TglPenerimaan.message} />
                 
                    <Typography>Asal Permohonan <i style={{color:'grey',fontSize:'12px'}}>Office of Origin</i></Typography>
                    <TextField sx={{ backgroundColor: "#fff" }} size={"small"} placeholder={"Online Filing"} fullWidth {...register("AsalPermohonan")} error={errors?.AsalPermohonan} helperText={errors?.AsalPermohonan && errors.AsalPermohonan.message} />
                  
                    <Typography>Tipe Permohonan <i style={{color:'grey',fontSize:'12px'}}>Type of Application</i></Typography>
                    <TextField sx={{ backgroundColor: "#fff" }} size={"small"} placeholder={"Merek Dagang"} fullWidth {...register("TipePermohonan")} error={errors?.TipePermohonan} helperText={errors?.TipePermohonan && errors.TipePermohonan.message} />
                  
                    <Typography>Jenis Permohonan <i style={{color:'grey',fontSize:'12px'}}>Type of Application</i></Typography>
                    <TextField sx={{ backgroundColor: "#fff" }} size={"small"} placeholder={"Umum"} fullWidth {...register("JenisPerhononan")} error={errors?.JenisPerhononan} helperText={errors?.JenisPerhononan && errors.JenisPerhononan.message} />
                 </Grid>
                 <Grid item xs={12} md={1}></Grid>
                 <Grid item xs={12} md={3}>
                 <Typography sx={{fontSize:'15px'}}><b>Data Merek</b> <i>Description</i></Typography>
                 <br/>
                  <Typography >Nama Merek <i style={{color:'grey',fontSize:'12px'}}>Name Mark</i></Typography>
                    <TextField
                      sx={{ backgroundColor: "#fff" }}
                      size={"small"}
                      placeholder={"IPT2023070235"}
                      fullWidth
                      {...register("NoTransaksi")}
                      error={errors?.NoTransaksi}
                      helperText={errors?.NoTransaksi && errors.NoTransaksi.message}
                    />
  
                   <Typography>Tipe Merek <i style={{color:'grey',fontSize:'12px'}}>Type of Application</i></Typography>
                   <TextField
                  sx={{ backgroundColor: '#fff' }}
                  placeholder={'Alamat'}
                  rows={2}
                  multiline
                  fullWidth
                  {...register('address')}
                  error={errors?.address}
                  helperText={errors?.address && errors.address.message}
                />
                    <Typography>Deskripsi</Typography>
                    <TextField
                  sx={{ backgroundColor: '#fff' }}
                  placeholder={'Alamat'}
                  rows={2}
                  multiline
                  fullWidth
                  {...register('address')}
                  error={errors?.address}
                  helperText={errors?.address && errors.address.message}
                />
                    <Typography>Warna</Typography>
                    <TextField sx={{ backgroundColor: "#fff" }} size={"small"} placeholder={"Asal Permohonan"} fullWidth {...register("AsalPermohonan")} error={errors?.AsalPermohonan} helperText={errors?.AsalPermohonan && errors.AsalPermohonan.message} />
                  
                    <Typography>Terjemahan</Typography>
                    <TextField sx={{ backgroundColor: "#fff" }} size={"small"} placeholder={"Tipe Permohonan"} fullWidth {...register("TipePermohonan")} error={errors?.TipePermohonan} helperText={errors?.TipePermohonan && errors.TipePermohonan.message} />
                  
                 </Grid>
                 
                 <Grid item xs={12} md={3}>
                 <br/>
                 <br/>
                  <Typography >Etika Gambar/Label Merek <i style={{color:'grey',fontSize:'12px'}}>Receipt Date</i></Typography>
                  <Button
                      variant='contained'
                      position='absolute'
                      component='label'
                      fullWidth
                      sx={{
                        height: '35vh',
                        background: '#D9D9D9',
                        '&:hover': { background: '#D9D9D9' },
                        display: 'flex',
                        flexDirection: 'column',
                      }}>
                      {photo ? (
                        <img
                          src={StaticVar.API_SERVICES + '/upload/' + photo}
                          style={{
                            width: '100%',
                            height: '35vh',
                            objectFit: 'contain',
                          }}
                        />
                      ) : (
                        <>
                          <AddAPhoto sx={{ fontSize: '50px', color: '#293D4F' }} />
                          <Typography
                            sx={{
                              textAlign: 'center',
                              color: '#293D4F',
                              fontStyle: 'italic',
                            }}>
                            Unggah Foto
                          </Typography>
                        </>
                      )}
                      <input
                        type='file'
                        draggable='true'
                        hidden
                        accept='image/*'
                        ref={uploadedImage}
                        onChange={handleUpload}
                        onClick={(e) => (e.target.value = null)}
                      />
                    </Button>
  
                   <Typography>Transliterasi/Pengucapan <i style={{color:'grey',fontSize:'12px'}}>Transliteration</i></Typography>
                    <TextField
                      sx={{ backgroundColor: "#fff" }}
                      size={"small"}
                      placeholder={"-"}
                      fullWidth
                      {...register("NoPermohonan")}
                      error={errors?.NoPermohonan}
                      helperText={errors?.NoPermohonan && errors.NoPermohonan.message}
                    />
                    <Typography>Disclaimers <i style={{color:'grey',fontSize:'12px'}}>Disclaimers</i></Typography>
                    <TextField sx={{ backgroundColor: "#fff" }} size={"small"} placeholder={"-"} fullWidth {...register("TglPenerimaan")} error={errors?.TglPenerimaan} helperText={errors?.TglPenerimaan && errors.TglPenerimaan.message} />
                 
                </Grid>
                 
                </Grid>
            
              <Grid item xs={12}>
                <Grid container justifyContent="center" mt={4} spacing={2}>
                  <Button
                    variant={"outlined"}
                    size={"large"}
                    sx={{
                      width: "18vw",
                      mr: 2,
                    }}
                    component={Link}
                    to="/app/trademark"
                  >
                    Previous
                  </Button>
                  <Button
                    variant={"contained"}
                    size={"large"}
                    sx={{
                      width: "18vw",
                    }}
                    onClick={handleNext}
                    
                  >{activeStep === steps.length - 1 ? 'Finish' : 'NEXT'}
                    
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </form>
          
            
        </React.Fragment>
      ):activeStep === 1 ? (
        <React.Fragment>
          <form onSubmit={handleSubmit(onSubmit)} id="my-form">   
          <Grid container>
                <Grid container spacing={1}>
                  <Grid item xs={12} md={5} >
                  <Typography sx={{fontSize:'15px'}}><b>Data Permohonan</b> <i>Application</i></Typography>
                  <br/>
                    <Typography >Nama <i style={{color:'grey',fontSize:'12px'}}>Name</i></Typography>
                    <TextField
                      sx={{ backgroundColor: "#fff" }}
                      size={"small"}
                      placeholder={"Shenzhen Jusi Industrial Limited"}
                      fullWidth
                      {...register("Nama")}
                      error={errors?.Nama}
                      helperText={errors?.Nama && errors.Nama.message}
                    />
  
                   <Typography>Jenis Pemohon <i style={{color:'grey',fontSize:'12px'}}>Owner Type</i></Typography>
                    <TextField
                      sx={{ backgroundColor: "#fff" }}
                      size={"small"}
                      placeholder={"Badan Hukum"}
                      fullWidth
                      {...register("JenisPemohon")}
                      error={errors?.JenisPemohon}
                      helperText={errors?.JenisPemohon && errors.JenisPemohon.message}
                    />
                    <Typography>Kewarganegaraan <i style={{color:'grey',fontSize:'12px'}}>Nationality</i></Typography>
                    <TextField sx={{ backgroundColor: "#fff" }} size={"small"} placeholder={"China"} fullWidth {...register("Nasionality")} error={errors?.Nasionality} helperText={errors?.Nasionality && errors.Nasionality.message} />

                    <Typography>Alamat <i style={{color:'grey',fontSize:'12px'}}>address</i></Typography>
                    <TextField sx={{ backgroundColor: "#fff" }} size={"small"} placeholder={"Room 402, Building 2, Phoenix Garden, Baishixia Community, Fushui Street, Baoan District, Shenzhen"} fullWidth {...register("Alamat")} error={errors?.Alamat} helperText={errors?.Alamat && errors.Alamat.message} />

                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid item xs={6}>
                    <Typography>Kabupaten/Kota <i style={{color:'grey',fontSize:'12px'}}>City</i></Typography>
                    <TextField sx={{ backgroundColor: "#fff" }} size={"small"} placeholder={"Masukan Nama Kota"} fullWidth {...register("City")} error={errors?.City} helperText={errors?.City && errors.City.message} />               
                    </Grid>
                    <Grid item xs={6}>
                    <Typography>Kode Pos <i style={{color:'grey',fontSize:'12px'}}>Type of Zip Code</i></Typography>
                    <TextField sx={{ backgroundColor: "#fff" }} size={"small"} placeholder={"Masukan Kode Pos"} fullWidth {...register("ZipCode")} error={errors?.ZipCode} helperText={errors?.ZipCode && errors.ZipCode.message} />                  
                    </Grid>
                    <Grid item xs={6}>
                    <Typography>Provinsi <i style={{color:'grey',fontSize:'12px'}}>provinci</i></Typography>  
                    <TextField sx={{ backgroundColor: "#fff" }} size={"small"} placeholder={"Masukan Nama Provinsi"} fullWidth {...register("Provinci")} error={errors?.Provinci} helperText={errors?.Provinci && errors.Provinci.message} />                
                    </Grid>
                    <Grid item xs={6}>
                    <Typography>Negara <i style={{color:'grey',fontSize:'12px'}}>Country</i></Typography>
                    <TextField sx={{ backgroundColor: "#fff" }} size={"small"} placeholder={"China"} fullWidth {...register("Country")} error={errors?.Country} helperText={errors?.Country && errors.Country.message} />                
                    </Grid>
                  </Grid>
                  <Typography>Telepon <i style={{color:'grey',fontSize:'12px'}}>Phone</i></Typography>
                    <TextField sx={{ backgroundColor: "#fff" }} size={"small"} placeholder={"02183793812"} fullWidth {...register("Phone")} error={errors?.Phone} helperText={errors?.Phone && errors.Phone.message} />
                   
                    <Typography>Surel <i style={{color:'grey',fontSize:'12px'}}>Email</i></Typography>
                    <TextField sx={{ backgroundColor: "#fff" }} size={"small"} placeholder={"emirsyah.dinar@affa.co.id"} fullWidth {...register("Email")} error={errors?.Email} helperText={errors?.Email && errors.Email.message} />
                   
                 </Grid>
                 <Grid item xs={12} md={1}></Grid>
                 <Grid item xs={12} md={6}>
                 
                 <Typography><b>Data Kuasa</b> <i>Representative/IP Consultant</i></Typography>
                 <br/>
                 <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid item xs={6}>
                    <Typography>Nama Konsultan <i style={{color:'grey',fontSize:'12px'}}>Consultant Name</i></Typography>
                    <TextField sx={{ backgroundColor: "#fff" }} size={"small"} placeholder={"Emirsyah Dinar"} fullWidth {...register("ConsultantName")} error={errors?.ConsultantName} helperText={errors?.ConsultantName && errors.ConsultantName.message} />               
                    </Grid>
                    <Grid item xs={6}>
                    <Typography>No Konsultan <i style={{color:'grey',fontSize:'12px'}}>Number of Consultant</i></Typography>
                    <TextField sx={{ backgroundColor: "#fff" }} size={"small"} placeholder={"0824-2015"} fullWidth {...register("NoConsultant")} error={errors?.NoConsultant} helperText={errors?.NoConsultant && errors.NoConsultant.message} />                  
                    </Grid>
                    
                  </Grid>
                  <Typography >Nama Kantor <i style={{color:'grey',fontSize:'12px'}}>Office Name</i></Typography>
                    <TextField
                      sx={{ backgroundColor: "#fff" }}
                      size={"small"}
                      placeholder={"AFFA Intellectual Property Rights"}
                      fullWidth
                      {...register("OfficeName")}
                      error={errors?.OfficeName}
                      helperText={errors?.OfficeName && errors.OfficeName.message}
                    />
  
                   <Typography>Alamat  <i style={{color:'grey',fontSize:'12px'}}>Address</i></Typography>
                   <TextField
                  sx={{ backgroundColor: '#fff' }}
                  placeholder={'Gedung Graha Pratama Lantai 15 Jalan MT. Haryono Kavling 15'}
                  rows={2}
                  multiline
                  fullWidth
                  {...register('addressKuasa')}
                  error={errors?.addressKuasa}
                  helperText={errors?.addressKuasa && errors.addressKuasa.message}
                />
                    <Typography>Telp/Fax <i style={{color:'grey',fontSize:'12px'}}>Phone</i></Typography>
                    <TextField sx={{ backgroundColor: "#fff" }} size={"small"} placeholder={"087887247966"} fullWidth {...register("PhoneKuasa")} error={errors?.PhoneKuasa} helperText={errors?.PhoneKuasa && errors.PhoneKuasa.message} />
                  
                    <Typography>Surel <i style={{color:'grey',fontSize:'12px'}}>Email</i></Typography>
                    <TextField sx={{ backgroundColor: "#fff" }} size={"small"} placeholder={"emirsyah.dinar@affa.co.id"} fullWidth {...register("EmailKuasa")} error={errors?.EmailKuasa} helperText={errors?.EmailKuasa && errors.EmailKuasa.message} />
                  
                 </Grid>
                 <Grid item xs={12} md={6}>
                 <br/>
                 <Typography sx={{fontSize:'15px'}}><b>Alamat Surat Menyurat</b> <i>Mailing Address</i></Typography>
                 <br/>
                 <Typography>Alamat <i style={{color:'grey',fontSize:'12px'}}>Address</i></Typography>
                    <TextField
                  sx={{ backgroundColor: '#fff' }}
                  placeholder={'Masukan Alamat'}
                  rows={2}
                  multiline
                  fullWidth
                  {...register('addressSurat')}
                  error={errors?.addressSurat}
                  helperText={errors?.addressSurat && errors.addressSurat.message}
                />
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid item xs={6}>
                    <Typography>Kabupaten/Kota <i style={{color:'grey',fontSize:'12px'}}>City</i></Typography>
                    <TextField sx={{ backgroundColor: "#fff" }} size={"small"} placeholder={"Masukan Nama Kota"} fullWidth {...register("CitySurat")} error={errors?.CitySurat} helperText={errors?.CitySurat && errors.CitySurat.message} />               
                    </Grid>
                    <Grid item xs={6}>
                    <Typography>Kode Pos <i style={{color:'grey',fontSize:'12px'}}>Zip Code</i></Typography>
                    <TextField sx={{ backgroundColor: "#fff" }} size={"small"} placeholder={"Masukan Kode pos "} fullWidth {...register("ZipcodeSurat")} error={errors?.ZipcodeSurat} helperText={errors?.ZipcodeSurat && errors.ZipcodeSurat.message} />                  
                    </Grid>
                    <Grid item xs={6}>
                    <Typography>Provinsi <i style={{color:'grey',fontSize:'12px'}}>Province</i></Typography>
                    <TextField sx={{ backgroundColor: "#fff" }} size={"small"} placeholder={"Masukan Nama Provinsi"} fullWidth {...register("ProvinceSurat")} error={errors?.ProvinceSurat} helperText={errors?.ProvinceSurat && errors.ProvinceSurat.message} />                  
                    </Grid>
                    <Grid item xs={6}>
                    <Typography>Negara <i style={{color:'grey',fontSize:'12px'}}>Country</i></Typography>
                    <TextField sx={{ backgroundColor: "#fff" }} size={"small"} placeholder={"Masukan Nama Negara"} fullWidth {...register("CountrySurat")} error={errors?.CountrySurat} helperText={errors?.CountrySurat && errors.CountrySurat.message} />                  
                    </Grid>
                    
                  </Grid>
                  <Typography>Telp/Fax <i style={{color:'grey',fontSize:'12px'}}>Phone</i></Typography>
                    <TextField sx={{ backgroundColor: "#fff" }} size={"small"} placeholder={"Masukan nomor Telp"} fullWidth {...register("PhoneSurat")} error={errors?.PhoneSurat} helperText={errors?.PhoneSurat && errors.PhoneSurat.message} />
                  
                    <Typography>Surel <i style={{color:'grey',fontSize:'12px'}}>Email</i></Typography>
                    <TextField sx={{ backgroundColor: "#fff" }} size={"small"} placeholder={"Masukan Email"} fullWidth {...register("EmailSurat")} error={errors?.EmailSurat} helperText={errors?.EmailSurat && errors.EmailSurat.message} />
                  
                 </Grid>
                </Grid>
            
              <Grid item xs={12}>
                <Grid container justifyContent="center" mt={4} spacing={2}>
                  <Button
                    variant={"outlined"}
                    size={"large"}
                    sx={{
                      width: "18vw",
                      mr: 2,
                    }}
                    onClick={handleBack}
                  >
                    Previous
                  </Button>
                  <Button
                    variant={"contained"}
                    size={"large"}
                    sx={{
                      width: "18vw",
                    }}
                    onClick={handleNext}
                    
                  >{activeStep === steps.length - 1 ? 'Finish' : 'NEXT'}
                    
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </form>
            
        </React.Fragment>
      ):activeStep === 2 ? (
        <React.Fragment>
          <form onSubmit={handleSubmit(onSubmit)} id="my-form">   
          <Grid container>
                <Grid container spacing={1}>
                  <Grid item xs={12} md={5}>
                  <Typography><b>Data Prioritas </b> <i>Prioritas Data</i></Typography>
                  <div style={{ height: 400, width: '100%' }}>
                  <DataGrid
                    rows={rows}
                    columns={columns}
                    
                    initialState={{
                      pagination: {
                        paginationModel: { page: 0, pageSize: 5 },
                      },
                    }}
                    pageSizeOptions={[5, 10]}
                    checkboxSelection
                  />
                </div>
                    </Grid>
                 <Grid item xs={12} md={1}></Grid>
                 <Grid item xs={12} md={6}>
                 <Typography><b>Data Kuasa</b> <i>Representative/IP Consultant</i></Typography>
                  <Typography >Nama Kantor <i style={{color:'grey',fontSize:'12px'}}>Office Name</i></Typography>
                    <TextField
                      sx={{ backgroundColor: "#fff" }}
                      size={"small"}
                      placeholder={"AFFA Intellectual Property Rights"}
                      fullWidth
                      {...register("OfficeName")}
                      error={errors?.OfficeName}
                      helperText={errors?.OfficeName && errors.OfficeName.message}
                    />
  
                   <Typography>Alamat  <i style={{color:'grey',fontSize:'12px'}}>Type of Application</i></Typography>
                   <TextField
                  sx={{ backgroundColor: '#fff' }}
                  placeholder={'Gedung Graha Pratama Lantai 15 Jalan MT. Haryono Kavling 15'}
                  rows={2}
                  multiline
                  fullWidth
                  {...register('addressKuasa')}
                  error={errors?.addressKuasa}
                  helperText={errors?.addressKuasa && errors.addressKuasa.message}
                />
                    <Typography>Deskripsi</Typography>
                    <TextField
                  sx={{ backgroundColor: '#fff' }}
                  placeholder={'Alamat'}
                  rows={2}
                  multiline
                  fullWidth
                  {...register('address')}
                  error={errors?.address}
                  helperText={errors?.address && errors.address.message}
                />
                    <Typography>Telp/Fax <i style={{color:'grey',fontSize:'12px'}}>Phone</i></Typography>
                    <TextField sx={{ backgroundColor: "#fff" }} size={"small"} placeholder={"087887247966"} fullWidth {...register("PhoneKuasa")} error={errors?.PhoneKuasa} helperText={errors?.PhoneKuasa && errors.PhoneKuasa.message} />
                  
                    <Typography>Surel <i style={{color:'grey',fontSize:'12px'}}>Email</i></Typography>
                    <TextField sx={{ backgroundColor: "#fff" }} size={"small"} placeholder={"emirsyah.dinar@affa.co.id"} fullWidth {...register("EmailKuasa")} error={errors?.EmailKuasa} helperText={errors?.EmailKuasa && errors.EmailKuasa.message} />
                  
                 </Grid>
                 
                 
                 
                </Grid>
            
              <Grid item xs={12}>
                <Grid container justifyContent="center" mt={4} spacing={2}>
                  <Button
                    variant={"outlined"}
                    size={"large"}
                    sx={{
                      width: "18vw",
                      mr: 2,
                    }}
                    onClick={handleBack}
                  >
                    Previous
                  </Button>
                  <Button
                    variant={"contained"}
                    size={"large"}
                    sx={{
                      width: "18vw",
                    }}
                    onClick={handleNext}
                    
                  >{activeStep === steps.length - 1 ? 'Finish' : 'NEXT'}
                    
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </form>
        </React.Fragment>
      ):activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            Kamu Sudah Menyelesaikan Fomulir Ini
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <Grid item xs={12}>
                <Grid container justifyContent="center" mt={4} spacing={2}>
                  
                  <Button
                    variant={"contained"}
                    size={"large"}
                    sx={{
                      width: "18vw",
                    }}
                    onClick={onSubmit}
                    
                  >Menu
                    
                  </Button>
                </Grid>
              </Grid>
            
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />
            {isStepOptional(activeStep) && (
              <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                Skip
              </Button>
            )}

            <Button onClick={handleNext}>
              {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
            </Button>
          </Box>
        </React.Fragment>
      )}
        
        
      </Box>
    </>
  );
}

export default Form;
