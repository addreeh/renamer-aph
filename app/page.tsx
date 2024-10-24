"use client";

import { useState } from "react";
import { FileList } from "@/components/file-list";
import { RenamePreview } from "@/components/rename-preview";
import { ContentTypeSelector } from "@/components/content-type-selector";
import { SeasonConfig } from "@/components/season-config";
import { SystemCommands } from "@/components/system-commands";
import { FileText, Settings2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ThemeToggle } from "@/components/theme-toggle";
import { Toaster } from "@/components/ui/toaster";

export default function Home() {
  const [contentType, setContentType] = useState<"tv" | "other">("tv");
  const [seasonNumber, setSeasonNumber] = useState(1);
  const [isOver100, setIsOver100] = useState(false);
  const [fileList, setFileList] = useState<string[]>([]);
  const [pattern, setPattern] = useState("");

  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-muted p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Settings2 className="h-6 w-6 text-primary" />
            <h1 className="text-3xl font-bold">Renamer APH</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-sm text-muted-foreground">
              Batch File Renaming Tool
            </div>
            <ThemeToggle />
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Configuration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <ContentTypeSelector
                value={contentType}
                onChange={setContentType}
              />
              
              {contentType === "tv" && (
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
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Preview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <RenamePreview
                  files={fileList}
                  pattern={pattern}
                  seasonNumber={seasonNumber}
                  isOver100={isOver100}
                />
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
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
      <Toaster />
    </main>
  );
}