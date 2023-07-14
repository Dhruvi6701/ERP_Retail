import React from "react";
const Dashboard = React.lazy(()=> import('./components/Dashboard'))

const routes=[
    {path:'/', element: Dashboard }
]
export default routes