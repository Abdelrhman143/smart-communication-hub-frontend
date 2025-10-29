export default function User() {
  return (
    <div className="p-5 flex items-center gap-5 hover:bg-gray-100 transition">
      <div className="bg-MainColor text-white p-3 size-12 text-center rounded-full relative">
        AT
        <div className="absolute bg-green-500 size-3 right-0 border-2 border-white rounded-full"></div>
      </div>
      <div>
        <h3>Abdelrahman Tharwat</h3>
        <p className="text-gray-500">last message</p>
      </div>
      <div className="bg-MainColor font-bold text-white text-xs p-1 size-6 text-center self-start rounded-full">
        2
      </div>
    </div>
  );
}
