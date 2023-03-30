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
    "&:nth-of-type(odd)": {
      backgroundColor: "#f5f5f5",
    },
  },
  cell: {
    textAlign: "center",
  },
});

const VideoTableRow = ({ video }) => {
  const { id, title, thumbnailUrl, channelTitle, publishDate, views, subscribers, videoUrl } = video;
  const handleThumbnailClick = () => {
    window.location.href = videoUrl;
  };
  return (
    <TableRow key={id}>
      <TableCell>
          <img src={thumbnailUrl} alt={title} width="350" onClick={handleThumbnailClick} style={{ cursor: "pointer" }}/>
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
    videoUrl: PropTypes.string.isRequired,
  }).isRequired,
};



export default VideoTableRow;
