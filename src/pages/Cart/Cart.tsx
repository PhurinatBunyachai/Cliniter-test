import { useState } from 'react'

interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
}

const initialItems: CartItem[] = [
  { id: 1, name: "Product 1", price: 99.99, quantity: 0 },
  { id: 2, name: "Product 2", price: 149.99, quantity: 0 },
  { id: 3, name: "Product 3", price: 199.99, quantity: 0 },
  { id: 4, name: "Product 4", price: 79.99, quantity: 0 },
  { id: 5, name: "Product 5", price: 299.99, quantity: 0 },
  { id: 6, name: "Product 6", price: 129.99, quantity: 0 },
  { id: 7, name: "Product 7", price: 89.99, quantity: 0 },
  { id: 8, name: "Product 8", price: 159.99, quantity: 0 },
  { id: 9, name: "Product 9", price: 249.99, quantity: 0 },
  { id: 10, name: "Product 10", price: 179.99, quantity: 0 },
]

export default function Cart() {
  const [items, setItems] = useState<CartItem[]>(initialItems)

  const addToCart = (id: number) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    ))
  }

  const removeFromCart = (id: number) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, quantity: Math.max(0, item.quantity - 1) } : item
    ))
  }
  const onCheckout = () => {
    alert(`summary price is ${total} THB`)
  }

  const cartItems = items.filter(item => item.quantity > 0)
  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)

  return (
    <div className="max-w-[1280px] mx-auto p-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Shopping Cart</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <div className="space-y-4">
              {items.map(item => (
                <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h3 className="font-medium text-gray-900">{item.name}</h3>
                    <p className="text-gray-500">{item.price.toFixed(2)} THB</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 cursor-pointer disabled:cursor-not-allowed"
                      disabled={!item.quantity}
                    >
                      -
                    </button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <button
                      onClick={() => addToCart(item.id)}
                      className="px-3 py-1 text-sm bg-indigo-100 text-indigo-700 rounded-md hover:bg-indigo-200 cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="md:col-span-1">
            <div className="bg-gray-50 rounded-lg p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h2>
              <div className="space-y-2">
                {cartItems.map(cart =>(
                    <div className="flex justify-between text-sm" key={cart.id}>
                        <span className="text-gray-600">{cart.name}</span>
                        <span className="text-gray-900">{(cart.price * cart.quantity).toFixed(2)} THB</span>
                    </div>
                ))}
                <div className="border-t pt-2 mt-2">
                  <div className="flex justify-between font-medium">
                    <span className="text-gray-900">Total</span>
                    <span className="text-gray-900">{total.toFixed(2)} THB</span>
                  </div>
                </div>
              </div>
              <button
                className="w-full mt-6 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={cartItems.length === 0}
                onClick={() => onCheckout()}
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
