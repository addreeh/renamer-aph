'use client'

import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'

interface SeasonConfigProps {
  seasonNumber: number
  isOver100: boolean
  onSeasonChange: (value: number) => void
  onIsOver100Change: (value: boolean) => void
}

export function SeasonConfig ({
  seasonNumber,
  isOver100,
  onSeasonChange,
  onIsOver100Change
}: SeasonConfigProps): JSX.Element {
  return (
    <div className='space-y-4'>
      <div className='space-y-2'>
        <Label htmlFor='season'>Season Number</Label>
        <Input
          id='season'
          type='number'
          className='font-mono'
          min={1}
          value={seasonNumber}
          // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
          onChange={(e) => onSeasonChange(parseInt(e.target.value) || 1)}
        />
      </div>

      <div className='flex items-center space-x-2'>
        <Switch
          id='over100'
          checked={isOver100}
          onCheckedChange={onIsOver100Change}
        />
        <Label htmlFor='over100'>Episodes over 100</Label>
      </div>
    </div>
  )
}
