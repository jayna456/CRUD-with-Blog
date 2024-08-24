import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

const AddEditBlog = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    useEffect(() => {
        console.log("=-=-=-= ",location);
        if (location?.state?.key === 'edit') {
            getSingleBlog(location?.state?.id);
        }
    }, [location?.state])

    const handleCreateBlog = async (e) => {
        e.preventDefault();
        const dataToPass = { title, description };
        const response = await axios.post('http://localhost:3000/blogs', dataToPass, {
            headers: {
                'token': localStorage.getItem('token'),
            }
          });
        if (response.data.code === 200) {
            navigate('/getList');   
        }
    }

    const getSingleBlog = async (id) => {
        const header = {
            headers: {
                token: localStorage.getItem('token')            
            }
        };
        const response = await axios.get(`http://localhost:3000/blogs/${id}`, header);
        if (response.data.code === 200) {            
            setTitle(response.data?.data?.title);
            setDescription(response.data?.data?.description);
        }
    }

    const handleUpdate = async (e) => {
        const header = {
            headers: {
                token: localStorage.getItem('token')            
            }
        };
        const dataToPass = {
            title, description, id: location?.state?.id
        }        
        const response = await axios.put(`http://localhost:3000/blogs/${location?.state?.id}`, dataToPass, header);
        if (response.data.code === 200) {
            navigate('/getList');
        }
    }

  return (
    <>
        <div className='container justify-content-center'>
            {location?.state?.key === 'add' ? 
                    <form onSubmit={handleCreateBlog}>
                        <h3>Add Blog</h3>
                        <div className="mb-3">
                            <label htmlFor="formGroupExampleInput1" className="form-label">Enter title</label>
                            <input type="text" className="form-control" id="formGroupExampleInput1" placeholder="Enter title" required onChange={e => setTitle(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleFormControlTextarea1" className="form-label">Enter Description</label>
                            <textarea placeholder='Enter Description' className="form-control" id="exampleFormControlTextarea1" rows="3" required onChange={e => setDescription(e.target.value)}></textarea>
                        </div>
                        <div className='mb-3 text-end'>
                            <button type='submit' className='btn btn-primary'>Submit</button>
                        </div>
                    </form>
                :
                    location?.state?.key === 'edit' ?
                        <form onSubmit={handleUpdate}>
                            <h3>Edit Blog</h3>
                            <div className="mb-3">
                                <label htmlFor="formGroupExampleInput1" className="form-label">Title</label>
                                <input type="text" className="form-control" id="formGroupExampleInput1" placeholder="Enter title" required value={title} onChange={e => setTitle(e.target.value)} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleFormControlTextarea1" className="form-label">Description</label>
                                <textarea placeholder='Enter Description' className="form-control" id="exampleFormControlTextarea1" rows="3" value={description} onChange={e => setDescription(e.target.value)}></textarea>
                            </div>
                            <div className='mb-3 text-end'>
                                <button type='submit' className='btn btn-primary'>Submit</button>
                            </div>
                        </form>
                    :
                        <>Loading...</>
            }
        </div>
    </>
  )
}

export default AddEditBlog