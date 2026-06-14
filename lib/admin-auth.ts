import { NextRequest, NextResponse } from 'next/server'

export function isAdminAuthorized(request: NextRequest): boolean {
  const secret = process.env.ADMIN_SECRET

  if (!secret) {
    return process.env.NODE_ENV === 'development'
  }

  const auth = request.headers.get('authorization')
  return auth === `Bearer ${secret}`
}

export function unauthorizedResponse() {
  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
}
