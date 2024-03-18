import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initializeUsers } from '../reducers/usersReducer'

const Users = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(initializeUsers())
    }, [])

    const users = useSelector(state => state.users)
    console.log(users)

    return (
        <div >
            <h2>Users</h2>
            {users.map(user =>
                <p key={user.id}><b>Name:</b>{user.name} <b>Blogs:</b> {user.blogs.length}</p>)}
        </div>
    )
}

export default Users