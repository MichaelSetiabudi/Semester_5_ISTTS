/* eslint-disable react/prop-types */
function ForYou({ imageUrl, title, author, totalPage }) {
    console.log(totalPage)
    return (
      <div className="col-6 col-md-2 mb-4">
        <div className="card text-center p-2" style={{ backgroundColor: "#FFE5E5" }}>
          <img
            src={imageUrl}
            alt={title}
            style={{
              width: "100%",
              height: "150px",
              objectFit: "cover",
            }}
          />
          <div className="card-body">
            <h3 className="card-title" style={{fontWeight:"bolder"}}>{title}</h3>
            <p className="card-text">{author}</p>
            <p className="card-text" style={{fontWeight:"bolder"}}>{totalPage} Pages</p>
            <button className="btn btn-success">ADD TO LIBRARY</button>
          </div>
        </div>
      </div>
    );
  }
  
  export default ForYou;