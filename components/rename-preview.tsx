'use client'

import { ScrollArea } from '@/components/ui/scroll-area'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

interface RenamePreviewProps {
  files: string[]
  pattern: string
  seasonNumber: number
  isOver100: boolean
}

export function RenamePreview ({
  files,
  pattern,
  seasonNumber,
  isOver100
}: RenamePreviewProps): JSX.Element {
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

  return (
    <ScrollArea className='h-64 rounded-md border'>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className='w-12'>#</TableHead>
            <TableHead>Original Filename</TableHead>
            <TableHead>New Filename</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {files.map((file, index) => (
            <TableRow key={index}>
              <TableCell className='font-mono'>{index + 1}</TableCell>
              <TableCell className='font-mono'>{file}</TableCell>
              <TableCell className='font-mono'>
                {getNewFilename(file, index)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </ScrollArea>
  )
}
