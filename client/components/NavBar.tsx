'use client'

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from '@nextui-org/navbar'
import { Button } from '@nextui-org/button'
import Link from 'next/link'
import { User, Link as UILink } from "@nextui-org/react";

interface CurrentUser {
  email: string
  id: string
  iat: number
}

export default function NavBar({ currentUser }: { currentUser: CurrentUser | null }) {
  if (currentUser) {
    console.log("server side" + currentUser.email)
  } else {
    console.log(currentUser)
  }
  return (
    <Navbar className='fixed top-0'>
      <NavbarBrand>
        <Link href={'/'}>
          <p className='font-bold text-inherit'>Ticketing</p>
        </Link>
      </NavbarBrand>
      <NavbarContent justify='end'>
        {currentUser ? <User
          name={currentUser?.email}
          description={(
            <UILink href="https://twitter.com/jrgarciadev" size="sm" isExternal>
              id: {currentUser?.id}
            </UILink>
          )}
          avatarProps={{
            src: "https://images.unsplash.com/broken"
          }}
        /> : <><NavbarItem className='flex'>
          <Link href='#'>Login</Link>
        </NavbarItem>
          <NavbarItem>
            <Button as={Link} color='primary' href='/auth/signup' variant='flat'>
              Sign Up
            </Button>
          </NavbarItem></>}
      </NavbarContent>
    </Navbar>
  )
}
