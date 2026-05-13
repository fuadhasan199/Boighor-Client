import React, { useContext } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { AuthContext } from '../../Provider/AuthProvider';

const AddBook = () => {
const {user}=useContext(AuthContext) 

    const handleAddBook = async (e) => {
        e.preventDefault(); 

        const form = e.target; 
                if(!user){
    return Swal.fire('Error', 'Please login First','error') 
  }
            
  try {
           
            const token = await user.getIdToken()

            const title = form.title.value
            const author = form.author.value
            const category = form.category.value
            const price = parseFloat(form.price.value)
            const discountPrice = parseFloat(form.discountPrice.value)
            const stock = parseInt(form.stock.value)
            const image = form.image.value;
            const shortDescription = form.shortDescription.value
            const description = form.description.value
            const newBook = {
                title,
                author,
                category,
                price,
                discountPrice,
                stock,
                image,
                shortDescription,
                description
            };

          
            const res = await axios.post('http://localhost:3000/books', newBook, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            });

            if (res.data.insertedId) {
                Swal.fire({
                    title: 'Success!',
                    text: 'Book Added Successfully',
                    icon: 'success',
                });
                form.reset();
            }
        } catch (error) {
            console.error(error);
            Swal.fire({
                title: 'Error!',
                text: error.response?.status === 403 ? 'Unauthorized: Admin only' : 'Something went wrong',
                icon: 'error',
            });
        }
    };

    return (
        <div className="bg-gray-200 p-4 md:p-10 rounded-md shadow-lg max-w-4xl mx-12 ">
            <h2 className="text-3xl font-bold text-center text-green-700 mb-8">Add a New Book</h2>
            
            <form onSubmit={handleAddBook} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Book Title */}
                <div className="form-control">
                    <label className="label"><span className="label-text font-semibold">Book Title</span></label>
                    <input type="text" name="title" placeholder="Enter book title" className="input input-bordered w-full" required />
                </div>

                {/* Author Name */}
                <div className="form-control">
                    <label className="label"><span className="label-text font-semibold">Author Name</span></label>
                    <input type="text" name="author" placeholder="Enter author name" className="input input-bordered w-full" required />
                </div>

                {/* Category */}
                <div className="form-control">
                    <label className="label"><span className="label-text font-semibold">Category</span></label>
                    <select name="category" className="select select-bordered w-full" defaultValue="">
                        <option value="" disabled>Select Category</option>
                        <option value="Novel">Novel</option>
                        <option value="Poetry">Poetry</option>
                        <option value="History">History</option>
                        <option value="Science">Science</option>
                        <option value="Religious">Religious</option>
                         <option value="Thriller">Thriller</option> 
                          <option value="Religious">Self-Help</option>
                    </select>
                </div>

                {/* Image URL */}
                <div className="form-control">
                    <label className="label"><span className="label-text font-semibold">Image URL</span></label>
                    <input type="text" name="image" placeholder="https://example.com" className="input input-bordered w-full" required />
                </div>

                {/* Price */}
                <div className="form-control">
                    <label className="label"><span className="label-text font-semibold">Price (TK)</span></label>
                    <input type="number" name="price" placeholder="500" className="input input-bordered w-full" required />
                </div>

                {/* Discount Price */}
                <div className="form-control">
                    <label className="label"><span className="label-text font-semibold">Discount Price (TK)</span></label>
                    <input type="number" name="discountPrice" placeholder="350" className="input input-bordered w-full" />
                </div>

                {/* Stock Quantity */}
                <div className="form-control">
                    <label className="label"><span className="label-text font-semibold">Stock Quantity</span></label>
                    <input type="number" name="stock" placeholder="30" className="input input-bordered w-full" required />
                </div>

                {/* Short Description */}
                <div className="form-control md:col-span-2">
                    <label className="label"><span className="label-text font-semibold">Short Description</span></label>
                    <input type="text" name="shortDescription" placeholder="short description written here" className="input input-bordered w-full" required />
                </div>

                {/* Full Description */}
                <div className="form-control md:col-span-2">
                    <label className="label"><span className="label-text font-semibold">Full Description</span></label>
                    <textarea name="description" placeholder="Write detailed description here..." className="textarea textarea-bordered h-32" required></textarea>
                </div>

                {/* Submit Button */}
                <div className="form-control md:col-span-2 mt-6">
                    <button type="submit" className="btn btn-success text-white w-full">Add Book to Store</button>
                </div>

            </form>
        </div>
    );
};

export default AddBook;