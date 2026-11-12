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
import { Button } from '@/components/ui/button'
import { Search, Trash2 } from 'lucide-react'
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

const PAGE_SIZE = 10

export default function AnonymousMessagesPage() {
  const [messages, setMessages] = useState<AnonymousMessage[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(0)

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

  const totalPages = Math.max(1, Math.ceil(filteredMessages.length / PAGE_SIZE))

  useEffect(() => {
    setCurrentPage((prev) => {
      const maxPage = Math.max(totalPages - 1, 0)
      return Math.min(prev, maxPage)
    })
  }, [totalPages])

  const paginatedMessages = filteredMessages.slice(
    currentPage * PAGE_SIZE,
    currentPage * PAGE_SIZE + PAGE_SIZE
  )

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm('Delete this message? This action cannot be undone.')
    if (!confirmed) return

    const token = getAdminToken()
    if (!token) return

    try {
      await adminApi.deleteAnonymousMessage(token, id)
      setMessages((prev) => prev.filter((item) => item.id !== id))
      setExpandedId((prev) => (prev === id ? null : prev))
    } catch {
      window.alert('Failed to delete this message. Please try again.')
    }
  }

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
          <CardHeader className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <CardTitle>All messages ({filteredMessages.length})</CardTitle>
            {filteredMessages.length > 0 && (
              <div className="text-sm text-foreground/70">
                Page {currentPage + 1} of {totalPages}
              </div>
            )}
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
                    <th className="px-4 py-3 text-left font-semibold text-foreground">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedMessages.map((item) => {
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
                        <td className="px-4 py-3">
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-red-600 hover:bg-red-50 hover:text-red-700"
                            onClick={(e) => {
                              e.stopPropagation()
                              void handleDelete(item.id)
                            }}
                            aria-label={`Delete message from ${item.fullName || 'anonymous sender'}`}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
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

            {filteredMessages.length > 0 && (
              <div className="mt-6 flex items-center justify-between gap-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage((page) => Math.max(page - 1, 0))}
                  disabled={currentPage === 0}
                >
                  Previous
                </Button>
                <span className="text-sm text-foreground/70">
                  Showing {filteredMessages.length === 0 ? 0 : currentPage * PAGE_SIZE + 1}–
                  {Math.min((currentPage + 1) * PAGE_SIZE, filteredMessages.length)} of{' '}
                  {filteredMessages.length}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage((page) => Math.min(page + 1, totalPages - 1))}
                  disabled={currentPage >= totalPages - 1}
                >
                  Next
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
