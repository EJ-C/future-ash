const YOUTUBE_API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;

export async function searchVideos(query, sortBy = "views", sortOrder = "desc") {
  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=51&q=${encodeURIComponent(query)}&type=video&key=${YOUTUBE_API_KEY}`;
  const response = await fetch(url);
  const data = await response.json();

  if (!data || !data.items) {
    return [];
  }

  const videoIds = data.items.map((item) => item.id.videoId).join(",");
  const channelIds = data.items.map((item) => item.snippet.channelId);
  const videoDetailsUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${videoIds}&key=${YOUTUBE_API_KEY}`;
  const videoDetailsResponse = await fetch(videoDetailsUrl);
  const videoDetailsData = await videoDetailsResponse.json();

  if (!videoDetailsData || !videoDetailsData.items) {
    return [];
  }

  const channelDetailsUrl = `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${channelIds.join(",")}&key=${YOUTUBE_API_KEY}`;
  const channelDetailsResponse = await fetch(channelDetailsUrl);
  const channelDetailsData = await channelDetailsResponse.json();

  if (!channelDetailsData || !channelDetailsData.items) {
    return [];
  }

  const videos = data.items.map((item) => {
    const details = videoDetailsData.items.find((v) => v.id === item.id.videoId);
    const channel = channelDetailsData.items.find((c) => c.id === item.snippet.channelId);
    return {
      id: item.id.videoId,
      title: item.snippet.title,
      channelTitle: item.snippet.channelTitle,
      thumbnailUrl: item.snippet.thumbnails.medium.url,
      views: details.statistics.viewCount.toLocaleString(),
      subscribers: channel.statistics.subscriberCount.toLocaleString(),
      publishedDate: new Date(item.snippet.publishedAt),
    };
  });

  if (sortBy === "views") {
    videos.sort((a, b) => (sortOrder === "asc" ? a.views - b.views : b.views - a.views));
  } else if (sortBy === "subscribers") {
    videos.sort((a, b) =>
      sortOrder === "asc" ? a.subscribers - b.subscribers : b.subscribers - a.subscribers
    );
  } else if (sortBy === "publishedDate") {
    videos.sort((a, b) =>
      sortOrder === "asc" ? a.publishedDate - b.publishedDate : b.publishedDate - a.publishedDate
    );
  }

  return videos;
}