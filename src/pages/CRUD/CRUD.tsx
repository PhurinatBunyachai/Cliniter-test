import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState } from '../../store/store'
import { addProduct, updateProduct, deleteProduct, setEditingId, type Product } from '../../store/productSlice'

export default function CRUD() {
  const dispatch = useDispatch()
  const products = useSelector((state: RootState) => state.products.items)
  const editingId = useSelector((state: RootState) => state.products.editingId)

  const [formData, setFormData] = useState<Omit<Product, 'id'>>({
    name: '',
    price: 0,
    description: '',
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: name === 'price' ? parseFloat(value) || 0 : value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (editingId !== null) {
      dispatch(updateProduct({ ...formData, id: editingId }))
    } else {
      dispatch(addProduct(formData))
    }
    setFormData({ name: '', price: 0, description: '' })
  }

  const handleEdit = (product: Product) => {
    dispatch(setEditingId(product.id))
    setFormData({
      name: product.name,
      price: product.price,
      description: product.description,
    })
  }

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      dispatch(deleteProduct(id))
    }
  }

  const handleCancel = () => {
    dispatch(setEditingId(null))
    setFormData({ name: '', price: 0, description: '' })
  }

  return (
    <div className="max-w-[1280px] mx-auto p-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          {editingId !== null ? 'Edit Product' : 'Add Product'}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4 mb-8">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 h-9 px-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Price</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              required
              min="0"
              step="0.01"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 h-9 px-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 px-2"
            />
          </div>

          <div className="flex space-x-4">
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {editingId !== null ? 'Update' : 'Add'} Product
            </button>
            {editingId !== null && (
              <button
                type="button"
                onClick={handleCancel}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                Cancel
              </button>
            )}
          </div>
        </form>

        <div className="space-y-4">
          {products.map(product => (
            <div
              key={product.id}
              className="flex items-center justify-between p-4 border rounded-lg"
            >
              <div className="flex-1">
                <h3 className="font-medium text-gray-900">{product.name}</h3>
                <p className="text-gray-500">{product.price.toFixed(2)} THB</p>
                <p className="text-sm text-gray-600 mt-1">{product.description}</p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(product)}
                  className="px-3 py-1 text-sm bg-indigo-100 text-indigo-700 rounded-md hover:bg-indigo-200"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(product.id)}
                  className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded-md hover:bg-red-200"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
