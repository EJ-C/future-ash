import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import VideoTableRow from "./VideoTableRow";

export default function VideoTable({ videos }) {
    return (
      <TableContainer component={Paper}>
        <Table aria-label="videos table">
          <TableHead>
            <TableRow>
              <TableCell>Thumbnails</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Channel</TableCell>
              <TableCell>Published Date</TableCell>
              <TableCell>Views</TableCell>
              <TableCell>Subscribers</TableCell>
              <TableCell></TableCell>
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
  }