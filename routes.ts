/**
 * Array de rotas que são de acesso público
 * Essas rotas não necessitam de autenticação
 * @type {string[]}
 */
export const publicRoutes = [
    "/"
   ]

/**
 * Array de rotas que são utilizadas para autenticação
 * essas rotas redirecionam o usuário a uma pagina protegida
 * @type {string[]}
 */
export const authRoutes = [
 "/auth/login",
 "/auth/register",

]

/**
 * O prefixo pras rotas de autenticação da API
 * Rotas que startar com esse prefixo são usadas para os processos de autenticação da API
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth"

export const DEFAULT_LOGIN_REDIRECT = "/settings"