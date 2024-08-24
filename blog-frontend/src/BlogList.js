import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const BlogList = () => {
    const [list, setList] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getList();
    }, [])

    const getList = async () => {
        const header = {
            headers: {
                token: localStorage.getItem('token')            
            }
        };
        const response = await axios.get('http://localhost:3000/blogs',header);
        if (response.data.code === 200) {
            setList(response.data.data);        
        }
    }

    const goToDelete = async (id) => {
        const header = {
            headers: {
                token: localStorage.getItem('token')            
            }
        };
        const response = await axios.delete(`http://localhost:3000/blogs/${id}`, header);
        if (response.data.code === 200) {
            getList();
        }
    }

    const goToEdit = (id) => {
        navigate('/single-blog', { state: { key: "edit", id: id } });
    }

  return (
    <>
        <div className='container'>
            <div className="accordion" id="accordionExample">
                    {list.length ? 
                        list.map(value => 
                            <div className="d-flex flex-row justify-content-between" key={value._id}>
                                <div className="accordion-button" >
                                    {value.title}
                                </div>
                                <div className='text-end d-flex flex-row mb-2 '>
                                    <button className='btn btn-secondary' type='button' onClick={() => goToEdit(value._id)}>Edit</button>
                                    <button className='btn btn-danger ms-2 me-2' type='button' onClick={() => goToDelete(value._id)}>Delete</button>
                                </div>                                
                            </div>)
                    : <></>}
            </div>
        </div>
    </>
  )
}

export default BlogList