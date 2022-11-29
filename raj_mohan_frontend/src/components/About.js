import { Box, Typography } from "@mui/material";
import moment from "moment";
const About = ({ item }) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 700,
    bgcolor: "#b5ebda",
    boxShadow: 24,
    p: 4,
  };
  return (
    <Box sx={style}>
      <Typography id="modal-modal-title" variant="h6" component="h2">
        {item.capsule_serial}
      </Typography>
      <Typography id="modal-modal-description" sx={{ mt: 5 }}>
        Launch at: {moment(item.original_launch).format("YYYY-MM-DD")}
      </Typography>
      <Typography id="modal-modal-title" variant="h6" component="h2">
        {item.missions.map((e) => {
          return (
            <Typography id="modal-modal-description">Name: {e.name}</Typography>
          );
        })}
      </Typography>
      <Typography id="modal-modal-description" sx={{ mt: 5 }}>
        Description: {item.details}
      </Typography>
      <Typography id="modal-modal-description" sx={{ mt: 5 }}>
        Type: {item.type}
      </Typography>
      <Typography id="modal-modal-description" sx={{ mt: 5 }}>
        Landings: {item.landings}
      </Typography>
    </Box>
  );
};

export default About;
