import VideoListItem from "./VideoListItem";

export default function VideoList({ videos }) {
  if (videos.length === 0) {
    return <p>No videos found.</p>;
  }

  return (
    <ul className="list-unstyled">
      {videos.map((video) => (
        <VideoListItem key={video.id} video={video} />
      ))}
    </ul>
  );
}