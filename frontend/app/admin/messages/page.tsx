'use client'

import { useEffect, useMemo, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Search } from 'lucide-react'
import { adminApi, getAdminToken } from '@/lib/api/adminApi'

interface AnonymousMessage {
  id: string
  fullName?: string | null
  email?: string | null
  phone?: string | null
  message: string
  category: string
  status: string
  submittedAt: string
}

const CATEGORY_LABELS: Record<string, string> = {
  GENERAL: 'General',
  COMPLAINT: 'Complaint',
  SUGGESTION: 'Suggestion',
  COMMENDATION: 'Commendation',
  REPORT: 'Report',
  OTHER: 'Other',
}

const STATUS_STYLES: Record<string, string> = {
  RECEIVED: 'bg-yellow-100 text-yellow-800',
  UNDER_REVIEW: 'bg-blue-100 text-blue-800',
  ACKNOWLEDGED: 'bg-purple-100 text-purple-800',
  RESOLVED: 'bg-green-100 text-green-800',
  CLOSED: 'bg-muted text-muted-foreground',
}

export default function AnonymousMessagesPage() {
  const [messages, setMessages] = useState<AnonymousMessage[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')
  const [expandedId, setExpandedId] = useState<string | null>(null)

  useEffect(() => {
    const token = getAdminToken()
    if (!token) return

    adminApi
      .getAnonymousMessages(token)
      .then((res) => {
        if (res.success && Array.isArray(res.data)) {
          setMessages(res.data)
        } else {
          setError('Could not load anonymous messages')
        }
      })
      .catch(() => setError('Failed to load anonymous messages from the server'))
      .finally(() => setLoading(false))
  }, [])

  const filteredMessages = useMemo(() => {
    const query = searchTerm.toLowerCase()
    return messages.filter((item) => {
      const sender = (item.fullName || '').toLowerCase()
      const body = item.message.toLowerCase()
      const contact = `${item.email || ''} ${item.phone || ''}`.toLowerCase()
      const matchesSearch =
        sender.includes(query) || body.includes(query) || contact.includes(query)
      const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter
      const matchesStatus = statusFilter === 'all' || item.status === statusFilter
      return matchesSearch && matchesCategory && matchesStatus
    })
  }, [messages, searchTerm, categoryFilter, statusFilter])

  if (loading) {
    return <p className="text-foreground/70">Loading anonymous messages…</p>
  }

  if (error) {
    return <p className="text-destructive">{error}</p>
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold">Anonymous Messages</h1>
          <p className="text-foreground/70">
            All confidential messages sent through the citizen portal ({messages.length} total)
          </p>
        </div>

        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-foreground/40" />
                <Input
                  placeholder="Search message, name, or contact"
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All categories</SelectItem>
                  {Object.entries(CATEGORY_LABELS).map(([value, label]) => (
                    <SelectItem key={value} value={value}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All statuses</SelectItem>
                  {Object.keys(STATUS_STYLES).map((status) => (
                    <SelectItem key={status} value={status}>
                      {status.replaceAll('_', ' ').toLowerCase()}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>All messages ({filteredMessages.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="px-4 py-3 text-left font-semibold text-foreground">Submitted</th>
                    <th className="px-4 py-3 text-left font-semibold text-foreground">Sender</th>
                    <th className="px-4 py-3 text-left font-semibold text-foreground">Category</th>
                    <th className="px-4 py-3 text-left font-semibold text-foreground">Message</th>
                    <th className="px-4 py-3 text-left font-semibold text-foreground">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredMessages.map((item) => {
                    const isExpanded = expandedId === item.id
                    return (
                      <tr
                        key={item.id}
                        className="cursor-pointer border-b border-border transition hover:bg-muted/50"
                        onClick={() => setExpandedId(isExpanded ? null : item.id)}
                      >
                        <td className="whitespace-nowrap px-4 py-3 text-xs">
                          {new Date(item.submittedAt).toLocaleString()}
                        </td>
                        <td className="px-4 py-3">
                          <p className="font-medium text-foreground">{item.fullName || 'Anonymous'}</p>
                          <p className="text-xs text-foreground/70">
                            {item.email || item.phone || 'No contact given'}
                          </p>
                        </td>
                        <td className="px-4 py-3">
                          {CATEGORY_LABELS[item.category] || item.category}
                        </td>
                        <td className="max-w-md px-4 py-3">
                          <p className={isExpanded ? 'whitespace-pre-wrap' : 'line-clamp-2'}>
                            {item.message}
                          </p>
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className={`rounded px-2 py-1 text-xs font-medium whitespace-nowrap ${
                              STATUS_STYLES[item.status] || 'bg-muted text-foreground'
                            }`}
                          >
                            {item.status.replaceAll('_', ' ').toLowerCase()}
                          </span>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>

            {filteredMessages.length === 0 && (
              <div className="py-8 text-center">
                <p className="text-foreground/70">No messages match your filters.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
