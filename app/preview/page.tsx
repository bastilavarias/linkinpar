"use client"

import { useSearchParams } from "next/navigation"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Instagram, Youtube, Globe, ShoppingBag, Share2 } from "lucide-react"
import Link from "next/link"

interface LinkItem {
  id: string
  title: string
  url: string
  type: "instagram" | "youtube" | "website" | "ecommerce"
}

interface ProfileData {
  username: string
  bio: string
  avatar: string
  theme: string
  links: LinkItem[]
}

export default function PreviewPage() {
  const searchParams = useSearchParams()
  const [profileData, setProfileData] = useState<ProfileData | null>(null)
  const [isDemo, setIsDemo] = useState(false)
  const [loading, setLoading] = useState(true) // Added loading state

  useEffect(() => {
    setLoading(true)
    const demoParam = searchParams.get("demo")

    if (demoParam === "true") {
      setIsDemo(true)
      setProfileData({
        username: "@bigcatcreative",
        bio: "wildly empowering Squarespace templates for fierce biz owners",
        avatar: "/placeholder.svg?height=120&width=120",
        theme: "classic",
        links: [
          { id: "1", title: "Get in Touch", url: "#", type: "website" },
          { id: "2", title: "Freebies & Resources", url: "#", type: "website" },
          { id: "3", title: "Read our Latest Blog Post", url: "#", type: "website" },
          { id: "4", title: "Shop Squarespace Templates", url: "#", type: "ecommerce" },
          { id: "5", title: "Visit the Website", url: "#", type: "website" },
        ],
      })
      setLoading(false)
    } else {
      // Parse individual parameters
      const username = searchParams.get("username") || ""
      const bio = searchParams.get("bio") || ""
      const avatar = searchParams.get("avatar") || ""
      const theme = searchParams.get("theme") || "classic"

      // Parse links
      const links: LinkItem[] = []
      let linkIndex = 0

      while (true) {
        const title = searchParams.get(`link${linkIndex}_title`)
        const url = searchParams.get(`link${linkIndex}_url`)
        const type = searchParams.get(`link${linkIndex}_type`)

        if (!title || !url) break

        links.push({
          id: linkIndex.toString(),
          title,
          url,
          type: (type as LinkItem["type"]) || "website",
        })

        linkIndex++
      }

      if (username || bio || avatar || links.length > 0) {
        setProfileData({  
          username,
          bio,
          avatar,
          theme,
          links,
        })
      }
      setLoading(false)
    }
  }, [searchParams])

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "instagram":
        return <Instagram className="w-5 h-5" />
      case "youtube":
        return <Youtube className="w-5 h-5" />
      case "ecommerce":
        return <ShoppingBag className="w-5 h-5" />
      default:
        return <Globe className="w-5 h-5" />
    }
  }

  const getThemeStyles = (theme: string) => {
    switch (theme) {
      case "gradient":
        return {
          background: "bg-gradient-to-br from-purple-500 via-pink-500 to-red-500",
          card: "bg-white/20 backdrop-blur-sm border-white/30",
          text: "text-white",
          button: "bg-white/20 hover:bg-white/30 text-white border-white/30",
        }
      case "minimal":
        return {
          background: "bg-white dark:bg-gray-900",
          card: "bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700",
          text: "text-gray-900 dark:text-white",
          button: "bg-gray-900 hover:bg-gray-800 text-white dark:bg-white dark:hover:bg-gray-100 dark:text-gray-900",
        }
      case "neon":
        return {
          background: "bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600",
          card: "bg-black/30 backdrop-blur-sm border-cyan-400/50",
          text: "text-white",
          button: "bg-cyan-400/20 hover:bg-cyan-400/30 text-white border-cyan-400/50 shadow-lg shadow-cyan-400/25",
        }
      case "ocean":
        return {
          background: "bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600",
          card: "bg-white/20 backdrop-blur-sm border-white/30",
          text: "text-white",
          button: "bg-white/20 hover:bg-white/30 text-white border-white/30",
        }
      case "forest":
        return {
          background: "bg-gradient-to-br from-green-400 via-green-500 to-green-600",
          card: "bg-white/20 backdrop-blur-sm border-white/30",
          text: "text-white",
          button: "bg-white/20 hover:bg-white/30 text-white border-white/30",
        }
      case "sunset":
        return {
          background: "bg-gradient-to-br from-orange-400 via-red-500 to-pink-500",
          card: "bg-white/20 backdrop-blur-sm border-white/30",
          text: "text-white",
          button: "bg-white/20 hover:bg-white/30 text-white border-white/30",
        }
      case "monochrome":
        return {
          background: "bg-gradient-to-br from-gray-900 via-gray-800 to-black",
          card: "bg-white/10 backdrop-blur-sm border-white/20",
          text: "text-white",
          button: "bg-white hover:bg-gray-100 text-black border-white",
        }
      default: // classic
        return {
          background: "bg-gradient-to-br from-gray-900 to-gray-800",
          card: "bg-gray-800 border-gray-700",
          text: "text-white",
          button: "bg-gray-700 hover:bg-gray-600 text-white",
        }
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href)
    alert("Link copied to clipboard!")
  }

  const shareLink = () => {
    if (navigator.share) {
      navigator.share({
        title: profileData?.username || "My Link Tree",
        url: window.location.href,
      })
    } else {
      copyToClipboard()
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        {/* Optional: you could add a loader here */}
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Loading...</h1>
        </div>
      </div>
    )
  }

  if (!profileData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">No profile data found</h1>
          <Link href="/generate">
            <Button>Create Your Link Tree</Button>
          </Link>
        </div>
      </div>
    )
  }

  const themeStyles = getThemeStyles(profileData.theme)

  return (
    <div className={`min-h-screen ${themeStyles.background}`}>
       <main className="container mx-auto px-4 py-8 max-w-md">
        <div className="text-center space-y-6">
          {/* Avatar */}
          <div className="flex justify-center">
            {profileData.avatar ? (
              <img
                src={profileData.avatar || "/placeholder.svg"}
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover border-4 border-white/20"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-white/20 border-4 border-white/20" />
            )}
          </div>

          {/* Username */}
          <h1 className={`text-2xl font-bold ${themeStyles.text}`}>{profileData.username}</h1>

          {/* Bio */}
          {profileData.bio && (
            <p className={`text-sm ${themeStyles.text} opacity-90 max-w-xs mx-auto`}>{profileData.bio}</p>
          )}

          {/* Links */}
          <div className="space-y-4 mt-8">
            {profileData.links.map((link) => (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`block w-full p-4 rounded-xl ${themeStyles.button} transition-all duration-200 hover:scale-105 hover:shadow-lg`}
              >
                <div className="flex items-center justify-center gap-3">
                  {getTypeIcon(link.type)}
                  <span className="font-medium">{link.title}</span>
                </div>
              </a>
            ))}
          </div>

          {!isDemo && (
            <div className="mt-12 pt-8 border-t border-white/20">
              <div className="flex flex-col gap-4 items-center">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={shareLink}
                  className="text-white border-white/30 hover:bg-white/20"
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
                <Link href="/generate">
                  <Button variant="outline" className="text-white border-white/30 hover:bg-white/20">
                    Create Your Own
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
