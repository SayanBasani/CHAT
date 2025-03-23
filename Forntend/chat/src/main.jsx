import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from './Pages/Home.jsx';
import Dashbord from './Pages/Dashbord.jsx';
import Login from './Pages/Account/Login.jsx';
import Singup from './Pages/Account/Singup.jsx';
import StorageProvider from './Storage/StorageProvider.jsx';
import ChatDashboard from './Pages/Chat_Pages/ChatDashboard.jsx';
import Chat from './Pages/Chat_Pages/Chat.jsx';
import Contects from './Pages/Chat_Pages/Contects.jsx';
import Calls from './Pages/Chat_Pages/Calls.jsx';
import Setting from './Pages/Chat_Pages/Setting.jsx';
import SocketProvider from './Storage/Sockets.jsx';
const rout = createBrowserRouter([
  {
    path: '/',
    element: <ChatDashboard />,
    children: [
      { path: "/Chat", element: <Chat /> },
      { path: "/Contects", element: <Contects /> },
      { path: "/Calls", element: <Calls /> },
      { path: "/Setting", element: <Setting /> },
    ]
  },
  {
    path: "/Home",
    element: <Home />,
  },
  {
    path: '/Dashbord',
    element: <Dashbord />
  },
  {
    path: '/Login',
    element: <Login />
  },
  {
    path: '/Singup',
    element: <Singup />
  },
  // {
  //   path:'/Chat',
  //   element: <ChatDashboard/>
  // },
  {
    path: '/Chat',
    element: <Chat />
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <StorageProvider>
      <SocketProvider>
        <RouterProvider router={rout}></RouterProvider>
      </SocketProvider>
    </StorageProvider>
  </StrictMode>,
)
