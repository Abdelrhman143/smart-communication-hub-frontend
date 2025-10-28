import User from "./User";

export default function ChatSideBar() {
  return (
    <div className="bg-white border-r-2 border-gray-200">
      {/* header */}
      <div className="p-5 border-b-2 border-gray-200">
        <h1 className="font-semibold text-2xl">Messages</h1>
        <span className="text-gray-500">3 online</span>
      </div>
      {/* list of users */}
      <User />
      <User />
      <User />
      <User />
    </div>
  );
}
