'use client'
import { useIsMobile } from '@/hooks/useIsMobile'
import Navbar from './Navbar'
import MobileNavbar from './MobileNavbar'

export default function NavbarWrapper() {
  const isMobile = useIsMobile()
  return isMobile ? <MobileNavbar /> : <Navbar />
}
