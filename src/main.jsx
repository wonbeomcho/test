import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import App from './App.jsx';
import Home from './pages/Home.jsx';
import DiaryList from './pages/DiaryList.jsx';
import DiaryDetail from './pages/DiaryDetail.jsx';
import DiaryEditor from './pages/DiaryEditor.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: ':userId/list',
        element: <DiaryList />,
      },
      {
        path: ':userId/diary/:id',
        element: <DiaryDetail />,
      },
      {
        path: ':userId/new',
        element: <DiaryEditor />,
      },
      {
        path: ':userId/edit/:id',
        element: <DiaryEditor />,
      },
    ],
  },
],{
  basename:  '/test/',
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
