import { api } from '@/lib/axios'

export interface getRestaurantResponse {
  id: string
  name: string
  createdAt: Date | null
  updatedAt: Date | null
  description: string | null
  managerId: string | null
}

export async function getManagedRestaurant() {
  const response = await api.get<getRestaurantResponse>('/managed-restaurant')

  return response.data
}
