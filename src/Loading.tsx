export default function Loading() {
  return (
    <div className="w-screen h-screen backdrop-filter backdrop-blur z-20 absolute left-0 top-0 items-center justify-center text-xl">
      <div className="i-lucide-loader-2 w-[10rem] h-[10rem] animate-spin text-gray-700/50" />
    </div>
  );
}
