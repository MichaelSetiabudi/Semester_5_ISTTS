import { useLoaderData, Outlet, Link } from "react-router-dom";
import ListCard from "./ListCard";

const List = () => {
  // Untuk mengambil data dari loader, 
  // gunakan hook bernama useLoaderData dari react-router-dom
  const data = useLoaderData();

  return (
    <div className="grid grid-cols-4 h-full">
      <div className="flex flex-col items-center overflow-scroll h-screen">
        <Link className='bg-blue-300 w-2/3 text-center m-2' to={"/items/new"}>Add new</Link>
        {data &&
          data.map((d) => {
            return <ListCard data={d} key={d.id} />;
          })}
      </div>
      <div className="col-span-3 bg-blue-100 p-4">
        <Outlet />
      </div>
    </div>
  );
};

export default List;
