import React, { useContext } from 'react'
import CartContext from '../context/CartContext'

const LogOut = () => {
  const {logout} = useContext(CartContext)
  return (
    <>
    <main className='log-out border border-2 bg-white  p-3'>
        <h4 role='button' onClick={logout}>Log Out</h4>
    </main>
    </>
  )
}

export default LogOut