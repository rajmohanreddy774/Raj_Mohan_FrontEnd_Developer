import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Grid,
  Box,
  InputLabel,
  MenuItem,
  Pagination,
  FormControl,
  Select,
  TextField,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers-pro";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import CapsuleCard from "./CapsuleCard";

const baseUrl = "http://localhost:3001";

const getAllCapsules = (payload) =>
  axios.post(`${baseUrl}/get-all-capsules`, payload);

const getPagesCount = () => axios.get(`${baseUrl}/get-all-capsules-count`);

const filterCapsules = (payload) =>
  axios.post(`${baseUrl}/get-filtered-capsules`, payload);

const getNextCapsules = (payload) =>
  axios.post(`${baseUrl}/get-next-capsules`, payload);

export default function Capsules() {
  const [type, setType] = useState([]);
  const [status, setStatus] = useState([]);
  const [capsules, setCapsules] = useState([]);
  const [pagesCount, setPagesCount] = useState(0);
  const [page, setPage] = React.useState(3);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedStatus, setSelectedStatus] = useState();
  const [selectedType, setSelectedType] = useState();
  const [selectedDate, setSelectedDate] = useState();

  const statusHandleChange = (e) => {
    setSelectedStatus(e.target.value);
  };

  const typeHandleChange = (e) => {
    setSelectedType(e.target.value);
  };
  const handleChange = (e, value) => {
    setCurrentPage(value);
    setPage(value !== 1 ? (value - 1) * 9 : 3);
  };

  const filterCapsules = async () => {
    try {
      const payload = {
        selectedStatus,
        selectedType,
        skip: page - 1,
        selectedDate,
      };
      const { data } = await filterCapsules(payload);
      setPagesCount(
        data.length / 9 === 0 ? data.length : Math.floor(data.length / 9) + 1
      );
      setCapsules(data);
    } catch (error) {}
  };

  useEffect(() => {
    (selectedStatus || selectedType) && filterCapsules();
  }, [selectedStatus, selectedType]);

  const fetchCapsules = async () => {
    try {
      const { data } = await getAllCapsules({ skip: page });
      setCapsules(data);
      let tempType = [];
      let tempStatus = [];
      data.map((e) => {
        tempType.push(e.type);
        tempStatus.push(e.status);
      });
      tempType = tempType.filter((v, i, a) => a.indexOf(v) === i);
      tempStatus = tempStatus.filter((v, i, a) => a.indexOf(v) === i);
      setType(tempType);
      setStatus(tempStatus);
    } catch (error) {
      console.log(error);
    }
  };

  const nextPagesCapsules = async () => {
    try {
      const payload = {
        selectedStatus,
        selectedDate,
        selectedType,
        skip: page,
      };

      const { data } = await getNextCapsules(payload);

      setCapsules(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    page !== 0 && nextPagesCapsules();
  }, [page]);

  const fetchPagesCount = async (req, res) => {
    const { data } = await getPagesCount();
    setPagesCount(data.count);
  };
  useEffect(() => {
    !pagesCount && fetchPagesCount();
    fetchCapsules();
  }, []);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <FormControl sx={{ m: 1, width: "200px" }}>
          <InputLabel id="demo-simple-select-autowidth-label">
            Status
          </InputLabel>
          <Select
            labelId="demo-simple-select-autowidth-label"
            id="demo-simple-select-autowidth"
            value={selectedStatus}
            onChange={statusHandleChange}
            autoWidth
            label="Select a status"
          >
            {status.map((e) => {
              return <MenuItem value={e}>{e}</MenuItem>;
            })}
          </Select>
        </FormControl>
        <FormControl sx={{ m: 1, width: "200px" }}>
          <InputLabel id="demo-simple-select-autowidth-label">Type</InputLabel>
          <Select
            labelId="demo-simple-select-autowidth-label"
            id="demo-simple-select-autowidth"
            value={selectedStatus}
            onChange={typeHandleChange}
            autoWidth
            label="Select a type"
          >
            {type.map((e) => {
              return <MenuItem value={e}>{e}</MenuItem>;
            })}
          </Select>
        </FormControl>
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <DatePicker
            sx={{ paddingTop: "20px" }}
            disableFuture
            label="By Date"
            openTo="year"
            views={["year", "month", "day"]}
            value={selectedDate}
            onChange={(newValue) => {
              setSelectedDate(newValue);
            }}
            onAccept={() => filterCapsules()}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
      </Box>
      <Box sx={{ paddingTop: "50px" }}>
        <Grid>
          <Grid container spacing={4}>
            {capsules.map((item) => (
              <Grid xs={12} sm={6} md={4}>
                <CapsuleCard item={item} />
              </Grid>
            ))}
            <Grid
              xs={12}
              sm={6}
              md={4}
              display="flex"
              justifyContent="center"
              alignItems="center"
            ></Grid>
          </Grid>
        </Grid>
      </Box>

      <Box
        style={{
          alignItems: "center",
          justifyItems: "center",
          marginLeft: "45%",
          bottom: "0",
        }}
      >
        <Pagination
          count={pagesCount}
          color="primary"
          onChange={handleChange}
          page={currentPage}
          size={"large"}
        />
      </Box>
    </>
  );
}
