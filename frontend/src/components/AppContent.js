import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Dashboard from 'src/components/Dashboard'
import routes from '../routes'
// routes config


const AppContent = () => {
  return (
   <Routes>
    {routes.map((route, idx) => {
      return (
        route.element && (
          <Route
            key={idx}
            path={route.path} 
            element={<route.element />}
          />
        )
      )
    })}
    </Routes>
   
  )
}

export default React.memo(AppContent)
