import reactLogo from '../assets/react.svg'
import './Header.css'

export function Header() {

  return (
    <header className='header'>
      <h1>LABORATORIO</h1>
      <img src={reactLogo} className="logo" alt="React logo" />
    </header>
  )
}
