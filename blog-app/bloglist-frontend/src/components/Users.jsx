import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'


const Users = () => {

    const users = useSelector(state => state.users)

    return (
        <div >
            <h2>Users</h2>
            {users.map(user =>
                <div key={user.id}>
                    <Link to={`/users/${user.id}`}>
                        {user.name} </Link>
                    <b> Blogs:</b> {user.blogs.length}</div>)
            }
        </div >
    )
}

export default Users