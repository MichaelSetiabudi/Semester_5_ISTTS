import { Link } from "react-router-dom";

const ListCard = ({ data }) => {
  return (
    <div className="flex flex-col px-1 py-2 border-b-2 border-black w-full">
      <div>{data.name}</div>
      <div>${data.price}</div>
      <div className="flex flex-row gap-x-2">
        <Link className="bg-blue-300 px-2 py-1" to={`${data.id}`}>
          Detail
        </Link>
        <Link className="bg-blue-300 px-2 py-1" to={`${data.id}/edit`}>
          Edit
        </Link>
      </div>
    </div>
  );
};

export default ListCard;