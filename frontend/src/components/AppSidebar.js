import React,{useState,useEffect} from 'react'
import { NavLink } from 'react-router-dom'
import dashboardIcon from "../assets/images/icons/dashboard.png";
import salesIcon from "../assets/images/icons/sales.png"
import purchaseIcon from "../assets/images/icons/purchase.png"
import collectionIcon from "../assets/images/icons/collection.png"
import '../scss/sidebar.css'
const AppSidebar = ({children}) => {
  const [isOpen, setIsOpen] = useState(true)
  const toggle=()=>{
    isOpen ? setIsOpen(false):setIsOpen(true);
    console.log(isOpen)
  }
  
  
 const menuItem =[
  {
    path:{},
    name:"Dashboard",
    icon:<img src={dashboardIcon}/>
  },
  {
    path:{},
    name:"Sales",
    icon:<img src={salesIcon}/>
  },
  {
    path:{},
    name:"Purchase",
    icon:<img src={purchaseIcon}/>
  },
  {
    path:{},
    name:"Collection",
    icon:<img src={collectionIcon}/>
  }

 ]
  return (
    <div className="container">
     <div className='sidebar' >
      
      {
        menuItem.map(
          (item,index)=>{return(
<NavLink to={item.path} key={index} className="link" onClick={toggle}>
  
  <div className='icon'>{item.icon}</div>
  <div className="link_text" >{item.name}</div>
  
  
</NavLink>
        )}
        )
      }
     </div>
     <main>{children}</main>
    </div>
  )
}

export default AppSidebar;
