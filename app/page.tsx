"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ThemeToggle } from "@/components/theme-toggle"
import { Instagram, Youtube, Globe, ShoppingBag, Plus, Trash2 } from "lucide-react"
import Link from "next/link"

interface LinkItem {
  id: string
  title: string
  url: string
  type: "instagram" | "youtube" | "website" | "ecommerce"
}

export default function GeneratePage() {
  const router = useRouter()
  const [username, setUsername] = useState("")
  const [bio, setBio] = useState("")
  const [avatar, setAvatar] = useState<string>("")
  const [theme, setTheme] = useState("classic")
  const [links, setLinks] = useState<LinkItem[]>([{ id: "1", title: "", url: "", type: "website" }])

  const addLink = () => {
    const newLink: LinkItem = {
      id: Date.now().toString(),
      title: "",
      url: "",
      type: "website",
    }
    setLinks([...links, newLink])
  }

  const removeLink = (id: string) => {
    setLinks(links.filter((link) => link.id !== id))
  }

  const updateLink = (id: string, field: keyof LinkItem, value: string) => {
    setLinks(links.map((link) => (link.id === id ? { ...link, [field]: value } : link)))
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Check file size (3MB limit)
      if (file.size > 3 * 1024 * 1024) {
        alert("Image size must be less than 3MB")
        return
      }

      const reader = new FileReader()
      reader.onload = (e) => {
        setAvatar(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const generatePreview = () => {
    const validLinks = links.filter((link) => link.title && link.url)

    const params = new URLSearchParams()
    params.set("username", username)
    params.set("bio", bio)
    params.set("avatar", avatar)
    params.set("theme", theme)

    validLinks.forEach((link, index) => {
      params.set(`link${index}_title`, link.title)
      params.set(`link${index}_url`, link.url)
      params.set(`link${index}_type`, link.type)
    })

    router.push(`/preview?${params.toString()}`)
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "instagram":
        return <Instagram className="w-4 h-4" />
      case "youtube":
        return <Youtube className="w-4 h-4" />
      case "ecommerce":
        return <ShoppingBag className="w-4 h-4" />
      default:
        return <Globe className="w-4 h-4" />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Create Your Link Tree</h1>
          <p className="text-gray-600 dark:text-gray-300">
            Fill out the form below to generate your personalized link tree
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Form */}
          <div className="space-y-6">
            {/* Profile Information */}
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>Basic information about you or your brand</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    placeholder="@yourusername"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    placeholder="Tell people about yourself..."
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor="avatar">Avatar Image</Label>
                  <Input
                    id="avatar"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="cursor-pointer"
                  />
                  {avatar && (
                    <div className="mt-2">
                      <img
                        src={avatar || "/placeholder.svg"}
                        alt="Avatar preview"
                        className="w-16 h-16 rounded-full object-cover"
                      />
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Theme Selection */}
            <Card>
              <CardHeader>
                <CardTitle>Choose Theme</CardTitle>
                <CardDescription>Select a design that matches your style</CardDescription>
              </CardHeader>
              <CardContent>
                <RadioGroup value={theme} onValueChange={setTheme}>
                  <div className="grid grid-cols-4 gap-3">
                    <div className="flex flex-col items-center space-y-2">
                      <div className="w-full h-16 bg-gradient-to-b from-gray-800 to-gray-900 rounded-lg border-2 border-transparent data-[state=checked]:border-purple-500" />
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="classic" id="classic" />
                        <Label htmlFor="classic" className="text-xs">
                          Classic
                        </Label>
                      </div>
                    </div>

                    <div className="flex flex-col items-center space-y-2">
                      <div className="w-full h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg border-2 border-transparent data-[state=checked]:border-purple-500" />
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="gradient" id="gradient" />
                        <Label htmlFor="gradient" className="text-xs">
                          Gradient
                        </Label>
                      </div>
                    </div>

                    <div className="flex flex-col items-center space-y-2">
                      <div className="w-full h-16 bg-white border-2 border-gray-200 rounded-lg data-[state=checked]:border-purple-500" />
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="minimal" id="minimal" />
                        <Label htmlFor="minimal" className="text-xs">
                          Minimal
                        </Label>
                      </div>
                    </div>

                    <div className="flex flex-col items-center space-y-2">
                      <div className="w-full h-16 bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 rounded-lg border-2 border-transparent data-[state=checked]:border-purple-500" />
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="neon" id="neon" />
                        <Label htmlFor="neon" className="text-xs">
                          Neon
                        </Label>
                      </div>
                    </div>

                    <div className="flex flex-col items-center space-y-2">
                      <div className="w-full h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg border-2 border-transparent data-[state=checked]:border-purple-500" />
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="ocean" id="ocean" />
                        <Label htmlFor="ocean" className="text-xs">
                          Ocean
                        </Label>
                      </div>
                    </div>

                    <div className="flex flex-col items-center space-y-2">
                      <div className="w-full h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-lg border-2 border-transparent data-[state=checked]:border-purple-500" />
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="forest" id="forest" />
                        <Label htmlFor="forest" className="text-xs">
                          Forest
                        </Label>
                      </div>
                    </div>

                    <div className="flex flex-col items-center space-y-2">
                      <div className="w-full h-16 bg-gradient-to-br from-orange-400 to-red-500 rounded-lg border-2 border-transparent data-[state=checked]:border-purple-500" />
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="sunset" id="sunset" />
                        <Label htmlFor="sunset" className="text-xs">
                          Sunset
                        </Label>
                      </div>
                    </div>

                    <div className="flex flex-col items-center space-y-2">
                      <div className="w-full h-16 bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-lg border-2 border-transparent data-[state=checked]:border-purple-500" />
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="monochrome" id="monochrome" />
                        <Label htmlFor="monochrome" className="text-xs">
                          Mono
                        </Label>
                      </div>
                    </div>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>

            {/* Links */}
            <Card>
              <CardHeader>
                <CardTitle>Your Links</CardTitle>
                <CardDescription>Add links to your social media and websites</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {links.map((link, index) => (
                  <div key={link.id} className="space-y-2 p-4 border rounded-lg">
                    <div className="flex justify-between items-center">
                      <Label>Link {index + 1}</Label>
                      {links.length > 1 && (
                        <Button variant="ghost" size="sm" onClick={() => removeLink(link.id)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      )}
                    </div>

                    <Input
                      placeholder="Link title"
                      value={link.title}
                      onChange={(e) => updateLink(link.id, "title", e.target.value)}
                    />

                    <Input
                      placeholder="https://..."
                      value={link.url}
                      onChange={(e) => updateLink(link.id, "url", e.target.value)}
                    />

                    <Select value={link.type} onValueChange={(value) => updateLink(link.id, "type", value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="instagram">
                          <div className="flex items-center gap-2">
                            <Instagram className="w-4 h-4" />
                            Instagram
                          </div>
                        </SelectItem>
                        <SelectItem value="youtube">
                          <div className="flex items-center gap-2">
                            <Youtube className="w-4 h-4" />
                            YouTube
                          </div>
                        </SelectItem>
                        <SelectItem value="website">
                          <div className="flex items-center gap-2">
                            <Globe className="w-4 h-4" />
                            Personal Website
                          </div>
                        </SelectItem>
                        <SelectItem value="ecommerce">
                          <div className="flex items-center gap-2">
                            <ShoppingBag className="w-4 h-4" />
                            E-commerce
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                ))}

                <Button variant="outline" onClick={addLink} className="w-full">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Link
                </Button>
              </CardContent>
            </Card>

            <Button onClick={generatePreview} className="w-full bg-purple-600 hover:bg-purple-700 text-white" size="lg">
              Generate Preview
            </Button>
          </div>

          {/* Preview */}
          <div className="lg:sticky lg:top-8">
            <Card>
              <CardHeader>
                <CardTitle>Live Preview</CardTitle>
                <CardDescription>See how your link tree will look</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 min-h-[400px]">
                  <div className="text-center space-y-4">
                    {avatar ? (
                      <img
                        src={avatar || "/placeholder.svg"}
                        alt="Avatar"
                        className="w-20 h-20 rounded-full mx-auto object-cover"
                      />
                    ) : (
                      <div className="w-20 h-20 rounded-full bg-gray-300 dark:bg-gray-600 mx-auto" />
                    )}

                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">{username || "@username"}</h3>

                    <p className="text-gray-600 dark:text-gray-300 text-sm">{bio || "Your bio will appear here..."}</p>

                    <div className="space-y-3 mt-6">
                      {links
                        .filter((link) => link.title)
                        .map((link) => (
                          <div
                            key={link.id}
                            className="bg-gray-800 text-white rounded-lg p-3 flex items-center justify-between"
                          >
                            <div className="flex items-center gap-2">
                              {getTypeIcon(link.type)}
                              <span className="text-sm">{link.title}</span>
                            </div>
                          </div>
                        ))}

                      {links.filter((link) => link.title).length === 0 && (
                        <p className="text-gray-500 text-sm">Your links will appear here...</p>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm mt-16">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-4">
              <Link href="/" className="text-xl font-bold text-purple-600 dark:text-purple-400">
                LinkInPar
              </Link>
              <ThemeToggle />
            </div>
            <div className="flex items-center gap-4">
              <Link href="/">
                <Button variant="ghost" size="sm">
                  Home
                </Button>
              </Link>
              <Link href="/preview?demo=true">
                <Button variant="ghost" size="sm">
                  View Demo
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
