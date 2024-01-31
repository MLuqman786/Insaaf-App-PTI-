import React from 'react';
import { useParams, Link } from 'react-router-dom';

function SideBar() {
  const { id } = useParams();

  return (
    <>
      <nav className='bg-green-600 h-screen w-60 overflow-hidden shadow-md'>
        <div className='flex flex-col items-center justify-around h-full'>
          <Link
            className='text-white py-4 px-6 hover:bg-green-800 transition duration-300 w-full text-left'
            to={`/membersLayout/${id}/`}
          >
            Profile
          </Link>
          <Link
            className='text-white py-4 px-6 hover:bg-green-800 transition duration-300 w-full text-left'
            to={`/membersLayout/${id}/membersEvents`}
          >
            Events
          </Link>
          <Link
            className='text-white py-4 px-6 hover:bg-green-800 transition duration-300 w-full text-left'
            to={`/membersLayout/${id}/membersNews`}
          >
            News
          </Link>
          <Link
            className='text-white py-4 px-6 hover:bg-green-800 transition duration-300 w-full text-left'
            to={`/membersLayout/${id}/membersSocialActivity`}
          >
            Social Activity
          </Link>
          <Link
            className='text-white py-4 px-6 hover:bg-green-800 transition duration-300 w-full text-left'
            to={`/membersLayout/${id}/pollingStations`}
          >
            Polling Stations
          </Link>
          <Link
            className='text-white py-4 px-6 hover:bg-green-800 transition duration-300 w-full text-left'
            to='/chats'
          >
            Chats
          </Link>
        </div>
      </nav>
    </>
  );
}

export default SideBar;
