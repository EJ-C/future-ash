import { useState } from "react";
import Head from "next/head";
import SearchForm from "../components/SearchForm";
import VideoList from "../components/VideoList";
import searchVideos from "../utils/youtubeApi";

export default function Home() {
  const [query, setQuery] = useState("");
  const [sortOption, setSortOption] = useState("views");
  const [sortOrder, setSortOrder] = useState("desc");
  const [includeShorts, setIncludeShorts] = useState(false);
  const [videos, setVideos] = useState([]);

  async function handleSubmit(event) {
    event.preventDefault();
    const data = await searchVideos(query, sortOption, sortOrder, includeShorts);
    setVideos(data);
  }

  function handleSortOptionChange(event) {
    setSortOption(event.target.value);
  }

  function handleSortOrderChange(event) {
    setSortOrder(event.target.value);
  }

  function handleIncludeShortsChange(event) {
    setIncludeShorts(event.target.checked);
  }

  const sortedVideos = videos.sort((a, b) => {
    let comparison = 0;
    if (sortOption === "views") {
      comparison = b.views - a.views;
    } else if (sortOption === "subscribers") {
      comparison = b.subscribers - a.subscribers;
    } else if (sortOption === "publishedDate") {
      comparison = b.publishedDate - a.publishedDate;
    } else if (sortOption === "name") {
      comparison = a.title.localeCompare(b.title);
    }
    return sortOrder === "desc" ? comparison : -comparison;
  });

  const filteredVideos = includeShorts ? videos : videos.filter((video) => video.duration !== "short");

  return (
    <>
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-aFq/bzH65dt+w6FI2ooMVUpc+21e0SRygnTpmBvdBgSdnuTN7QbdgL+OapgHtvPp" crossOrigin="anonymous"/>
      <div className="container">
        <main>
          <div className="row">
            <div className="col-md-8">
              <h1 className="mt-4 mb-4">YouTube Search App</h1>
              <form onSubmit={handleSubmit}>
                <div className="input-group mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search videos"
                    aria-label="Search videos"
                    aria-describedby="button-search"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                  />
                  <button className="btn btn-primary" type="submit" id="button-search">
                    Search
                  </button>
                </div>
              </form>
              <div className="mb-4">
                <label className="form-label me-2">Sort by:</label>
                <select className="form-select me-3" value={sortOption} onChange={handleSortOptionChange}>
                  <option value="views">Views</option>
                  <option value="subscribers">Subscribers</option>
                  <option value="publishedDate">Published Date</option>
                </select>
                <label className="form-label me-2">Sort order:</label>
                <select className="form-select" value={sortOrder} onChange={handleSortOrderChange}>
                  <option value="desc">Descending</option>
                  <option value="asc">Ascending</option>
                </select>
              </div>

              <div className="form-check mb-4">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="includeShorts"
                  checked={includeShorts}
                  onChange={handleIncludeShortsChange}
                />
                <label className="form-check-label ms-2" htmlFor="includeShorts">
                  Include Shorts
                </label>
              </div>
            </div>

            <div className="col-md-4">
              <div>
                <h2 className="mt-4 mb-4">Related Videos</h2>
                {/* Add related videos here */}
              </div>
            </div>
          </div>
          <div className="row">
          {filteredVideos.map((video) => (
            <div key={video.id} className="col-md-4 mb-4">
              <div className="card h-100">
                <a href={`https://www.youtube.com/watch?v=${video.id}`} target="_blank" rel="noopener noreferrer">
                  <img src={video.thumbnailUrl} alt={video.title} className="card-img-top" />
                </a>
                <div className="card-body">
                  <h5 className="card-title">{video.title}</h5>
                  <p className="card-text">{video.channelTitle}</p>
                  <div className="d-flex justify-content-between">
                  <p className="card-text">
                      <small className="text-muted">Views: {video.views.toLocaleString()}</small>
                    </p>
                    <p className="card-text">
                      <small className="text-muted">Subscribers: {video.subscribers.toLocaleString()}</small>
                    </p>
                  </div>
                  <p className="card-text">
                    <small className="text-muted">Published: {video.publishedDate.toLocaleDateString()}</small>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  </>
  );
}