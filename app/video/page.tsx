"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Play, Clock, Eye, Calendar, Star, X } from "lucide-react"

export default function VideoPage() {
  const [videos] = useState([
    {
      id: "1",
      title: "Flapjack - YouTube Video",
      thumbnail: "https://img.youtube.com/vi/o7DqgBkC4bY/maxresdefault.jpg",
      duration: "0:00",
      views: "N/A",
      uploadDate: "2024-04-22",
      category: "YouTube",
      rating: 5.0,
      videoUrl: "https://youtu.be/o7DqgBkC4bY?si=XXJgVUKr-iTPJ3xP",
      description: "Special YouTube video featuring Flapjack adventures."
    },
  ])

  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedVideo, setSelectedVideo] = useState<any>(null)

  const categories = [""]

  const filteredVideos = selectedCategory === "All" 
    ? videos 
    : videos.filter(video => video.category === selectedCategory)

  const handleVideoClick = (video: any) => {
    if (video.category === "YouTube" && video.videoUrl.startsWith("https://youtu.be")) {
      // Open YouTube video in popup
      const popup = window.open(video.videoUrl, 'video-popup', 'width=800,height=600,scrollbars=yes,resizable=yes')
      if (popup) {
        popup.focus()
      }
    } else {
      // For non-YouTube videos, show in modal
      setSelectedVideo(video)
    }
  }

  const closeModal = () => {
    setSelectedVideo(null)
  }

  const exportToJSON = () => {
    const dataStr = JSON.stringify(videos, null, 2)
    const blob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'videos.json'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="min-h-screen py-8 lg:py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-[family-name:var(--font-heading)] text-4xl md:text-5xl font-bold text-foreground mb-4">
            วิดีโอ Flapjack
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            รวมวิดีโอทั้งหมดจาก The Marvelous Misadventures of Flapjack 
            ตั้งแต่ตอนพิเศษไปจนถึงเบื้องหลังการสร้างแอนิเมชัน
          </p>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          {categories.map((category) => (
            <Badge 
              key={category}
              variant="outline" 
              className="text-sm cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              {category}
            </Badge>
          ))}
        </div>

        {/* Featured Video */}
        <div className="mb-12">
          <h2 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-foreground mb-6">
            วิดีโอแนะนำ
          </h2>
          <div onClick={() => handleVideoClick(videos[0])} className="cursor-pointer">
            <Card className="overflow-hidden group">
              <div className="relative aspect-video bg-muted">
                <img 
                  src={videos[0].thumbnail}
                  alt={videos[0].title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button size="lg" className="rounded-full w-20 h-20">
                    <Play className="h-8 w-8 ml-1" />
                  </Button>
                </div>
                <div className="absolute bottom-4 right-4 bg-black/80 text-white px-3 py-1 rounded text-sm">
                  {videos[0].duration}
                </div>
                <div className="absolute top-4 left-4">
                  <Badge variant="secondary" className="text-xs">
                    {videos[0].category}
                  </Badge>
                </div>
              </div>
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="font-[family-name:var(--font-heading)] text-xl font-semibold text-card-foreground mb-2">
                    {videos[0].title}
                  </h3>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                    <span className="flex items-center gap-1">
                      <Eye className="h-4 w-4" />
                      {videos[0].views} views
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {videos[0].uploadDate}
                    </span>
                  </div>
                  <p className="text-muted-foreground">
                    {videos[0].description}
                  </p>
                </div>
                <div className="flex items-center gap-1 ml-4">
                  <Star className="h-5 w-5 text-yellow-500 fill-current" />
                  <span className="font-semibold">{videos[0].rating}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        </div>

        {/* Video Grid */}
        <div className="mb-8">
          <h2 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-foreground mb-6">
            วิดีโอทั้งหมด
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.slice(1).map((video) => (
              <Card key={video.id} className="group cursor-pointer overflow-hidden">
                <div onClick={() => handleVideoClick(video)} className="relative aspect-video bg-muted">
                  <img 
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button size="sm" className="rounded-full">
                      <Play className="h-4 w-4 ml-0.5" />
                    </Button>
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black/80 text-white px-2 py-1 rounded text-xs">
                    {video.duration}
                  </div>
                  <div className="absolute top-2 left-2">
                    <Badge variant="secondary" className="text-xs">
                      {video.category}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-[family-name:var(--font-heading)] font-semibold text-card-foreground mb-2 line-clamp-2">
                    {video.title}
                  </h3>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Eye className="h-3 w-3" />
                      {video.views}
                    </span>
                    <span className="flex items-center gap-1">
                      <Star className="h-3 w-3 text-yellow-500 fill-current" />
                      {video.rating}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Load More */}
        <div className="text-center">
          <Button variant="outline" size="lg">
            โหลดเพิ่มเติม
          </Button>
        </div>

        {/* Video Modal */}
        {selectedVideo && selectedVideo.category !== "YouTube" && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
              <div className="flex justify-between items-center p-6 border-b">
                <h3 className="font-[family-name:var(--font-heading)] text-xl font-semibold">
                  {selectedVideo.title}
                </h3>
                <Button variant="ghost" size="sm" onClick={closeModal}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
              <div className="p-6">
                <div className="aspect-video bg-muted mb-4">
                  <img 
                    src={selectedVideo.thumbnail}
                    alt={selectedVideo.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 text-sm">
                    <span className="font-medium">Duration:</span>
                    <span>{selectedVideo.duration}</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="font-medium">Views:</span>
                    <span>{selectedVideo.views}</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="font-medium">Category:</span>
                    <Badge variant="outline">{selectedVideo.category}</Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="font-medium">Rating:</span>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span>{selectedVideo.rating}</span>
                    </div>
                  </div>
                  <p className="text-muted-foreground">
                    {selectedVideo.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}