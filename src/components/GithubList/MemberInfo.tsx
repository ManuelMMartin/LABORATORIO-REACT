import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import './MemberInfo.css'


interface MemberDetailEntity {
  login: string
  avatar_url: string
  id: number
  company: string
  bio: string
}

export const MemberInfo = () => {
  const { login } = useParams()
  const [member, setMember] = useState<MemberDetailEntity>()
  const navigate = useNavigate()
  
  useEffect(() => {
    fetch(`https://api.github.com/users/${login}`)
      .then((response) => response.json())
      .then(setMember)
  }, [login])

  return (
    <div className="member-info">
      {
        member
          ? (
            <>
              <img src={member.avatar_url} />
              <h3>{member.login}</h3>
              <h4>ID: {member.id}</h4>
              <h4>Company: {member.company}</h4>
              <h4>{member.bio}</h4>

            </>) :
          (<div>Cargando....</div>)
      }
      <button onClick={() => (navigate(-1))}>Volver</button>
    </div>
  )
}