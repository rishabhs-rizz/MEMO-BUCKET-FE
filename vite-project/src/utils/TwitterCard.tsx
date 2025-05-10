type TwitterCardProps = {
  author: string;
  handle: string;
  avatarUrl: string;
  text: string;
  time: string;
  imageUrl?: string;
  likes: string;
  replies: string;
};

export function TwitterCard({
  author,
  handle,
  avatarUrl,
  text,
  time,
  imageUrl,
  likes,
  replies,
}: TwitterCardProps) {
  return (
    <div className="bg-white rounded-xl p-4 shadow hover:shadow-md transition-all w-full max-w-sm">
      <div className="flex items-center gap-3 mb-2">
        <img src={avatarUrl} alt={author} className="w-10 h-10 rounded-full" />
        <div>
          <p className="text-sm font-semibold">{author}</p>
          <p className="text-xs text-gray-500">{handle}</p>
        </div>
      </div>
      <p className="text-sm text-gray-800 mb-2">{text}</p>

      {imageUrl && (
        <img
          src={imageUrl}
          alt="tweet image"
          className="rounded-lg mb-2 max-h-48 object-cover w-full"
        />
      )}

      <p className="text-xs text-gray-400 mb-2">{time}</p>

      <div className="flex justify-between text-xs text-gray-500">
        <span>❤️ {likes}</span>
        <span>💬 {replies}</span>
      </div>
    </div>
  );
}
