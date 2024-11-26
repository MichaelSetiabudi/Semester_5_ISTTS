import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home'
import AdminDashboard from './pages/AdminDashboard'
import EditProduct from './pages/EditProduct'  
import BuyerDashboard from './pages/BuyerDashboard'
import Login from './pages/Login'
import Error from './pages/Error'
import productLoader from './loaders/productLoader'

const dataHandler = {
  checkAuth: async ({ request }) => {
    const formData = await request.formData()
    const username = formData.get('username')
    const password = formData.get('password')
    
    if (username === 'admin' && password === 'admin') {
      return { success: true, role: 'admin', redirectTo: '/admin/barang' }
    } else if (username === 'buyer' && password === 'buyer') {
      return { success: true, role: 'buyer', redirectTo: '/buyer/home' }
    }
    
    throw new Error('Invalid credentials')
  }
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Login />,
        action: dataHandler.checkAuth
      },
      {
        path: 'admin',
        children: [
          {
            path: 'barang',
            element: <AdminDashboard />,
            loader: productLoader.loadProducts,
            action: productLoader.formProductAction,
          },
          {
            path: 'barang/:id',
            element: <EditProduct />,
            loader: productLoader.getProduct,
            action: productLoader.formProductAction,
          }
        ]
      },
      {
        path: 'buyer',
        children: [
          {
            path: 'home',
            element: <BuyerDashboard />,
          }
        ]
      }
    ]
  }
])

function App() {
  return <RouterProvider router={router} />
}

export default App