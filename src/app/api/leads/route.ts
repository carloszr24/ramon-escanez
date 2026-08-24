import { NextRequest, NextResponse } from 'next/server'
import { getAdminTokenFromRequest, verifyAdminSessionToken } from '@/lib/admin-session'
import { LEAD_INTENTS, LEAD_PRIORITIES, LEAD_SOURCES, LEAD_STATUSES, rowsToLeads, type LeadRow } from '@/lib/leads'
import { sendLeadNotificationEmail } from '@/lib/lead-notification'
import { appendLocalLead, readLocalLeads, writeLocalLeads } from '@/lib/local-store.server'

function unauthorized() {
  return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
}

function toLeadRow(stored: ReturnType<typeof readLocalLeads>[number]): LeadRow {
  return {
    id: stored.id,
    full_name: stored.fullName,
    email: stored.email ?? null,
    phone: stored.phone,
    source: stored.source as LeadRow['source'],
    intent: stored.intent as LeadRow['intent'],
    status: stored.status as LeadRow['status'],
    priority: stored.priority as LeadRow['priority'],
    property_ref: stored.propertyRef ?? null,
    notes: stored.notes ?? null,
    sale_timeline: stored.saleTimeline ?? null,
    assigned_to: stored.assignedTo ?? null,
    first_response_at: stored.firstResponseAt ?? null,
    last_contact_at: stored.lastContactAt ?? null,
    created_at: stored.createdAt,
    updated_at: stored.updatedAt,
  }
}

export async function GET(request: NextRequest) {
  if (!verifyAdminSessionToken(getAdminTokenFromRequest(request))) {
    return unauthorized()
  }

  const leads = readLocalLeads().map(toLeadRow)
  return NextResponse.json(rowsToLeads(leads))
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const fullName = String(body.fullName || '').trim()
    const phone = String(body.phone || '').trim()
    const email = String(body.email || '').trim() || null
    const notes = String(body.notes || '').trim() || null
    const source = String(body.source || 'web_contacto')
    const intent = String(body.intent || 'otro')
    const priority = String(body.priority || 'media')
    const propertyRef = String(body.propertyRef || '').trim() || null
    const saleTimeline = String(body.saleTimeline || '').trim() || null
    const propertyType = String(body.propertyType || '').trim() || null
    const location = String(body.location || '').trim() || null
    const sqMeters = String(body.sqMeters || '').trim() || null
    const bedrooms = String(body.bedrooms || '').trim() || null
    const bathrooms = String(body.bathrooms || '').trim() || null
    const condition = String(body.condition || '').trim() || null
    const observations = String(body.observations || '').trim() || null

    if (!fullName || !phone) {
      return NextResponse.json({ error: 'Nombre y teléfono son obligatorios' }, { status: 400 })
    }
    if (!LEAD_SOURCES.includes(source as (typeof LEAD_SOURCES)[number])) {
      return NextResponse.json({ error: 'Origen de lead no válido' }, { status: 400 })
    }
    if (!LEAD_INTENTS.includes(intent as (typeof LEAD_INTENTS)[number])) {
      return NextResponse.json({ error: 'Tipo de interés no válido' }, { status: 400 })
    }
    if (!LEAD_PRIORITIES.includes(priority as (typeof LEAD_PRIORITIES)[number])) {
      return NextResponse.json({ error: 'Prioridad no válida' }, { status: 400 })
    }

    const stored = appendLocalLead({
      fullName,
      phone,
      email,
      notes,
      source,
      intent,
      priority,
      propertyRef,
      saleTimeline,
      status: 'nuevo',
    })

    const lead = rowsToLeads([toLeadRow(stored)])[0]

    const emailResult = await sendLeadNotificationEmail({
      full_name: fullName,
      phone,
      email,
      source,
      intent,
      notes,
      property_ref: propertyRef,
      sale_timeline: saleTimeline,
      property_type: propertyType,
      location,
      sq_meters: sqMeters,
      bedrooms,
      bathrooms,
      condition,
      observations,
    })

    if (!emailResult.ok) {
      console.error('[api/leads] No se pudo enviar el email al equipo:', emailResult.error)
    }

    return NextResponse.json(lead, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Error al crear lead' }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest) {
  if (!verifyAdminSessionToken(getAdminTokenFromRequest(request))) {
    return unauthorized()
  }

  try {
    const body = await request.json()
    const id = String(body.id || '').trim()
    if (!id) return NextResponse.json({ error: 'ID no válido' }, { status: 400 })

    const leads = readLocalLeads()
    const index = leads.findIndex((lead) => lead.id === id)
    if (index === -1) return NextResponse.json({ error: 'Lead no encontrado' }, { status: 404 })

    const current = leads[index]
    const updated = { ...current, updatedAt: new Date().toISOString() }

    if (body.status) {
      const status = String(body.status)
      if (!LEAD_STATUSES.includes(status as (typeof LEAD_STATUSES)[number])) {
        return NextResponse.json({ error: 'Estado no válido' }, { status: 400 })
      }
      updated.status = status
      if (status === 'contactado' && !body.firstResponseAt) {
        updated.firstResponseAt = new Date().toISOString()
      }
    }
    if (body.priority) {
      const priority = String(body.priority)
      if (!LEAD_PRIORITIES.includes(priority as (typeof LEAD_PRIORITIES)[number])) {
        return NextResponse.json({ error: 'Prioridad no válida' }, { status: 400 })
      }
      updated.priority = priority
    }
    if (body.notes !== undefined) updated.notes = String(body.notes || '').trim() || null
    if (body.assignedTo !== undefined) updated.assignedTo = String(body.assignedTo || '').trim() || null
    if (body.lastContactAt) updated.lastContactAt = new Date(body.lastContactAt).toISOString()

    leads[index] = updated
    writeLocalLeads(leads)
    return NextResponse.json(rowsToLeads([toLeadRow(updated)])[0])
  } catch {
    return NextResponse.json({ error: 'Error al actualizar lead' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  if (!verifyAdminSessionToken(getAdminTokenFromRequest(request))) {
    return unauthorized()
  }

  try {
    const body = await request.json()
    const id = String(body.id || '').trim()
    if (!id) return NextResponse.json({ error: 'ID no válido' }, { status: 400 })

    writeLocalLeads(readLocalLeads().filter((lead) => lead.id !== id))
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Error al eliminar lead' }, { status: 500 })
  }
}
