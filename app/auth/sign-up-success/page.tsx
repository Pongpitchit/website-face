import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Mail, Anchor } from "lucide-react"

export default function SignUpSuccessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4">
      <Card className="w-full max-w-md bg-card border-border text-center">
        <CardHeader>
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
              <Mail className="h-8 w-8 text-primary" />
            </div>
          </div>
          <CardTitle className="font-[family-name:var(--font-heading)] text-2xl">
            Check Your Email!
          </CardTitle>
          <CardDescription>
            We&apos;ve sent you a confirmation link
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-6">
            Click the link in your email to confirm your account and start your 
            marvelous adventure at Stormalong Shop!
          </p>
          <div className="flex flex-col gap-3">
            <Link href="/auth/login">
              <Button variant="outline" className="w-full">
                Back to Sign In
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
