'use client'

import { useState } from 'react'
import { Code2, Copy } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useToast } from '@/hooks/use-toast'

interface SystemCommandsProps {
  files: string[]
  pattern: string
  seasonNumber: number
  isOver100: boolean
}

export function SystemCommands ({
  files,
  pattern,
  seasonNumber,
  isOver100
}: SystemCommandsProps): JSX.Element {
  const { toast } = useToast()
  const [platform, setPlatform] = useState<'linux' | 'windows'>('linux')

  const getNewFilename = (originalFile: string, index: number): string => {
    if (pattern === null) return originalFile
    const paddedSeason = seasonNumber.toString().padStart(2, '0')
    const paddedEpisode = isOver100
      ? (index + 1).toString().padStart(3, '0')
      : (index + 1).toString().padStart(2, '0')
    return pattern
      .replace('$', paddedSeason)
      .replace('$$', paddedEpisode)
  }

  const getCommands = (previewOnly: boolean): string[] => {
    if (platform === 'linux') {
      return files.map((file, index) => {
        const newName = getNewFilename(file, index)
        return previewOnly
          ? `echo "Would rename '${file}' to '${newName}'"`
          : `mv "${file}" "${newName}"`
      })
    } else {
      return files.map((file, index) => {
        const newName = getNewFilename(file, index)
        return previewOnly
          ? `echo Would rename "${file}" to "${newName}"`
          : `ren "${file}" "${newName}"`
      })
    }
  }

  const getScriptContent = (previewOnly: boolean): string => {
    if (platform === 'linux') {
      return `#!/bin/bash\n\n${getCommands(previewOnly).join('\n')}`
    } else {
      return `@echo off\n${getCommands(previewOnly).join('\n')}`
    }
  }

  const copyToClipboard = (text: string): void => {
    void navigator.clipboard.writeText(text)
    toast({
      title: 'Copied to clipboard',
      description: 'The commands have been copied to your clipboard.'
    })
  }

  return (
    <div className='space-y-4'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-2'>
          <Code2 className='h-5 w-5' />
          <h3 className='font-semibold'>System Commands</h3>
        </div>
      </div>

      <Tabs defaultValue='preview' className='w-full'>
        <TabsList className='grid w-full grid-cols-2'>
          <TabsTrigger value='preview'>Preview Commands</TabsTrigger>
          <TabsTrigger value='rename'>Rename Commands</TabsTrigger>
        </TabsList>

        <div className='mt-4 space-y-4'>
          <div className='flex justify-end space-x-2'>
            <Button
              variant='outline'
              size='sm'
              onClick={() => setPlatform('linux')}
              className={platform === 'linux' ? 'bg-primary text-primary-foreground' : ''}
            >
              Linux
            </Button>
            <Button
              variant='outline'
              size='sm'
              onClick={() => setPlatform('windows')}
              className={platform === 'windows' ? 'bg-primary text-primary-foreground' : ''}
            >
              Windows
            </Button>
          </div>

          <TabsContent value='preview' className='mt-0'>
            <ScrollArea className='h-[200px] rounded-md border bg-muted p-4'>
              <pre className='font-mono text-sm'>
                {getScriptContent(true)}
              </pre>
            </ScrollArea>
            <Button
              variant='outline'
              size='sm'
              className='mt-2'
              onClick={() => copyToClipboard(getScriptContent(true))}
            >
              <Copy className='mr-2 h-4 w-4' />
              Copy Preview Script
            </Button>
          </TabsContent>

          <TabsContent value='rename' className='mt-0'>
            <ScrollArea className='h-[200px] rounded-md border bg-muted p-4'>
              <pre className='font-mono text-sm'>
                {getScriptContent(false)}
              </pre>
            </ScrollArea>
            <Button
              variant='outline'
              size='sm'
              className='mt-2'
              onClick={() => copyToClipboard(getScriptContent(false))}
            >
              <Copy className='mr-2 h-4 w-4' />
              Copy Rename Script
            </Button>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  )
}
