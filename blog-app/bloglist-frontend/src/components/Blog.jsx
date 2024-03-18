import { useState } from 'react'
import PropTypes from 'prop-types'
import { likeBlog, removeBlog } from '../reducers/blogReducer'
import { useDispatch, useSelector } from 'react-redux'

const Blog = ({ blog }) => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)
    const [visibleDetails, setVisibleDetails] = useState(false)

    const showWhenVisible = { display: visibleDetails ? '' : 'none' }

    const toggleVisibility = () => {
        setVisibleDetails(!visibleDetails)
    }

    const addLike = (event) => {
        event.preventDefault()
        dispatch(likeBlog(blog))
    }

    const deleteBlog = (event) => {
        event.preventDefault()
        if (window.confirm(`Remove blog ${blog.title} by ${blog.author}? `)) {
            dispatch(removeBlog(blog.id))
        }

    }

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }

    const deleteButton = {
        color: 'red',
    }

    return (
        <div style={blogStyle} data-testid="blog">
            <p>{blog.title} {blog.author}
                <button onClick={toggleVisibility}>{visibleDetails ? 'hide' : 'view'}</button>
            </p>
            <div style={showWhenVisible} className='blogDetails'>
                <p>
                    <span>{blog.url}</span>
                </p>
                <p>
                    <span data-testid="likes">{blog.likes}</span>
                    <button onClick={addLike}>like</button>
                </p>
                <span>{blog.user.name}</span>
                {user.id === blog.user.id &&
                    <p>
                        <button style={deleteButton} onClick={deleteBlog}>remove blog</button>
                    </p>}
            </div>
        </div>
    )
}

Blog.propTypes = {
    blog: PropTypes.object.isRequired
}

export default Blog