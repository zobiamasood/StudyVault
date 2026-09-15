import { Routes, Route } from 'react-router-dom';
import Navbar from './components/NavbarModern';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './pages/DashboardFinal';
import Resources from './pages/ResourcesModern';
import AddResource from './pages/AddResourceModern';
import EditResource from './pages/EditResourceModern';
import ResourceDetails from './pages/ResourceDetailsModern';
import Login from './pages/LoginModern';
import Signup from './pages/SignupModern';
function App() {
  return (
    <div className="min-h-screen bg-warm-cream">
      <Navbar />
      <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/resources"
            element={
              <ProtectedRoute>
                <Resources />
              </ProtectedRoute>
            }
          />
          <Route
            path="/resources/add"
            element={
              <ProtectedRoute>
                <AddResource />
              </ProtectedRoute>
            }
          />
          <Route
            path="/resources/:id"
            element={
              <ProtectedRoute>
                <ResourceDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path="/resources/:id/edit"
            element={
              <ProtectedRoute>
                <EditResource />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;
