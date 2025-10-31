import { Users } from "./UsersList";
import { useParams } from "next/navigation";

export default function User({ user }: { user: Users }) {
  const parms = useParams();
  const activeUserId = parms.id ? Number(parms.id) : undefined;
  return (
    <div
      className={`p-5 flex items-center justify-between hover:bg-gray-100 transition ${
        activeUserId === user.id ? "bg-gray-200 pointer-events-none" : ""
      }`}
    >
      <div className="flex gap-5">
        <div className="bg-MainColor text-white p-3 size-12 text-center rounded-full relative">
          {user.name.slice(0, 2)}
          <div className="absolute bg-green-500 size-3 right-0 border-2 border-white rounded-full"></div>
        </div>
        <div>
          <h3>{user.name}</h3>
          <p className="text-gray-500">last message</p>
        </div>
      </div>
      <div className="bg-MainColor font-bold text-white text-xs p-1 size-6 text-center self-start rounded-full">
        2
      </div>
    </div>
  );
}
