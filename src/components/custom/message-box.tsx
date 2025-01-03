"use client"

import { useState, ChangeEvent } from "react"
import { Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

export function MessageBox() {
  const [message, setMessage] = useState<string>("")

  const handleSubmit = (): void => {
    // Add your message handling logic here
    console.log("Message sent:", message)
    setMessage("")
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setMessage(e.target.value)
  }

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <CardTitle>Say Hello</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <Input 
          placeholder="Type your message..." 
          value={message}
          onChange={handleChange}
        />
        <Button 
          onClick={handleSubmit} 
          className="w-full"
        >
          Send <Send className="ml-2 h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  )
}