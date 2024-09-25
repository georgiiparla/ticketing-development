import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from '@nextui-org/navbar'
import { Button } from '@nextui-org/button'
import Link from 'next/link'

export default function NavBar() {
  return (
    <Navbar className='fixed top-0'>
      <NavbarBrand>
        <Link href={'/'}>
          <p className='font-bold text-inherit'>Ticketing</p>
        </Link>
      </NavbarBrand>
      <NavbarContent justify='end'>
        <NavbarItem className='flex'>
          <Link href='#'>Login</Link>
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} color='primary' href='/auth/signup' variant='flat'>
            Sign Up
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  )
}
