export default async function searchVideos(query) {
  const res = await fetch(
    `https://www.googleapis.com/youtube/v3/search?key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}&part=snippet&type=video&maxResults=25&q=${query}`
  );
  const data = await res.json();

  const videoIds = data.items.map((item) => item.id.videoId).join(",");
  const videoRes = await fetch(
    `https://www.googleapis.com/youtube/v3/videos?key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}&part=snippet,statistics&id=${videoIds}`
  );
  const videoData = await videoRes.json();

  const channelIds = videoData.items.map((item) => item.snippet.channelId).join(",");
  const channelRes = await fetch(
    `https://www.googleapis.com/youtube/v3/channels?key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}&part=statistics&id=${channelIds}`
  );
  const channelData = await channelRes.json();

  const channels = {};
  channelData.items.forEach((item) => {
    channels[item.id] = item.statistics.subscriberCount;
  });

  const videos = videoData.items.map((item) => ({
    id: item.id,
    title: item.snippet.title,
    description: item.snippet.description,
    thumbnailUrl: item.snippet.thumbnails.medium.url,
    views: item.statistics.viewCount,
    likes: item.statistics.likeCount,
    dislikes: item.statistics.dislikeCount,
    publishDate: item.snippet.publishedAt,
    channelTitle: item.snippet.channelTitle,
    subscribers: channels[item.snippet.channelId],
  }));

  return videos;
}
