const BookCard = (props) => {
    return(
        <div className="card rounded bg-blue-100 p-10 w-auto m-2">
            <div className="text-lg font-semibold">{props.book.title}</div>
            <div className="mt-3">{props.book.author}</div>
            <button className="button bg-blue-900 text-white text-sm px-2 py-1 mt-3" onClick={()=>{
                props.handleDelete(props.idx)
            }}>Delete</button>
        </div>
    )
}

export default BookCard