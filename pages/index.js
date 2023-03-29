import '@fontsource/roboto/300.css';
import Head from 'next/head';
import { useState } from 'react';
import VideoTable from '/pages/components/VideoTable';
import searchVideos from '/pages/utils/youtubeApi';
import SearchForm from '/pages/components/SearchForm'; // Import the SearchForm component

export default function Home() {
  const [videos, setVideos] = useState([]);

  async function handleSearch(query, sortOption, sortOrder, includeShorts) {
    const newVideos = await searchVideos(query, sortOption, sortOrder, includeShorts);
    setVideos(newVideos);
  }

  return (
    <div>
      <Head>
        <title>YouTube Video Search</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>YouTube Video Search</h1>
        <SearchForm onSubmit={handleSearch} /> {/* Render the SearchForm component */}
        <VideoTable videos={videos} />
      </main>
    </div>
  );
}