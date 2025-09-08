"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Upload, Download, Search, CheckCircle, XCircle } from "lucide-react"

// Mock contact data
const mockContacts = [
  {
    id: "contact_1",
    phone: "+1 (555) 123-4567",
    firstName: "Sarah",
    lastName: "Chen",
    email: "sarah@utd.edu",
    consentSource: "checkout_opt_in",
    consentDate: "2025-01-05T14:30:00Z",
    optedOut: false,
    eventId: "evt_1",
    eventName: "Spring Dance Showcase",
  },
  {
    id: "contact_2",
    phone: "+1 (555) 234-5678",
    firstName: "Alex",
    lastName: "Rodriguez",
    email: "alex@utd.edu",
    consentSource: "manual_import",
    consentDate: "2025-01-03T10:15:00Z",
    optedOut: false,
    eventId: "evt_1",
    eventName: "Spring Dance Showcase",
  },
  {
    id: "contact_3",
    phone: "+1 (555) 345-6789",
    firstName: "Maya",
    lastName: "Patel",
    email: "maya@utd.edu",
    consentSource: "checkout_opt_in",
    consentDate: "2025-01-02T16:45:00Z",
    optedOut: true,
    optOutDate: "2025-01-07T12:00:00Z",
    eventId: "evt_1",
    eventName: "Spring Dance Showcase",
  },
]

export function ContactManager() {
  const [searchTerm, setSearchTerm] = useState("")
  const [showImportForm, setShowImportForm] = useState(false)
  const [importData, setImportData] = useState("")
  const { toast } = useToast()

  const filteredContacts = mockContacts.filter(
    (contact) =>
      contact.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.phone.includes(searchTerm) ||
      contact.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleImportContacts = async () => {
    try {
      // Parse CSV data (simplified)
      const lines = importData.trim().split("\n")
      const contacts = lines.slice(1).map((line) => {
        const [phone, firstName, lastName, email, consentSource] = line.split(",")
        return { phone, firstName, lastName, email, consentSource }
      })

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast({
        title: "Contacts imported successfully!",
        description: `Added ${contacts.length} contacts with explicit consent`,
      })

      setImportData("")
      setShowImportForm(false)
    } catch (error) {
      toast({
        title: "Import failed",
        description: "Please check your CSV format and try again",
        variant: "destructive",
      })
    }
  }

  const exportContacts = () => {
    const csvContent = [
      "Phone,First Name,Last Name,Email,Consent Source,Consent Date,Opted Out",
      ...mockContacts.map((contact) =>
        [
          contact.phone,
          contact.firstName,
          contact.lastName,
          contact.email,
          contact.consentSource,
          contact.consentDate,
          contact.optedOut,
        ].join(","),
      ),
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "sms-contacts.csv"
    a.click()
    URL.revokeObjectURL(url)

    toast({
      title: "Contacts exported",
      description: "CSV file downloaded successfully",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Contact Management</h3>
          <p className="text-sm text-muted-foreground">Manage your opted-in SMS contacts</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={exportContacts} className="gap-2 bg-transparent">
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Button onClick={() => setShowImportForm(!showImportForm)} className="gap-2">
            <Upload className="h-4 w-4" />
            Import Contacts
          </Button>
        </div>
      </div>

      {showImportForm && (
        <Card>
          <CardHeader>
            <CardTitle>Import Contacts</CardTitle>
            <CardDescription>
              Upload contacts with explicit consent. CSV format: Phone, First Name, Last Name, Email, Consent Source
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              placeholder={`+1 (555) 123-4567,Sarah,Chen,sarah@utd.edu,checkout_opt_in
+1 (555) 234-5678,Alex,Rodriguez,alex@utd.edu,manual_import`}
              value={importData}
              onChange={(e) => setImportData(e.target.value)}
              rows={6}
            />
            <div className="flex gap-2">
              <Button onClick={handleImportContacts} disabled={!importData.trim()}>
                Import Contacts
              </Button>
              <Button variant="outline" onClick={() => setShowImportForm(false)}>
                Cancel
              </Button>
            </div>
            <div className="text-xs text-muted-foreground">
              <strong>Important:</strong> Only import contacts who have explicitly consented to SMS marketing. Include
              consent source for compliance tracking.
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Contacts ({filteredContacts.length})</span>
            <div className="flex items-center gap-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search contacts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-64"
              />
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {filteredContacts.map((contact) => (
              <div key={contact.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    {contact.optedOut ? (
                      <XCircle className="h-5 w-5 text-red-500" />
                    ) : (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    )}
                  </div>
                  <div>
                    <div className="font-medium">
                      {contact.firstName} {contact.lastName}
                    </div>
                    <div className="text-sm text-muted-foreground">{contact.phone}</div>
                    <div className="text-sm text-muted-foreground">{contact.email}</div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <Badge variant={contact.optedOut ? "destructive" : "default"}>
                      {contact.optedOut ? "Opted Out" : "Active"}
                    </Badge>
                    <div className="text-xs text-muted-foreground mt-1">
                      Consent: {contact.consentSource.replace("_", " ")}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {new Date(contact.consentDate).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    <div>{contact.eventName}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
