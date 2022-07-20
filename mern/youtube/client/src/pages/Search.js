import React from 'react'
import { useLocation } from 'react-router'

export default function Search() {
    const query = useLocation()
    console.log(query)
  return (
    <div>Search</div>
  )
}
