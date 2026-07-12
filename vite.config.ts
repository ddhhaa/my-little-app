import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { pluginJsonServer as jsonServer } from 'vite-plugin-json-server'

import {
  createTokenForUser,
  createUser,
  findUserByCredentials,
  getUserByToken,
  readJsonBody,
  sanitizeUser,
  sendJson,
  sendUnauthorized,
  parseBearerToken,
} from "./server/auth.js"

import { protectedPrefixes } from "./server/protectedRoutes.js"

import type {
  IncomingMessage,
  ServerResponse
} from "node:http"


export default defineConfig({
  plugins: [
    react(),

    {
      name: "bearer-auth-middleware",

      configureServer(devServer) {

        const apiPrefix = "/api"

        const loginPath =
          `${apiPrefix}/auth/login`

        const registerPath =
          `${apiPrefix}/auth/register`


        devServer.middlewares.use(
          async (
            req: IncomingMessage & { url?: string },
            res: ServerResponse,
            next
          ) => {

            const url = req.url ?? "/"

            const pathname =
              new URL(
                url,
                "http://localhost"
              ).pathname


            if (!pathname.startsWith(apiPrefix)) {
              return next()
            }


            // LOGIN
            if (
              req.method === "POST" &&
              pathname === loginPath
            ) {

              try {

                const body =
                  await readJsonBody<{
                    email?: string
                    password?: string
                  }>(req)


                const email =
                  body.email?.trim()

                const password =
                  body.password?.trim()


                if (!email || !password) {
                  return sendJson(
                    res,
                    400,
                    {
                      ok: false,
                      error:
                        "Email and password required"
                    }
                  )
                }


                const user =
                  findUserByCredentials(
                    email,
                    password
                  )


                if (!user) {
                  return sendUnauthorized(
                    res,
                    "Invalid credentials"
                  )
                }


                const token =
                  createTokenForUser(user)


                return sendJson(
                  res,
                  200,
                  {
                    ok: true,
                    token,
                    tokenType: "Bearer",
                    user:
                      sanitizeUser(user)
                  }
                )


              } catch {

                return sendJson(
                  res,
                  400,
                  {
                    ok: false,
                    error:
                      "Invalid JSON body"
                  }
                )

              }
            }



            // REGISTER
            if (
              req.method === "POST" &&
              pathname === registerPath
            ) {

              try {

                const body =
                  await readJsonBody<{
                    name?: string
                    email?: string
                    password?: string
                  }>(req)


                const name =
                  body.name?.trim()

                const email =
                  body.email?.trim()

                const password =
                  body.password?.trim()



                if (
                  !name ||
                  !email ||
                  !password
                ) {
                  return sendJson(
                    res,
                    400,
                    {
                      ok: false,
                      error:
                        "All fields required"
                    }
                  )
                }


                const result =
                  createUser(
                    name,
                    email,
                    password
                  )


                if (!result.ok) {
                  return sendJson(
                    res,
                    409,
                    {
                      ok: false,
                      error:
                        result.error
                    }
                  )
                }


                const token =
                  createTokenForUser(
                    result.user
                  )


                return sendJson(
                  res,
                  201,
                  {
                    ok: true,
                    token,
                    tokenType:
                      "Bearer",
                    user:
                      sanitizeUser(
                        result.user
                      )
                  }
                )


              } catch {

                return sendJson(
                  res,
                  400,
                  {
                    ok: false,
                    error:
                      "Invalid JSON body"
                  }
                )
              }
            }



            // PROTECTED ROUTES

            const isProtected =
              protectedPrefixes.some(
                (prefix) =>
                  pathname.startsWith(prefix)
              )


            if (!isProtected) {
              return next()
            }


            const token =
              parseBearerToken(
                req.headers.authorization
              )


            const user =
              getUserByToken(token)


            if (!user) {
              return sendUnauthorized(
                res,
                "Unauthorized"
              )
            }


            next()
          }
        )
      }
    },


    jsonServer({
      apiPath: "/api",
      profile: "server",
      source: "db.json",
    }),
  ],


  server: {
    host: "0.0.0.0",
    port: 3000,
  },
})