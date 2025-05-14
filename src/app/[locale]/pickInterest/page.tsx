'use client'

import React from 'react'

import { useRouter } from 'next/navigation'

import { AxiosResponse } from 'axios'
import { useTranslations } from 'next-intl'

import {
  BookPageIcon,
  CameraIcon,
  GameControllerIcon,
  HammerIcon,
  HangerIcon,
  MegaphoneIcon,
  MusicNoteIcon,
  PencilAndOutlineIcon,
  PencilAndRullerIcon,
  PencilAndScribeIcon,
  PhotoArtFrameIcon,
  ScissorsIcon,
  TheaterMaskIcon,
} from '../../../components/ui/icons/InterestIcons/index'
import { Button } from '@/components/ui/Button'
import { Colors, InterestButton } from '@/components/ui/InterestButton'
import { Text } from '@/components/ui/Text'
import { useArray } from '@/hooks/useArray'
import useTokenCheck from '@/hooks/useToken'
import { api } from '@/utils/api'
import { getToken } from '@/utils/token'

export default function TesButtonPage() {
  useTokenCheck()
  const t = useTranslations('Interests')
  const selectedInterests = useArray<string>([])
  const router = useRouter()

  const FIRSTCOLOR = 1
  const SECONDCOLOR = 2

  const MININTERESTS = 2
  const MAXINTERESTS = 4

  const LIMITOFTHREE = 3

  const colorMapper = (index: number): Colors => {
    if (index === FIRSTCOLOR) {
      return 'primary'
    }
    if (index === SECONDCOLOR) {
      return 'secondary'
    }
    return 'support'
  }

  const sendInterests = async () => {
    if (
      selectedInterests.length > MININTERESTS &&
      selectedInterests.length < MAXINTERESTS
    ) {
      try {
        await api(getToken())
          .post(
            '/user/interests',
            {
              interest: selectedInterests.array,
            },
            {
              headers: {
                'Content-Type': 'application/json',
              },
            },
          )
          .then((_: AxiosResponse) => {
            router.push('/home')
          })
      } catch {}
    }
  }

  return (
    <div className="bg-background h-full">
      <div className="flex justify-around min-h-screen flex-col items-center">
        <div className="flex flex-col items-center justify-center ">
          <Text
            as="h1"
            size="t1"
            className="text-primary pt-8"
          >
            {t('title')}
          </Text>
          <Text
            as="h2"
            size="cap1"
            className="text pt-1 pb-10"
          >
            {t('choice')}
          </Text>
        </div>
        <div className="flex flex-col items-center gap-2 w-screen max-w-100 ">
          <div className="flex gap-2 min-w-8/10">
            <InterestButton
              icon={<PencilAndScribeIcon className="w-7 h-7" />}
              title={t('writing')}
              color={colorMapper(selectedInterests.indexOf('writing'))}
              size="sm"
              isSelected={selectedInterests.contains('writing')}
              onClick={() => {
                if (selectedInterests.contains('writing')) {
                  selectedInterests.remove('writing')
                } else if (selectedInterests.length < LIMITOFTHREE) {
                  selectedInterests.push('writing')
                }
              }}
            />
            <InterestButton
              icon={<MusicNoteIcon className="w-7 h-7 " />}
              title={t('music')}
              color={colorMapper(selectedInterests.indexOf('music'))}
              size="sm"
              isSelected={selectedInterests.contains('music')}
              onClick={() => {
                if (selectedInterests.contains('music')) {
                  selectedInterests.remove('music')
                } else if (selectedInterests.length < LIMITOFTHREE) {
                  selectedInterests.push('music')
                }
              }}
            />
          </div>
          <div className="flex gap-2 justify-end min-w-9/10">
            <InterestButton
              icon={<BookPageIcon className="w-7 h-7" />}
              title={t('literature')}
              color={colorMapper(selectedInterests.indexOf('literature'))}
              size="sm"
              isSelected={selectedInterests.contains('literature')}
              onClick={() => {
                if (selectedInterests.contains('literature')) {
                  selectedInterests.remove('literature')
                } else if (selectedInterests.length < LIMITOFTHREE) {
                  selectedInterests.push('literature')
                }
              }}
            />
            <InterestButton
              icon={<PencilAndRullerIcon className="w-7 h-7" />}
              title={t('design')}
              color={colorMapper(selectedInterests.indexOf('design'))}
              size="sm"
              isSelected={selectedInterests.contains('design')}
              onClick={() => {
                if (selectedInterests.contains('design')) {
                  selectedInterests.remove('design')
                } else if (selectedInterests.length < LIMITOFTHREE) {
                  selectedInterests.push('design')
                }
              }}
            />
          </div>
          <div className="flex gap-2 justify-start min-w-7/10">
            <InterestButton
              icon={<CameraIcon className="w-7 h-7" />}
              title={t('photography')}
              color={colorMapper(selectedInterests.indexOf('photography'))}
              size="sm"
              isSelected={selectedInterests.contains('photography')}
              onClick={() => {
                if (selectedInterests.contains('photography')) {
                  selectedInterests.remove('photography')
                } else if (selectedInterests.length < LIMITOFTHREE) {
                  selectedInterests.push('photography')
                }
              }}
            />
            <InterestButton
              icon={<GameControllerIcon className="w-7 h-7" />}
              title={t('games')}
              color={colorMapper(selectedInterests.indexOf('games'))}
              size="sm"
              isSelected={selectedInterests.contains('games')}
              onClick={() => {
                if (selectedInterests.contains('games')) {
                  selectedInterests.remove('games')
                } else if (selectedInterests.length < LIMITOFTHREE) {
                  selectedInterests.push('games')
                }
              }}
            />
          </div>
          <div className="flex gap-2 justify-start min-w-9/10">
            <InterestButton
              icon={<HangerIcon className="w-7 h-7" />}
              title={t('fashion')}
              color={colorMapper(selectedInterests.indexOf('fashion'))}
              size="sm"
              isSelected={selectedInterests.contains('fashion')}
              onClick={() => {
                if (selectedInterests.contains('fashion')) {
                  selectedInterests.remove('fashion')
                } else if (selectedInterests.length < LIMITOFTHREE) {
                  selectedInterests.push('fashion')
                }
              }}
            />
            <InterestButton
              icon={<ScissorsIcon className="w-7 h-7" />}
              title={t('crafts')}
              color={colorMapper(selectedInterests.indexOf('crafts'))}
              size="sm"
              isSelected={selectedInterests.contains('crafts')}
              onClick={() => {
                if (selectedInterests.contains('crafts')) {
                  selectedInterests.remove('crafts')
                } else if (selectedInterests.length < LIMITOFTHREE) {
                  selectedInterests.push('crafts')
                }
              }}
            />
          </div>
          <div className="flex gap-2 justify-end  min-w-7/10">
            <InterestButton
              icon={<MegaphoneIcon className="w-7 h-7" />}
              title={t('marketing')}
              color={colorMapper(selectedInterests.indexOf('marketing'))}
              size="sm"
              isSelected={selectedInterests.contains('marketing')}
              onClick={() => {
                if (selectedInterests.contains('marketing')) {
                  selectedInterests.remove('marketing')
                } else if (selectedInterests.length < LIMITOFTHREE) {
                  selectedInterests.push('marketing')
                }
              }}
            />
            <InterestButton
              icon={<HammerIcon className="w-7 h-7" />}
              title={t('sculpture')}
              color={colorMapper(selectedInterests.indexOf('sculpture'))}
              size="sm"
              isSelected={selectedInterests.contains('sculpture')}
              onClick={() => {
                if (selectedInterests.contains('sculpture')) {
                  selectedInterests.remove('sculpture')
                } else if (selectedInterests.length < LIMITOFTHREE) {
                  selectedInterests.push('sculpture')
                }
              }}
            />
          </div>
          <div className="flex gap-2 justify-start min-w-7/10">
            <InterestButton
              icon={<TheaterMaskIcon className="w-7 h-7" />}
              title={t('theatre')}
              color={colorMapper(selectedInterests.indexOf('theatre'))}
              size="sm"
              isSelected={selectedInterests.contains('theatre')}
              onClick={() => {
                if (selectedInterests.contains('theatre')) {
                  selectedInterests.remove('theatre')
                } else if (selectedInterests.length < LIMITOFTHREE) {
                  selectedInterests.push('theatre')
                }
              }}
            />
            <InterestButton
              icon={<PencilAndOutlineIcon className="w-7 h-7" />}
              title={t('illustration')}
              color={colorMapper(selectedInterests.indexOf('illustration'))}
              size="sm"
              isSelected={selectedInterests.contains('illustration')}
              onClick={() => {
                if (selectedInterests.contains('illustration')) {
                  selectedInterests.remove('illustration')
                } else if (selectedInterests.length < LIMITOFTHREE) {
                  selectedInterests.push('illustration')
                }
              }}
            />
          </div>
          <div className="flex gap-2 justify-center">
            <InterestButton
              icon={<PhotoArtFrameIcon className="w-7 h-7" />}
              title={t('art')}
              color={colorMapper(selectedInterests.indexOf('art'))}
              size="sm"
              isSelected={selectedInterests.contains('art')}
              onClick={() => {
                if (selectedInterests.contains('art')) {
                  selectedInterests.remove('art')
                } else if (selectedInterests.length < LIMITOFTHREE) {
                  selectedInterests.push('art')
                }
              }}
            />
          </div>
        </div>

        <div className="pb-3 pt-3 ">
          <Button
            size="md"
            variant="filled"
            onClick={sendInterests}
          >
            {t('allDone')}
          </Button>
        </div>
      </div>
    </div>
  )
}
