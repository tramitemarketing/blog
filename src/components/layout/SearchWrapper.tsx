'use client'
import { useIsMobile } from '@/hooks/useIsMobile'
import SearchOverlay from './SearchOverlay'
import MobileSearchSheet from './MobileSearchSheet'

export default function SearchWrapper() {
  const isMobile = useIsMobile()
  return isMobile ? <MobileSearchSheet /> : <SearchOverlay />
}
