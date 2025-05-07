import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface Product {
  id: number
  name: string
  price: number
  description: string
}

interface ProductState {
  items: Product[]
  editingId: number | null
}

const initialState: ProductState = {
  items: [],
  editingId: null,
}

export const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<Omit<Product, 'id'>>) => {
      const newId = state.items.length > 0 ? Math.max(...state.items.map(item => item.id)) + 1 : 1
      state.items.push({ ...action.payload, id: newId })
    },
    updateProduct: (state, action: PayloadAction<Product>) => {
      const index = state.items.findIndex(item => item.id === action.payload.id)
      if (index !== -1) {
        state.items[index] = action.payload
      }
      state.editingId = null
    },
    deleteProduct: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(item => item.id !== action.payload)
    },
    setEditingId: (state, action: PayloadAction<number | null>) => {
      state.editingId = action.payload
    },
  },
})

export const { addProduct, updateProduct, deleteProduct, setEditingId } = productSlice.actions
export default productSlice.reducer 