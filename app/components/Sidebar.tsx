'use client'
import { BellIcon, ChatIcon, EditIcon } from "@chakra-ui/icons"
import { List, ListIcon, ListItem } from "@chakra-ui/react"
import { usePathname } from "next/navigation"
import Link from "next/link"


const Sidebar = () => {

    const pathname = usePathname()
    
    const menus = [
        {name: "Articles", href:'/articles', icon: ChatIcon},
        {name: "Create Article", href:"/create", icon: EditIcon},
        {name: "Analytics", href:"/analytics", icon: BellIcon}
    ]
    return (
        <List color={'white'} background={'#1a202c'} height={'100%'} fontSize={{base:'0.6em', md:'0.8em', lg:'1em'}} spacing={5} p={5} >
            {menus.map((link) => {
                const isActive = pathname.startsWith(link.href)
                return ( <ListItem>
                    <ListIcon as={link.icon}/>
                    <Link className={isActive ? 'text-teal-500 font-bold mr-4': 'text-white-500 mr-4'} href={link.href}>{link.name}</Link>
                </ListItem>)
            })}
           

           
            
        </List>
    )
}

export default Sidebar