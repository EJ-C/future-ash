import React from "react";
import numeral from "numeral";
import PropTypes from 'prop-types';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import VideoTableRow from "./VideoTableRow";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  row: {
    "&:nth-of-type(odd)": {
      backgroundColor: "#f5f5f5",
    },
  },
  cell: {
    textAlign: "center",
  },
});

const VideoTable = ({ videos }) => {
  const classes = useStyles();

  if (!videos || videos.length === 0) {
    return null;
  }

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Thumbnails</TableCell>
            <TableCell className={classes.cell}>Title</TableCell>
            <TableCell className={classes.cell}>Channel</TableCell>
            <TableCell className={classes.cell}>Published Date</TableCell>
            <TableCell className={classes.cell}>Views</TableCell>
            <TableCell className={classes.cell}>Subscribers</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {videos.map((video) => (
            <VideoTableRow key={video.id} video={video} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

VideoTable.propTypes = {
  videos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      thumbnailUrl: PropTypes.string.isRequired,
      channelTitle: PropTypes.string.isRequired,
      publishDate: PropTypes.string.isRequired,
      views: PropTypes.number.daisRequired,
      subscribers: PropTypes.number.isRequired,
      videoUrl: PropTypes.string.isRequired,
    })
  ),
};

export default VideoTable;