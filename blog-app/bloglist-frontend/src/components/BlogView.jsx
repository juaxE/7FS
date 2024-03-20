import { useSelector, useDispatch } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import { likeBlog, removeBlog } from '../reducers/blogReducer'

const BlogView = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const user = useSelector(state => state.user)

    const id = useParams().id
    const blog = useSelector(state =>
        state.blogs.find(blog => blog.id === id))


    const addLike = (event) => {
        event.preventDefault()
        dispatch(likeBlog(blog))
    }

    const deleteBlog = (event) => {
        event.preventDefault()
        if (window.confirm(`Remove blog ${blog.title} by ${blog.author}? `)) {
            dispatch(removeBlog(blog.id))
            navigate('/')
        }
    }
    const deleteButton = {
        color: 'red',
    }

    console.log(blog)
    if (!blog) {
        return null
    }

    return (
        <div >
            <h2>{blog.title}</h2>
            <p>
                <a href={blog.url}>{blog.url}</a>
            </p>
            <p>
                {blog.likes} likes <button onClick={addLike}>like</button>
            </p>
            <p>
                added by {blog.user.name}
            </p>
            {user.id === blog.user.id &&
                <p>
                    <button style={deleteButton} onClick={deleteBlog}>remove blog</button>
                </p>}
        </div>
    )
}

export default BlogView