'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useRouter } from 'next/navigation'

import { useReactContext } from './ReactContextProvider'

import axios from 'axios'

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
  User,
  Link as UILink,
} from '@nextui-org/react'

export default function NavBar() {
  const pathname = usePathname()

  const userData = useReactContext()

  const router = useRouter()

  async function onSignOut() {
    try {
      await axios.post(
        'https://ticketing.dev/api/users/signout',
      )
      router.push('/auth/signup')
      router.refresh()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Navbar
      className={`${pathname === '/auth/signup' || '/auth/login'? 'fixed' : 'sticky'} top-0`}
    >
      <NavbarBrand>
        <Link href={'/'}>
          <p className='font-bold text-inherit'>Ticketing</p>
        </Link>
      </NavbarBrand>
      <NavbarContent justify='end'>
        {userData?.email && userData?.id ? (
          <>
            <User
              name={userData.email}
              description={
                <UILink
                  href='https://twitter.com/jrgarciadev'
                  size='sm'
                  isExternal
                >
                  id: {userData.id}
                </UILink>
              }
              avatarProps={{
                src: 'https://images.unsplash.com/broken',
              }}
            />
            <NavbarItem>
              <Button color='danger' variant='flat' onClick={onSignOut}>
                Sign Out
              </Button>
            </NavbarItem>
          </>
        ) : (
          <>
            <NavbarItem className='flex'>
              <Link href='/auth/login'>Login</Link>
            </NavbarItem>
            <NavbarItem>
              <Button
                as={Link}
                color='primary'
                href='/auth/signup'
                variant='flat'
              >
                Sign Up
              </Button>
            </NavbarItem>
          </>
        )}
      </NavbarContent>
    </Navbar>
  )
}
