import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaBangladeshiTakaSign } from 'react-icons/fa6';
import { Link, useNavigate } from 'react-router';
import Swal from 'sweetalert2';

const ManageBook = () => {
    const [datas, setDatas] = useState([]);
    const [selectedBook, setSelectedBook] = useState(null);

    const navigate = useNavigate();
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
        <div className='bg-gray-200 p-2 md:p-4 rounded-md min-h-screen'>
            <h2 className="text-lg md:text-xl font-bold text-green-700 mb-4 px-2">Manage Books ({datas.length})</h2>

          
            <div className="overflow-x-auto w-full rounded-lg shadow-md">
                <table className="table table-compact md:table-normal w-full">
                    <thead className="bg-gray-300 text-gray-800">
                        <tr className="text-xs md:text-sm">
                            <th>#</th>
                            <th>Book</th>
                            <th className="hidden sm:table-cell">Author</th>
                            <th className="hidden md:table-cell">Category</th>
                            <th>Price</th>
                            <th className="text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-xs md:text-sm">
             {datas.map((data, index) => (
         <tr key={data._id} className="hover:bg-gray-50 border-b border-gray-100">
         <th>{index + 1}</th>
             <td>
         <div className="flex items-center gap-2 md:gap-3">
          <div className="avatar">
              <div className="mask mask-squircle h-8 w-8 md:h-12 md:w-12">
                  <img src={data.image} alt="Book" />
             </div>
                 </div>
                     <div className="max-w-[100px] md:max-w-none">
                             <div className="font-bold truncate">{data.title}</div>
                          <div className="text-[10px] md:text-sm opacity-50 block sm:hidden">{data.author}</div>
                            <div className="text-[10px] md:text-sm opacity-50">{data.category}</div>
                           </div>
                            </div>
                       </td>
           <td className="hidden sm:table-cell">{data.author}</td>
                   <td className="hidden md:table-cell">
                          <span className="badge badge-info badge-sm whitespace-nowrap">{data.category}</span>
                             </td>
             <td className="text-green-600 font-semibold">
                       <div className="flex items-center gap-0.5"><FaBangladeshiTakaSign className="text-[10px] md:text-sm" />{data.price}</div>
                  </td>
                   <td className="text-right">
                      <div className="flex flex-col md:flex-row justify-end gap-1">
                     <button onClick={() => handleEditClick(data)} className="btn btn-[10px] md:btn-xs btn-info py-0 h-6">Edit</button>
                        <button onClick={() => handleDelete(data._id)} className="btn btn-[10px] md:btn-xs btn-error py-0 h-6">Delete</button>
                          <Link to={`/viewDetails/${data._id}`} className="btn btn-[10px] md:btn-xs btn-ghost py-0 h-6">Details</Link>
                           </div>
                          </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* --- Modal (Responsive) --- */}
            <dialog id="edit_modal" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box max-w-2xl p-4 md:p-6">
                    <h3 className="font-bold text-lg md:text-xl text-green-700 mb-4 border-b pb-2">Edit Book Information</h3>
                    
                    {selectedBook && (
                        <form onSubmit={handleUpdate} className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                            <div className="form-control">
                                <label className="label text-[11px] font-bold">Book Title</label>
                                <input type="text" name="title" defaultValue={selectedBook.title} className="input input-bordered input-sm" required />
                            </div>
                            <div className="form-control">
                                <label className="label text-[11px] font-bold">Author</label>
                                <input type="text" name="author" defaultValue={selectedBook.author} className="input input-bordered input-sm" required />
                            </div>
                            <div className="form-control">
                                <label className="label text-[11px] font-bold">Category</label>
                                <select name="category" defaultValue={selectedBook.category} className="select select-bordered select-sm">
                                    <option>Novel</option>
                                    <option>History</option>
                                    <option>Science Fiction</option>
                                    <option>Poetry</option>
                                </select>
                            </div>
                            <div className="form-control">
                                <label className="label text-[11px] font-bold">Price</label>
                                <input type="number" name="price" defaultValue={selectedBook.price} className="input input-bordered input-sm" required />
                            </div>
                            <div className="form-control md:col-span-2">
                                <label className="label text-[11px] font-bold">Image URL</label>
                                <input type="text" name="image" defaultValue={selectedBook.image} className="input input-bordered input-sm" required />
                            </div>
                            <div className="form-control md:col-span-2">
                                <label className="label text-[11px] font-bold">Short Description</label>
                                <textarea name="description" defaultValue={selectedBook.description} className="textarea textarea-bordered h-20 text-sm" required></textarea>
                            </div>

                            <div className="md:col-span-2 flex justify-end gap-2 mt-4">
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