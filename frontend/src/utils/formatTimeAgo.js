export default function formatTimeAgo(timestamp) {
  const now = new Date();
  const created = new Date(timestamp);
  const diffInSeconds = Math.floor((now - created) / 1000);

  if (diffInSeconds < 60) {
    return `${diffInSeconds} seconds ago`;
  }

  const minutes = Math.floor(diffInSeconds / 60);
  if (minutes < 60) {
    return `${minutes} mins ago`;
  }

  const hours = Math.floor(minutes / 60);
  if (hours < 24) {
    return `${hours} hours ago`;
  }

  const days = Math.floor(hours / 24);
  return `${days} days ago`;
}
