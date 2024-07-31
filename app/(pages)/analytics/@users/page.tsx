'use client'
import { Card } from "@chakra-ui/react"
import Link from "next/link"

const Users = () => {
  return (
    <Card height={400} padding={10}>users <br/><Link href={'/analytics/unauthorized-users'}>Unauthorized</Link></Card>
  )
}

export default Users