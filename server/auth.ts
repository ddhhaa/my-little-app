import fs from 'node:fs'
import crypto from 'node:crypto'

export type MockUser = {
  _id: number
  name: string
  email: string
  password: string
  role: 'user'
}

type DbShape = {
  users: MockUser[]
}

type SessionUser = Omit<MockUser, 'password'>

const dbUrl = new URL('./db.json', import.meta.url)
const tokenStore = new Map<string, SessionUser>()

function readDb(): DbShape {
  const fileContent = fs.readFileSync(dbUrl, 'utf8')
  return JSON.parse(fileContent) as DbShape
}

function writeDb(db: DbShape) {
  fs.writeFileSync(dbUrl, `${JSON.stringify(db, null, 2)}\n`, 'utf8')
}

export function sanitizeUser(user: MockUser): SessionUser {
  return {
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
  }
}

export function findUserByCredentials(email: string, password: string) {
  return (
    readDb().users.find(
      (user) =>
        user.email === email &&
        user.password === password
    ) ?? null
  )
}

export function createUser(
  name: string,
  email: string,
  password: string
) {
  const db = readDb()

  const normalizedEmail = email.trim()

  if (
    db.users.some(
      (user) => user.email === normalizedEmail
    )
  ) {
    return {
      ok: false as const,
      error: 'User already exists',
    }
  }

  const nextId =
    db.users.reduce(
      (maxId, user) => Math.max(maxId, user._id),
      0
    ) + 1

  const newUser: MockUser = {
    _id: nextId,
    name: name.trim(),
    email: normalizedEmail,
    password,
    role: 'user',
  }

  db.users.push(newUser)
  writeDb(db)

  return {
    ok: true as const,
    user: newUser,
  }
}

export function createTokenForUser(user: MockUser) {
  const token = crypto.randomUUID()

  tokenStore.set(
    token,
    sanitizeUser(user)
  )

  return token
}

export function parseBearerToken(
  authHeader: string | string[] | undefined
) {
  if (!authHeader) return null
  if (Array.isArray(authHeader))
    return parseBearerToken(authHeader[0])

  const parts = authHeader.split(' ')

  if (parts.length !== 2) return null
  if (parts[0] !== 'Bearer') return null

  return parts[1] || null
}

export function getUserByToken(token: string | null) {
  if (!token) return null

  return tokenStore.get(token) ?? null
}

export function sendJson(
  res: import('node:http').ServerResponse,
  statusCode: number,
  payload: unknown
) {
  res.statusCode = statusCode
  res.setHeader(
    'Content-Type',
    'application/json; charset=utf-8'
  )

  res.end(JSON.stringify(payload))
}

export function sendUnauthorized(
  res: import('node:http').ServerResponse,
  reason: string
) {
  res.statusCode = 401

  res.setHeader(
    'WWW-Authenticate',
    'Bearer realm="Mock API"'
  )

  res.setHeader(
    'Content-Type',
    'application/json; charset=utf-8'
  )

  res.end(
    JSON.stringify({
      ok: false,
      error: reason,
    })
  )
}

export async function readJsonBody<T>(
  req: import('node:http').IncomingMessage
) {
  const chunks: Buffer[] = []

  for await (const chunk of req) {
    chunks.push(
      Buffer.isBuffer(chunk)
        ? chunk
        : Buffer.from(chunk)
    )
  }

  const rawBody = Buffer.concat(chunks)
    .toString('utf8')
    .trim()

  if (!rawBody) {
    return {} as T
  }

  return JSON.parse(rawBody) as T
}