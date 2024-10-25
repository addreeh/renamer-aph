'use client'

import { useState } from 'react'
import { FileList } from '@/components/file-list'
import { RenamePreview } from '@/components/rename-preview'
import { ContentTypeSelector } from '@/components/content-type-selector'
import { SeasonConfig } from '@/components/season-config'
import { SystemCommands } from '@/components/system-commands'
import { FileText, Settings2 } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { ThemeToggle } from '@/components/theme-toggle'
import { Toaster } from '@/components/ui/toaster'

export default function Home (): JSX.Element {
  const [contentType, setContentType] = useState<'tv' | 'other'>('tv')
  const [seasonNumber, setSeasonNumber] = useState(1)
  const [isOver100, setIsOver100] = useState(false)
  const [fileList, setFileList] = useState<string[]>([])
  const [pattern, setPattern] = useState('')

  return (
    <div className='min-h-screen bg-background'>
      <div className='fixed inset-0'>
        {/* Grid background */}
        <div className='absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] dark:opacity-100 opacity-50' />
        {/* Gradient overlay */}
        <div className='absolute inset-0'>
          <div
            className='absolute left-1/2 top-0 -translate-x-1/2'
            style={{
              width: '1100px',
              height: '600px',
              background: 'radial-gradient(circle at center, #fbfbfb36 0%, transparent 70%)'
            }}
          />
        </div>
      </div>

      <div className='relative min-h-screen flex flex-col items-center px-6'>
        <div className='w-full max-w-4xl'>
          <header className='flex items-center justify-between py-6 shrink-0'>
            <div className='flex items-center gap-2'>
              <Settings2 className='h-6 w-6 text-primary' />
              <h1 className='text-3xl font-bold'>Renamer APH</h1>
            </div>
            <div className='flex items-center gap-4'>
              <div className='text-sm text-muted-foreground'>
                Batch File Renaming Tool
              </div>
              <ThemeToggle />
            </div>
          </header>

          <div className='overflow-hidden my-auto'>
            <div className='h-full grid gap-6 md:grid-cols-2'>
              <Card className='flex flex-col bg-background/80 backdrop-blur-sm border-border/50'>
                <CardHeader>
                  <CardTitle className='flex items-center gap-2'>
                    <FileText className='h-5 w-5' />
                    Configuration
                  </CardTitle>
                </CardHeader>
                <CardContent className='flex-1 overflow-auto'>
                  <div className='space-y-4'>
                    <ContentTypeSelector
                      value={contentType}
                      onChange={setContentType}
                    />

                    {contentType === 'tv' && (
                      <SeasonConfig
                        seasonNumber={seasonNumber}
                        isOver100={isOver100}
                        onSeasonChange={setSeasonNumber}
                        onIsOver100Change={setIsOver100}
                      />
                    )}

                    <Separator />

                    <FileList
                      files={fileList}
                      onChange={setFileList}
                      pattern={pattern}
                      onPatternChange={setPattern}
                    />
                  </div>
                </CardContent>
              </Card>

              <div className='flex flex-col gap-6'>
                <Card className='flex-1 bg-background/80 backdrop-blur-sm border-border/50'>
                  <CardHeader>
                    <CardTitle className='flex items-center gap-2'>
                      <FileText className='h-5 w-5' />
                      Preview
                    </CardTitle>
                  </CardHeader>
                  <CardContent className='h-[calc(100%-5rem)]'>
                    <RenamePreview
                      files={fileList}
                      pattern={pattern}
                      seasonNumber={seasonNumber}
                      isOver100={isOver100}
                    />
                  </CardContent>
                </Card>

                <Card className='shrink-0 bg-background/80 backdrop-blur-sm border-border/50'>
                  <CardContent className='pt-6'>
                    <SystemCommands
                      files={fileList}
                      pattern={pattern}
                      seasonNumber={seasonNumber}
                      isOver100={isOver100}
                    />
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  )
}
