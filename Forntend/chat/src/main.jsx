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
import Profile from './Pages/Chat_Pages/Profile.jsx';
import Theme from './Pages/Chat_Pages/Settings/Theme.jsx';
const rout = createBrowserRouter([
  {
    path: '/',
    element: <ChatDashboard />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/Chat/:phoneNumber", element: <Chat /> },
      { path: "/Chat/", element: <Chat /> },
      { path: "/Contects", element: <Contects /> },
      { path: "/Calls", element: <Calls /> },
      { path: "/Setting", element: <Setting /> },
      { path: "/Profile", element: <Profile /> },
      {path: "/Theme",element: <Theme />},
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
