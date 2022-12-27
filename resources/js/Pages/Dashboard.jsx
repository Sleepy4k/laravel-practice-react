import { useState, useEffect } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { Link, Head } from '@inertiajs/inertia-react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Dashboard(props) {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [category, setCategory] = useState('')
    const [isNotif, setNotif] = useState(false)

    const handleSubmit = () => {
        const data = {
            title, description, category
        }

        Inertia.post('/news', data)
        setNotif(true)
        setTitle('')
        setDescription('')
        setCategory('')
    }

    useEffect(() => {
        if (!props.newsList) {
            Inertia.get('/news')
        }

        return
    }, [])

    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Berita Saya</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="p-6 bg-white border-b border-gray-200">
                        {isNotif && 
                            <div className="alert alert-success shadow-lg">
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                    <span>{props.flash.message}</span>
                                </div>
                            </div>
                        }

                        <input type="text" value={title} placeholder="Judul" className="m-2 input input-bordered w-full" onChange={(title) => setTitle(title.target.value)} />
                        <input type="text" value={description} placeholder="Deskripsi" className="m-2 input input-bordered w-full" onChange={(description) => setDescription(description.target.value)} />
                        <input type="text" value={category} placeholder="Kategori" className="m-2 input input-bordered w-full" onChange={(category) => setCategory(category.target.value)} />
                        <button type="submit" className='btn btn-primary m-2' onClick={() => handleSubmit()}>Buat Berita</button>
                    </div>
                </div>
                <div className='p-4 max-w-7xl mx-auto sm:px-6 lg:px-8'>
                    {props.newsList && props.newsList.length > 0 ? props.newsList.map((news, index) => {
                        return (
                            <div key={index} className="card w-full bg-base-100 shadow-xl m-2">
                                <div className="card-body">
                                    <h2 className="card-title">
                                        {news.title}
                                    </h2>
                                    <p>{news.description}</p>
                                    <div className="card-actions justify-end">
                                        <div className="badge badge-inline">{news.category}</div>
                                        <div className="badge badge-outline">
                                            <Link href={route('news.edit', news.id)} as='button'>edit</Link>
                                        </div>
                                        <div className="badge badge-outline">
                                            <Link href={route('news.destroy', news.id)} method="delete" as='button'>delete</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    }) : <p>Kamu belum memiliki berita</p>}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
