import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaBangladeshiTakaSign } from 'react-icons/fa6';
import { Link, useNavigate } from 'react-router';
import Swal from 'sweetalert2';

const ManageBook = () => {
    const [datas, setDatas] = useState([]);
    const [selectedBook, setSelectedBook] = useState(null);

  const navigate=useNavigate()
    const loadBooks = () => {
        axios.get(`http://localhost:3000/books`)
            .then(res => setDatas(res.data))
            .catch(error => console.log(error.message))
    }

    useEffect(() => {
        loadBooks();
    }, [])

  
    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`http://localhost:3000/books/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            Swal.fire("Deleted!", "The book has been deleted.", "success");
                            loadBooks();
                        }
                    })
            }
        });
    }

    
    const handleEditClick = (book) => {
        setSelectedBook(book);
        document.getElementById('edit_modal').showModal();
    }

   
    const handleUpdate = async (e) => {
        e.preventDefault();
        const form = e.target;
        const updatedBook = {
            title: form.title.value,
            author: form.author.value,
            category: form.category.value,
            price: parseFloat(form.price.value),
            image: form.image.value,
            description: form.description.value
        };

        try {
            const res = await axios.patch(`http://localhost:3000/books/${selectedBook._id}`, updatedBook);
            if (res.data.modifiedCount > 0) {
                Swal.fire("Success!", "Book updated successfully", "success");
                document.getElementById('edit_modal').close();
                loadBooks();
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className='bg-gray-200 p-4 rounded-md'>
            <h2 className="text-xl font-bold text-green-700 mb-4">Manage Books</h2>

            <div className="overflow-x-auto">
                <table className="table table-zebra w-full bg-white rounded-lg shadow-md">
                    <thead className="bg-gray-300 text-gray-800">
                        <tr>
                            <th>#</th>
                            <th>Book</th>
                            <th>Author</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th className="text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                  {datas.map((data, index) => (
               <tr key={data._id}>
                 <td>{index + 1}</td>
                 <td>
                        <div className="flex items-center gap-3">
                            <div className="avatar">
                                <div className="mask mask-squircle h-12 w-12">
                                    <img src={data.image} alt="Book" />
                                            </div>
                             </div>
                           <div>
                                            <div className="font-bold">{data.title}</div>
                                            <div className="text-sm opacity-50">{data.category}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>{data.author}</td>
                                <td><span className="badge badge-info badge-sm">{data.category}</span></td>
                                <td className="text-green-600 font-semibold">
                                    <div className="flex items-center gap-1"><FaBangladeshiTakaSign />{data.price}</div>
                                </td>
                                <td className="text-right space-x-2">
                                    <button onClick={() => handleEditClick(data)} className="btn btn-xs btn-info">Edit</button>
                                    <button onClick={() => handleDelete(data._id)} className="btn btn-xs btn-error">Delete</button>
                                    <Link to={`/viewDetails/${data._id}`} className="btn btn-xs btn-ghost">Details</Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* ---  Modal --- */}
            <dialog id="edit_modal" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box max-w-2xl">
                    <h3 className="font-bold text-xl text-green-700 mb-4 border-b pb-2">Edit Book Information</h3>
                    
                    {selectedBook && (
                        <form onSubmit={handleUpdate} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Title */}
                            <div className="form-control">
                                <label className="label text-xs font-bold">Book Title</label>
                                <input type="text" name="title" defaultValue={selectedBook.title} className="input input-bordered input-sm" required />
                            </div>
                            {/* Author */}
                            <div className="form-control">
                                <label className="label text-xs font-bold">Author</label>
                                <input type="text" name="author" defaultValue={selectedBook.author} className="input input-bordered input-sm" required />
                            </div>
                            {/* Category */}
                            <div className="form-control">
                                <label className="label text-xs font-bold">Category</label>
                                <select name="category" defaultValue={selectedBook.category} className="select select-bordered select-sm">
                                    <option>Novel</option>
                                    <option>History</option>
                                    <option>Science Fiction</option>
                                    <option>Poetry</option>
                                </select>
                            </div>
                            {/* Price */}
                            <div className="form-control">
                                <label className="label text-xs font-bold">Price</label>
                                <input type="number" name="price" defaultValue={selectedBook.price} className="input input-bordered input-sm" required />
                            </div>
                            {/* Image URL */}
                            <div className="form-control md:col-span-2">
                                <label className="label text-xs font-bold">Image URL</label>
                                <input type="text" name="image" defaultValue={selectedBook.image} className="input input-bordered input-sm" required />
                            </div>
                            {/* Description */}
                            <div className="form-control md:col-span-2">
                                <label className="label text-xs font-bold">Short Description</label>
                                <textarea name="description" defaultValue={selectedBook.description} className="textarea textarea-bordered h-20" required></textarea>
                            </div>

                            {/* Buttons */}
                            <div className="md:col-span-2 flex justify-end gap-3 mt-4">
                                <button type="button" onClick={() => document.getElementById('edit_modal').close()} className="btn btn-sm">Cancel</button>
                                <button type="submit" className="btn btn-sm btn-success text-white">Update Book</button>
                            </div>
                        </form>
                    )}
                </div>
            </dialog>
        </div>
    );
};

export default ManageBook;