"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import { LogOut } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { toast } from "sonner"

export function LogoutButton() {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleLogout = async () => {
    setLoading(true)
    const supabase = createClient()
    const { error } = await supabase.auth.signOut()

    if (error) {
      toast.error("Failed to sign out")
      setLoading(false)
      return
    }

    toast.success("See you next time!")
    router.push("/")
    router.refresh()
  }

  return (
    <Button 
      variant="outline" 
      onClick={handleLogout}
      disabled={loading}
    >
      {loading ? (
        <Spinner className="mr-2 h-4 w-4" />
      ) : (
        <LogOut className="mr-2 h-4 w-4" />
      )}
      Sign Out
    </Button>
  )
}
