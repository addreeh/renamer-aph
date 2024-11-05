'use client'

import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'

interface FileListProps {
  files: string[]
  onChange: (files: string[]) => void
  pattern: string
  onPatternChange: (pattern: string) => void
}

export function FileList ({
  files,
  onChange,
  pattern,
  onPatternChange
}: FileListProps): JSX.Element {
  return (
    <div className='space-y-4'>
      <div className='space-y-2'>
        <Label htmlFor='pattern'>Naming Pattern</Label>
        <Input
          id='pattern'
          placeholder='e.g., Show Name - S$E$$.mp4'
          className='font-mono'
          value={pattern}
          onChange={(e) => onPatternChange(e.target.value)}
        />
        <p className='text-xs text-muted-foreground'>
          Use $ for season number and $$ for episode number
        </p>
      </div>

      <div className='space-y-2'>
        <Label htmlFor='files'>File List</Label>
        <Textarea
          id='files'
          placeholder='Enter one filename per line...'
          className='font-mono text-sm h-64'
          value={files.join('\n')}
          onChange={(e) => onChange(e.target.value.split('\n').filter(Boolean))}
        />
      </div>
    </div>
  )
}
