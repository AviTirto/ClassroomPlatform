export default function ChunkOptions({ editMode, setEditMode, handleUpdate, handleDelete }){
    return (
      <div className='flex space-x-4 w-full justify-center'>
        <button 
            className='border px-5 py-1 rounded-lg text-sm hover:bg-gray-100 duration-300'
            onClick={() => {setEditMode(!editMode)}}
        >
            { editMode? 'Cancel' : 'Edit' }
        </button>
        <button 
            className={`px-5 py-1 rounded-lg bg-blue-400 text-white text-sm animate-none ${ editMode? '' : 'hidden' }`}
            onClick={handleUpdate}
        >
            Save Changes
        </button>
        <button
            className='px-5 py-1 rounded-lg bg-red-600 text-white text-sm animate-none'
            onClick={ handleDelete }
        >
            Delete
        </button>
      </div>
    )
}
