import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertCircle, Anchor } from "lucide-react"

export default function AuthErrorPage() {
  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4">
      <Card className="w-full max-w-md bg-card border-border text-center">
        <CardHeader>
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center">
              <AlertCircle className="h-8 w-8 text-destructive" />
            </div>
          </div>
          <CardTitle className="font-[family-name:var(--font-heading)] text-2xl">
            Oops! Something went wrong
          </CardTitle>
          <CardDescription>
            There was an error with authentication
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-6">
            Don&apos;t worry, even the best adventurers encounter storms. 
            Please try again or contact support if the problem persists.
          </p>
          <div className="flex flex-col gap-3">
            <Link href="/auth/login">
              <Button className="w-full">
                Try Again
              </Button>
            </Link>
            <Link href="/">
              <Button variant="ghost" className="w-full">
                <Anchor className="mr-2 h-4 w-4" />
                Back to Home
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
