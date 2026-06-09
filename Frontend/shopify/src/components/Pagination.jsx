import React from 'react'

const Pagination = ({currentPage,totalPages,onPageChange}) => {
  return (
    <div className='flex justify-center items-center gap-2 mt-8'>
        <button disabled={currentPage ===1}
                onClick={()=>onPageChange(currentPage -1)}
                className='px-4 py-2 bg-gray-600 rounded disabled:opacity-50'
        >
            Prev</button>

            {[...Array(totalPages)].map((_,index)=>(
                <button key={index}
                onClick={()=>onPageChange(index +1)}
                className={`px-4 py-2 rounded ${currentPage === index + 1 ?"bg-blue-600 text-white" :"bg-gray-200"}`}
                >
                    {index + 1}
                </button>
            ))}
            <button disabled={currentPage === totalPages}
            onClick={()=>onPageChange(currentPage +1)}
            className='px-4 py-2 bg-gray-200 rounded disabled:opacity-50'>Next</button>
    </div>
  )
}

export default Pagination