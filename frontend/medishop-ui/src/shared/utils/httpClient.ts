import { API_CONFIG } from '../constants/api'

export interface ApiResponse<T = any> {
  data?: T
  message?: string
  success: boolean
  errors?: Record<string, string[]>
}

export class ApiError extends Error {
  public readonly status: number
  public readonly errors?: Record<string, string[]>

  constructor(
      status: number,
      message: string,
      errors?: Record<string, string[]>
  ) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.errors = errors
  }
}

export class HttpClient {
  private readonly baseURL: string
  private readonly timeout: number

  constructor(
      baseURL: string = API_CONFIG.BASE_URL,
      timeout: number = API_CONFIG.TIMEOUT
  ) {
    this.baseURL = baseURL
    this.timeout = timeout
  }

  private getAuthHeaders(): HeadersInit {
    const token = localStorage.getItem('authToken')
    return {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    }
  }

  private async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      const errorData = await response
          .json()
          .catch(() => ({ message: 'Network error occurred' }))
      throw new ApiError(response.status, errorData.message, errorData.errors)
    }
    const contentType = response.headers.get('content-type') || ''
    if (contentType.includes('application/json')) {
      return response.json()
    }
    return ({} as T)
  }

  private async fetchWithTimeout(
      input: RequestInfo,
      init: RequestInit = {}
  ): Promise<Response> {
    const controller = new AbortController()
    const id = window.setTimeout(() => controller.abort(), this.timeout)

    try {
      const response = await fetch(input, {
        ...init,
        signal: controller.signal,
      })
      return response
    } catch (err: any) {
      if (err.name === 'AbortError') {
        throw new Error(`Request timed out after ${this.timeout}ms`)
      }
      throw err
    } finally {
      clearTimeout(id)
    }
  }

  async get<T>(endpoint: string): Promise<T> {
    const response = await this.fetchWithTimeout(
        `${this.baseURL}${endpoint}`,
        {
          method: 'GET',
          headers: this.getAuthHeaders(),
        }
    )
    return this.handleResponse<T>(response)
  }

  async post<T>(endpoint: string, data?: any): Promise<T> {
    const response = await this.fetchWithTimeout(
        `${this.baseURL}${endpoint}`,
        {
          method: 'POST',
          headers: this.getAuthHeaders(),
          body: data != null ? JSON.stringify(data) : undefined,
        }
    )
    return this.handleResponse<T>(response)
  }

  async put<T>(endpoint: string, data?: any): Promise<T> {
    const response = await this.fetchWithTimeout(
        `${this.baseURL}${endpoint}`,
        {
          method: 'PUT',
          headers: this.getAuthHeaders(),
          body: data != null ? JSON.stringify(data) : undefined,
        }
    )
    return this.handleResponse<T>(response)
  }

  async delete<T>(endpoint: string, data?: any): Promise<T> {
    const response = await this.fetchWithTimeout(
        `${this.baseURL}${endpoint}`,
        {
          method: 'DELETE',
          headers: this.getAuthHeaders(),
          body: data != null ? JSON.stringify(data) : undefined,
        }
    )
    return this.handleResponse<T>(response)
  }
}

export const httpClient = new HttpClient()
