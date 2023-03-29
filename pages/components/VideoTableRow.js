import React from "react";
import PropTypes from "prop-types";
import numeral from "numeral";
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

const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
    row: {
      '&:nth-of-type(odd)': {
        backgroundColor: '#f5f5f5',
      },
    },
  });

const VideoTableRow = ({ video }) => {
  const { id, title, thumbnailUrl, channelTitle, publishDate, views, subscribers } = video;
  return (
    <TableRow key={id}>
      <TableCell>
        <img src={thumbnailUrl} alt={title} />
      </TableCell>
      <TableCell className={useStyles().cell}>{title}</TableCell>
      <TableCell className={useStyles().cell}>{channelTitle}</TableCell>
      <TableCell className={useStyles().cell}>{new Date(publishDate).toLocaleDateString()}</TableCell>
      <TableCell className={useStyles().cell}>{numeral(views).format("0,0")}</TableCell>
      <TableCell className={useStyles().cell}>{numeral(subscribers).format("0,0")}</TableCell>
    </TableRow>
  );
};

VideoTableRow.propTypes = {
  video: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    thumbnailUrl: PropTypes.string.isRequired,
    channelTitle: PropTypes.string.isRequired,
    publishDate: PropTypes.string.isRequired,
    views: PropTypes.number.isRequired,
    subscribers: PropTypes.number.isRequired,
  }).isRequired,
};

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
    <TableRow key={video.id} className={classes.row}>
      <TableCell>
        <img src={video.thumbnailUrl} alt={video.title} />
      </TableCell>
      <TableCell align="center">{video.title}</TableCell>
      <TableCell align="center">{video.channelTitle}</TableCell>
      <TableCell align="center">
        {new Date(video.publishDate).toLocaleDateString()}
      </TableCell>
      <TableCell align="center">
        {numeral(video.views).format("0,0")}
      </TableCell>
      <TableCell align="center">
        {numeral(video.subscribers).format("0,0")}
      </TableCell>
    </TableRow>
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
      views: PropTypes.number.isRequired,
      subscribers: PropTypes.number.isRequired,
    })
  ),
};

export default VideoTable;
