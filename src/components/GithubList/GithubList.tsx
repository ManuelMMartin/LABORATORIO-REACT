import { useState, useEffect } from 'react'
import { MemberEntity } from '../../model'
import { generatePath, useNavigate } from 'react-router-dom'
import { useSearch } from './SearchContext'
import './GithubList.css'
import { TableHeaders } from '../TableHeader'
import { fetchOrg } from '../../api/apiService'
import { PaginationComponent } from '../PaginationComponent'



export function GithubList() {
  const [members, setMembers] = useState<MemberEntity[]>([])
  const { organizacion, setOrganizacion } = useSearch()
  const { currentPage, setCurrentPage } = useSearch()
  const [perPage] = useState(10)
  const [next, setNext] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    buscarMiembros()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage])

  const buscarMiembros = () => {
    fetchOrg(organizacion, currentPage, perPage).then(setMembers)
      .catch((error) => console.error('Error fetching data:', error));

    // no es la mejor manera de comprobar si hay mas miembros despues de la llamada, pero la api no da informacion
    fetchOrg(organizacion, currentPage + 1, perPage).then((data) => {
      data.length === 0 ? setNext(false) : setNext(true)
    })
  }

  const handleInputKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setCurrentPage(1)
      buscarMiembros()
    }
  }

  const handlePagination = (mod: boolean) => {
    setCurrentPage(
      (prev) =>
        mod
          ? (next ? prev + 1 : prev)
          : (currentPage === 1 ? prev : prev - 1)
    )
  }

  const buscar = () => {
    buscarMiembros()
    setCurrentPage(1)
  }

  return (
    <main className='main'>
      <div className='input_container'>
        <input onKeyDown={handleInputKeyPress} className='input_table' type="text" value={organizacion} onChange={(e) => setOrganizacion(e.target.value)} />
        <button className='button_table' onClick={buscar}>Buscar</button>
        <button className='button_table' onClick={() => (navigate('/'))}>Volver</button>
      </div>
      {members.length === 0 ? (
        <p>Introduce una organización valida mostrar sus miembros</p>
      ) : (
        <>
          <table>
            <TableHeaders headers={["Avatar", "Id", "Login"]} />
            <tbody>
              {members.map((member) => (
                <tr className='SelectRow' onClick={() => (navigate(generatePath(`/list/detail/:login`, { login: member.login })))} key={member.id}>
                  <td>
                    <img
                      className='elemento'
                      src={member.avatar_url}
                      alt={`avatar de ${member.login}`}
                    />
                  </td>
                  <td>{member.id}</td>
                  <td>{member.login}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <PaginationComponent
            setCurrentPage={setCurrentPage}
            handlePagination={handlePagination}
            currentPage={currentPage} />
        </>
      )}
    </main>
  )
}
