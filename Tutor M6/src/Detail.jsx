import { useLoaderData } from "react-router-dom";

const Detail = () => {
    // Data yang didapat dari useLoaderData tergantung dari loader yang digunakan.
    const data = useLoaderData();

    return ( <div>
        <div className="text-xl font-bold">{data.name}</div>
        <div>${data.price}</div>
        <img src={data.image}/> 
        <div>Category: {data.category}</div>
        <div>{data.description}</div>
    </div> );
}
 
export default Detail;