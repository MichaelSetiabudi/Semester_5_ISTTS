import { useState } from "react"
import BookCard from "../components/BookCard"

const HomePage = () => {
    const [books, setBooks] = useState([
        {
            title: 'Harry Potter',
            author: 'JK Rowling'
        },
        {
            title: 'Percy Jackson',
            author: 'Rick Riordan'
        }
    ])
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')

    const handleSubmit = () => {
        const newBook = {
            title: title,
            author: author
        }
        setBooks([...books, newBook])
    }

    const deleteItem = (idx) => {
        const arrBooks = [...books]
        arrBooks.splice(idx, 1)
        setBooks(arrBooks)
        console.log(idx)
    }

    return(
        <div className="p-20 text-left">
            <div className="form">
                <div className="text-2xl font-bold mb-5">Add Buku</div>

                <label>Title</label> <br />
                <input type="text" name="title" id="" className="border border-black mb-2 w-1/2" onChange={ (e) => {setTitle(e.target.value)} } /> <br />

                <label>Author</label> <br />
                <input type="text" name="title" id="" className="border border-black w-1/2" onChange={ (e) => {setAuthor(e.target.value)} } /> <br />

                <button className="mt-5 button rounded bg-blue-900 text-white" onClick={ handleSubmit }>Add</button>
            </div>
            <div className="listBuku mt-10">
                <div className="text-2xl font-bold mb-5">List Buku</div>
                <div className="flex">
                    {
                        books.map((book, index) => {
                            return(
                                <BookCard key={index} book={book} handleDelete={deleteItem} idx={index} />
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default HomePage