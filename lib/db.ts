import { createClient } from '@supabase/supabase-js'
import { randomUUID } from 'crypto'

function sb() {
  return createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } }
  )
}

export type Booking = {
  id: string
  orderId: string
  slug: string
  experienceTitle: string
  name: string
  email: string
  phone: string
  date: string
  people: number
  tierLabel: string
  depositPaid: number
  fullPrice: number
  status: string
  specialRequests: string | null
  createdAt: string
}

export type PendingOrder = {
  orderId: string
  slug: string
  experienceTitle: string
  name: string
  email: string
  phone: string
  date: string
  people: number
  tierLabel: string
  depositPaid: number
  fullPrice: number
  specialRequests: string | null
  createdAt: string
}

export type AvailabilityBlock = {
  id: string
  date: string
  slug: string | null
  reason: string | null
  createdAt: string
}

type BookingWhere = {
  date?: string
  slug?: string
  status?: string
  dateGte?: string
  dateLte?: string
  q?: string
}

export const db = {
  booking: {
    async count(where: BookingWhere = {}): Promise<number> {
      // eslint-disable-next-line -- supabase query builder has no precise type
      let q: any =sb().from('Booking').select('*', { count: 'exact', head: true })
      if (where.date) q = q.eq('date', where.date)
      if (where.slug) q = q.eq('slug', where.slug)
      if (where.status) q = q.eq('status', where.status)
      if (where.dateGte) q = q.gte('date', where.dateGte)
      if (where.dateLte) q = q.lte('date', where.dateLte)
      if (where.q) q = q.or(`name.ilike.%${where.q}%,email.ilike.%${where.q}%,orderId.ilike.%${where.q}%`)
      const { count, error } = await q
      if (error) throw error
      return count ?? 0
    },

    async sumDeposit(where: { status?: string } = {}): Promise<number> {
      // eslint-disable-next-line -- supabase query builder has no precise type
      let q: any =sb().from('Booking').select('depositPaid')
      if (where.status) q = q.eq('status', where.status)
      const { data, error } = await q
      if (error) throw error
      return (data ?? []).reduce((s: number, b: { depositPaid: number }) => s + (b.depositPaid ?? 0), 0)
    },

    async findMany(opts: { where?: BookingWhere; skip?: number; take?: number } = {}): Promise<Booking[]> {
      const { where = {}, skip = 0, take = 20 } = opts
      // eslint-disable-next-line -- supabase query builder has no precise type
      let q: any =sb().from('Booking').select('*').order('createdAt', { ascending: false })
      if (where.date) q = q.eq('date', where.date)
      if (where.slug) q = q.eq('slug', where.slug)
      if (where.status) q = q.eq('status', where.status)
      if (where.dateGte) q = q.gte('date', where.dateGte)
      if (where.dateLte) q = q.lte('date', where.dateLte)
      if (where.q) q = q.or(`name.ilike.%${where.q}%,email.ilike.%${where.q}%,orderId.ilike.%${where.q}%`)
      q = q.range(skip, skip + take - 1)
      const { data, error } = await q
      if (error) throw error
      return (data ?? []) as Booking[]
    },

    async findByOrderId(orderId: string): Promise<Booking | null> {
      const { data, error } = await sb().from('Booking').select('*').eq('orderId', orderId).maybeSingle()
      if (error) throw error
      return data as Booking | null
    },

    async forCalendar(startDate: string, endDate: string): Promise<{ id: string; orderId: string; date: string; slug: string; name: string; people: number }[]> {
      const { data, error } = await sb()
        .from('Booking')
        .select('id,orderId,date,slug,name,people')
        .gte('date', startDate)
        .lte('date', endDate)
        .eq('status', 'confirmed')
      if (error) throw error
      return (data ?? []) as { id: string; orderId: string; date: string; slug: string; name: string; people: number }[]
    },

    async upsert(data: Omit<Booking, 'id' | 'createdAt'>): Promise<void> {
      const existing = await this.findByOrderId(data.orderId)
      if (existing) {
        const { error } = await sb().from('Booking').update({ status: data.status }).eq('orderId', data.orderId)
        if (error) throw error
      } else {
        const { error } = await sb().from('Booking').insert({ ...data, id: randomUUID(), createdAt: new Date().toISOString() })
        if (error) throw error
      }
    },

    async updateStatus(orderId: string, status: string): Promise<Booking> {
      const { data, error } = await sb().from('Booking').update({ status }).eq('orderId', orderId).select().single()
      if (error) throw error
      return data as Booking
    },
  },

  pendingOrder: {
    async create(data: Omit<PendingOrder, 'createdAt'>): Promise<void> {
      const { error } = await sb().from('PendingOrder').insert({ ...data, createdAt: new Date().toISOString() })
      if (error) throw error
    },

    async find(orderId: string): Promise<PendingOrder | null> {
      const { data, error } = await sb().from('PendingOrder').select('*').eq('orderId', orderId).maybeSingle()
      if (error) throw error
      return data as PendingOrder | null
    },

    async delete(orderId: string): Promise<void> {
      const { error } = await sb().from('PendingOrder').delete().eq('orderId', orderId)
      if (error) throw error
    },
  },

  availabilityBlock: {
    async list(where: { date?: string; slug?: string; dateGte?: string; dateLte?: string } = {}): Promise<AvailabilityBlock[]> {
      // eslint-disable-next-line -- supabase query builder has no precise type
      let q: any =sb().from('AvailabilityBlock').select('*').order('date', { ascending: true })
      if (where.date) q = q.eq('date', where.date)
      if (where.slug) q = q.eq('slug', where.slug)
      if (where.dateGte) q = q.gte('date', where.dateGte)
      if (where.dateLte) q = q.lte('date', where.dateLte)
      const { data, error } = await q
      if (error) throw error
      return (data ?? []) as AvailabilityBlock[]
    },

    async create(data: { date: string; slug?: string | null; reason?: string | null }): Promise<AvailabilityBlock> {
      const { data: result, error } = await sb()
        .from('AvailabilityBlock')
        .insert({ ...data, id: randomUUID(), createdAt: new Date().toISOString() })
        .select()
        .single()
      if (error) throw error
      return result as AvailabilityBlock
    },

    async delete(id: string): Promise<void> {
      const { error } = await sb().from('AvailabilityBlock').delete().eq('id', id)
      if (error) throw error
    },
  },
}
