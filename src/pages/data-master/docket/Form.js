import React, { useEffect, useContext, useState } from "react";
import { Grid, Box, Stack, Typography, Button, TextField, IconButton } from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import logo from "../../../assets/images/icons/approval.png";
import { Link } from "react-router-dom";
import { DocketContext } from "context";
// component
import schema from "./validation";

// context
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

  const docketContext = useContext(DocketContext);
  const { createDocket } = docketContext;
  const { updateDocket } = docketContext;
  const { getDetailDocket } = docketContext;
  const { getDocket } = docketContext;
  const [docketingEventDate, setDocketingEventDate] = useState("");
  const navigate = useNavigate();
  // context

  // membuat tombol tambah
  const onSubmit = async () => {
    let values = getValues();

    let datasend = {
      ...values,
      docketingEvent: values.docketingEvent,
      referenceNumber: values.referenceNumber,
      recordType: values.recordType,
      title: values.title,
      description: values.description,
      country: values.country,
      client: values.client,
      status: values.status,
      email: values.email,
      docketingEventDate,
    };
    try {
      if (id !== "register") {
        await updateDocket(id, datasend);
      } else {
        await createDocket({ ...datasend });
      }
      await navigate(`/app/docket`);
    } catch (err) {
      alert(err);
    }
  };

  let ignore = false;
  useEffect(() => {
    if (!ignore) {
      if (id !== "register") {
        const fetctData = async () => {
          const editedrows = await getDocket({ _id: id });
          const response = await editedrows.data[0];
          setValue("docketingEvent", response?.docketingEvent);
          setValue("referenceNumber", response?.referenceNumber);
          setValue("recordType", response?.recordType);
          setValue("title", response?.title);
          setValue("description", response?.description);
          setValue("country", response?.country);
          setValue("client", response?.client);
          setValue("status", response?.status);
          setValue("email", response?.email);
          setDocketingEventDate(response?.docketingEventDate);
        };
        fetctData();
      }
      getDetailDocket();
    }
  }, [ignore, register]);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mb: 4,
        }}
      >
        <Grid container direction="row">
          <Grid item xs={4} sx={{ height: "70px" }}>
            <Stack direction="row" spacing={1} alignItems="center">
              <IconButton
                component={Link}
                to="/app/docket"
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
              <Typography sx={{ fontSize: "15px" }}>Kembali</Typography>
            </Stack>
          </Grid>
          <Grid item xs={4} sx={{ height: "70px" }} justifyContent="center" align="center">
            <Box sx={{ display: "flex" }} justifyContent="center">
              <Box component={"img"} src={logo} sx={{ width: "50px" }} />
              <Typography sx={{ fontSize: "30px", color: "#555555" }}>{id !== "register" ? "Edit " : "Tambahkan "} Docket</Typography>
            </Box>
          </Grid>
          <Grid item xs={4} sx={{ display: "flex", justifyContent: "end", height: "70px" }}>
            <Box direction="column" sx={{ width: "20vw" }}></Box>
          </Grid>
        </Grid>
        <form onSubmit={handleSubmit(onSubmit)} id="my-form">
          <Grid container>
            <Grid item xs={12} mt={2}>
              <Grid container spacing={1}>
                <Grid item xs={12} md={6}>
                  <Typography>Docket Event</Typography>
                  <TextField
                    sx={{ backgroundColor: "#fff" }}
                    size={"small"}
                    placeholder={"Docket Event"}
                    fullWidth
                    {...register("docketingEvent")}
                    error={errors?.docketingEvent}
                    helperText={errors?.docketingEvent && errors.docketingEvent.message}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <div style={{ marginBottom: 10 }}>
                    <Typography>Docket Date Event</Typography>
                    <TextField
                      type="Date"
                      sx={{ backgroundColor: "#fff" }}
                      size={"small"}
                      placeholder={"Tanggal Lahir"}
                      fullWidth
                      value={docketingEventDate}
                      onChange={(e) => {
                        setDocketingEventDate(e.target.value);
                      }}
                    />
                  </div>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} mt={2}>
              <Grid container spacing={1}>
                <Grid item xs={12} md={6}>
                  <Typography>Referance Number</Typography>
                  <TextField
                    sx={{ backgroundColor: "#fff" }}
                    size={"small"}
                    placeholder={"Referance Number"}
                    fullWidth
                    {...register("referenceNumber")}
                    error={errors?.referenceNumber}
                    helperText={errors?.referenceNumber && errors.referenceNumber.message}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography>Record Type</Typography>
                  <TextField sx={{ backgroundColor: "#fff" }} size={"small"} placeholder={"Record Type"} fullWidth {...register("recordType")} error={errors?.recordType} helperText={errors?.recordType && errors.recordType.message} />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} mt={2}>
              <Grid container spacing={1}>
                <Grid item xs={12} md={6}>
                  <Typography>Title</Typography>
                  <TextField sx={{ backgroundColor: "#fff" }} size={"small"} placeholder={"Title"} fullWidth {...register("title")} error={errors?.title} helperText={errors?.title && errors.title.message} />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography>Description</Typography>
                  <TextField sx={{ backgroundColor: "#fff" }} size={"small"} placeholder={"Description"} fullWidth {...register("description")} error={errors?.description} helperText={errors?.description && errors.description.message} />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} mt={2}>
              <Grid container spacing={1}>
                <Grid item xs={12} md={6}>
                  <Typography>Country</Typography>
                  <TextField sx={{ backgroundColor: "#fff" }} size={"small"} placeholder={"Country"} fullWidth {...register("country")} error={errors?.country} helperText={errors?.country && errors.country.message} />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography>Client</Typography>
                  <TextField sx={{ backgroundColor: "#fff" }} size={"small"} placeholder={"Client"} fullWidth {...register("client")} error={errors?.client} helperText={errors?.client && errors.client.message} />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} mt={2}>
              <Grid container spacing={1}>
                <Grid item xs={12} md={6}>
                  <Typography>Status</Typography>
                  <TextField sx={{ backgroundColor: "#fff" }} size={"small"} placeholder={"Status"} fullWidth {...register("status")} error={errors?.status} helperText={errors?.status && errors.status.message} />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography>Email</Typography>
                  <TextField sx={{ backgroundColor: "#fff" }} size={"small"} placeholder={"Email"} fullWidth {...register("email")} error={errors?.email} helperText={errors?.email && errors.email.message} />
                </Grid>
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
                  to="/app/docket"
                >
                  Kembali
                </Button>
                <Button
                  variant={"contained"}
                  size={"large"}
                  sx={{
                    width: "18vw",
                  }}
                  onClick={onSubmit}
                  // type="submit"
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </Box>
    </>
  );
}

export default Form;
