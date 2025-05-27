'use client'

import React from 'react'

import { usePathname, useRouter } from 'next/navigation'

import { useTranslations } from 'next-intl'

import { ExerciseIcon } from './icons/ExerciseIcon'
import { HomeIcon } from './icons/HomeIcon'
import { LibraryIcon } from './icons/LibraryIcon'
import { ProfileIcon } from './icons/ProfileIcon'
import { Text } from '@/components/ui/Text'

enum MenuItems {
  Home,
  Library,
  Exercise,
  Profile,
}

type MenuRoutes = {
  [key in MenuItems]: string
}

type MenuItem = {
  entry: MenuItems
  title: string
  icon: React.ReactNode
  onClick: () => void
  isSelected: boolean
}

// TODO: Add the real routes
const menuRoutes: MenuRoutes = {
  [MenuItems.Home]: '/home',
  [MenuItems.Library]: '/library',
  [MenuItems.Exercise]: '/exercises',
  [MenuItems.Profile]: '/profile',
}

// do not call this outside Next context (router initialization)
function useMenuItems(): MenuItem[] {
  const router = useRouter()
  const pathname = usePathname()
  const t = useTranslations('Menu')

  return [
    {
      entry: MenuItems.Home,
      title: t('home'),
      icon: <HomeIcon className="w-7 h-7" />,
      onClick: () => router.push(menuRoutes[MenuItems.Home]),
      isSelected: pathname === menuRoutes[MenuItems.Home],
    },
    {
      entry: MenuItems.Exercise,
      title: t('exercises'),
      icon: <ExerciseIcon className="w-7 h-7 " />,
      onClick: () => router.push(menuRoutes[MenuItems.Exercise]),
      isSelected: pathname.includes(menuRoutes[MenuItems.Exercise]),
    },
    {
      entry: MenuItems.Library,
      title: t('library'),
      icon: <LibraryIcon className="w-7 h-7 " />,
      onClick: () => {
        router.push(menuRoutes[MenuItems.Library])
      },
      isSelected: pathname.includes(menuRoutes[MenuItems.Library]),
    },
    {
      entry: MenuItems.Profile,
      title: t('profile'),
      icon: <ProfileIcon className="w-7 h-7 " />,
      onClick: () => router.push(menuRoutes[MenuItems.Profile]),
      isSelected: pathname.includes(menuRoutes[MenuItems.Profile]),
    },
  ]
}

export function Menu() {
  const menuItems = useMenuItems()
  return (
    <div className="flex gap-4 fixed bottom-0 left-0 right-0 z-50 pt-2 pb-4 justify-around items-center bg-background">
      {menuItems.map((item, index) => (
        <div
          key={index}
          onClick={item.onClick}
          className={`flex flex-col items-center cursor-pointer ${
            item.isSelected ? 'text-primary' : 'text-grey-1'
          }`}
        >
          {item.icon}
          <Text size="cap1">{item.title}</Text>
        </div>
      ))}
    </div>
  )
}
