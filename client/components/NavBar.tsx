'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { CurrentUser } from '@/lib/definitions'

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
  User,
  Link as UILink,
} from '@nextui-org/react'

export default function NavBar({
  currentUser,
}: {
  currentUser: CurrentUser | null
}) {
  const pathname = usePathname()

  return (
    <Navbar
      className={`${pathname === '/auth/signup' ? 'fixed' : 'sticky'} top-0`}
    >
      <NavbarBrand>
        <Link href={'/'}>
          <p className='font-bold text-inherit'>Ticketing</p>
        </Link>
      </NavbarBrand>
      <NavbarContent justify='end'>
        {currentUser ? (
          <User
            name={currentUser.email}
            description={
              <UILink
                href='https://twitter.com/jrgarciadev'
                size='sm'
                isExternal
              >
                id: {currentUser.id}
              </UILink>
            }
            avatarProps={{
              src: 'https://images.unsplash.com/broken',
            }}
          />
        ) : (
          <>
            <NavbarItem className='flex'>
              <Link href='#'>Login</Link>
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
