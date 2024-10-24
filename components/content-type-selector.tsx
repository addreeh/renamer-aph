'use client'

import { Tv, Files } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface ContentTypeSelectorProps {
  value: 'tv' | 'other'
  onChange: (value: 'tv' | 'other') => void
}

export function ContentTypeSelector ({ value, onChange }: ContentTypeSelectorProps): JSX.Element {
  return (
    <div className='space-y-2'>
      <label className='text-sm font-medium'>Content Type</label>
      <div className='grid grid-cols-2 gap-2'>
        <Button
          variant={value === 'tv' ? 'default' : 'outline'}
          className='w-full'
          onClick={() => onChange('tv')}
        >
          <Tv className='mr-2 h-4 w-4' />
          TV Series
        </Button>
        <Button
          variant={value === 'other' ? 'default' : 'outline'}
          className='w-full'
          disabled
          onClick={() => onChange('other')}
        >
          <Files className='mr-2 h-4 w-4' />
          Other
        </Button>
      </div>
    </div>
  )
}
