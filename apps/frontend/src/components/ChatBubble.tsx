interface Props {
  message: string;
}

export default function ChatBubble({
  message,
}: Props) {
  return (
    <div className="flex justify-end">

      <div className="max-w-xl rounded-2xl bg-blue-600 px-5 py-3 text-white">
        {message}
      </div>

    </div>
  );
}