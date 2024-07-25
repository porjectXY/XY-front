/* import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'

const ProfileId = () => {
  const { userId } = useParams()
  const [user, setUser] = useState({})
  const [posts, setPosts] = useState([])
  const [followers, setFollowers] = useState([])
  const [following, setFollowing] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`{{LOCAL}}/users/${userId}/profile`)
        setUser(response.data.user)
        setPosts(response.data.posts || []) // Asegúrate de que `posts` sea un array
        setFollowers(response.data.followers || []) // Asegúrate de que `followers` sea un array
        setFollowing(response.data.following || []) // Asegúrate de que `following` sea un array
        setLoading(false)
      } catch (error) {
        console.error('Error fetching user profile data:', error)
        setLoading(false)
      }
    }

    fetchData()
  }, [userId])

  if (loading) {
    return <div>Cargando...</div>
  }

  return (
    <div>
      <h1>Perfil de {user.username}</h1>
      <div>
        <h2>Seguidores</h2>
        <ul>
          {followers.map((follower) => (
            <li key={follower._id}>{follower.username}</li>
          ))}
        </ul>
      </div>
      <div>
        <h2>Siguiendo</h2>
        <ul>
          {following.map((follow) => (
            <li key={follow._id}>{follow.username}</li>
          ))}
        </ul>
      </div>
      <div>
        <h2>Publicaciones</h2>
        <ul>
          {Array.isArray(posts)
            ? (
                posts.map((post) => (
                  <li key={post._id}>{post.content}</li>
                ))
              )
            : (
              <p>No hay publicaciones para mostrar.</p>
              )}
        </ul>
      </div>
    </div>
  )
}

export default ProfileId */
