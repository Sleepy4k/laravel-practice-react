import React, { useState, useEffect } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { Link, Head } from '@inertiajs/inertia-react';
import Navbar from '@/Components/Navbar';

export default function Edit(props) {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [category, setCategory] = useState('')
    
    const handleSubmit = (id) => {
        const data = {
            title, description, category
        }

        Inertia.put('/news/' + id, data)
        setTitle('')
        setDescription('')
        setCategory('')
    }

    useEffect(() => {
        setTitle(props.newsData.title),
        setDescription(props.newsData.description),
        setCategory(props.newsData.category)
    }, [])

    return (
        <div className='min-h-screen bg-slate-50'>
            <Head title={props.title} />
            <Navbar user={props.auth.user} />
            <div className="card w-full bg-base-100 shadow-xl m-2">
                <div className='p-4 text-2xl'>Edit Berita</div>
                <div className="card-body">
                    <input type="text" defaultValue={props.newsData.title} placeholder="Judul" className="m-2 input input-bordered w-full" onChange={(title) => setTitle(title.target.value)} />
                    <input type="text" defaultValue={props.newsData.description} placeholder="Deskripsi" className="m-2 input input-bordered w-full" onChange={(description) => setDescription(description.target.value)} />
                    <input type="text" defaultValue={props.newsData.category} placeholder="Kategori" className="m-2 input input-bordered w-full" onChange={(category) => setCategory(category.target.value)} />
                    
                    <button type="submit" className='btn btn-primary m-2' onClick={() => handleSubmit(props.newsData.id)}>Update Berita</button>
                    <Link href={route('dashboard')} as='button' className='btn btn-primary'>Kembali</Link>
                </div>
            </div>
        </div>
    )
}