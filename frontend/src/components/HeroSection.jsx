import { useState } from 'react'
import { Button } from './ui/button'
import { Search } from 'lucide-react'
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = () => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    }

    return (
        <section className='text-center px-4'>
            <div className='flex flex-col gap-5 my-10 md:my-16'>
                <span className=' mx-auto px-4 py-2 rounded-full bg-gray-100 text-[#F83002] font-medium'>No. 1 Job Hunt Website</span>
                <h1 className='text-3xl md:text-5xl font-bold leading-tight'>Search, Apply & <br /> Get Your <span className='text-[#6A38C2]'>Dream Jobs</span></h1>
                <p className="text-gray-600 max-w-2xl mx-auto">Find jobs that actually fit you. Explore curated roles, apply faster, and grow your career without the noise.</p>
                <div className='flex w-full md:w-3/5 lg:w-2/5 shadow-lg border border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto bg-white'>
                    <input
                        type="text"
                        placeholder='Find your dream jobs'
                        onChange={(e) => setQuery(e.target.value)}
                        className='outline-none border-none w-full bg-transparent'
                        aria-label="Search jobs"

                    />
                    <Button onClick={searchJobHandler} className="rounded-r-full bg-[#6A38C2]">
                        <Search className='h-5 w-5' />
                    </Button>
                </div>
            </div>
        </section>
    )
}

export default HeroSection