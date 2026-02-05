import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser, registerUser } from '../redux/authSlice';
import { FiX, FiUser, FiMail, FiLock, FiUserCheck } from 'react-icons/fi';
import { toast } from 'react-toastify';

const LoginModal = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'client'
  });
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector(state => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      let result;
      if (isLogin) {
        result = await dispatch(loginUser({ email: formData.email, password: formData.password })).unwrap();
        toast.success('Login successful!');
      } else {
        result = await dispatch(registerUser(formData)).unwrap();
        toast.success('Registration successful!');
      }
      
      onClose();
      setFormData({ name: '', email: '', password: '', role: 'client' });
      
      // Navigate based on user role
      if (result.role === 'admin') {
        navigate('/admin-dashboard');
      } else {
        navigate('/client-dashboard');
      }
    } catch (error) {
      toast.error(error || 'Authentication failed');
    }
  };

//   const resetForm = () => {
//     setFormData({ name: '', email: '', password: '', role: 'client' });
//   };

//   const toggleMode = () => {
//     setIsLogin(!isLogin);
//     resetForm();
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//       <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-xl font-semibold">
//             {isLogin ? 'Login' : 'Sign Up'}
//           </h2>
//           <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
//             <FiX size={24} />
//           </button>
//         </div>

//         <form onSubmit={handleSubmit} className="space-y-4">
//           {!isLogin && (
//             <div>
//               <label className="block text-sm font-medium mb-1">Name</label>
//               <div className="relative">
//                 <FiUser className="absolute left-3 top-3 text-gray-400" />
//                 <input
//                   type="text"
//                   value={formData.name}
//                   onChange={(e) => setFormData({...formData, name: e.target.value})}
//                   className="w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
//                   placeholder="Your name"
//                   required
//                 />
//               </div>
//             </div>
//           )}

//           <div>
//             <label className="block text-sm font-medium mb-1">Email</label>
//             <div className="relative">
//               <FiMail className="absolute left-3 top-3 text-gray-400" />
//               <input
//                 type="email"
//                 value={formData.email}
//                 onChange={(e) => setFormData({...formData, email: e.target.value})}
//                 className="w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
//                 placeholder="your@email.com"
//                 required
//               />
//             </div>
//           </div>

//           <div>
//             <label className="block text-sm font-medium mb-1">Password</label>
//             <div className="relative">
//               <FiLock className="absolute left-3 top-3 text-gray-400" />
//               <input
//                 type="password"
//                 value={formData.password}
//                 onChange={(e) => setFormData({...formData, password: e.target.value})}
//                 className="w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
//                 placeholder="Your password"
//                 required
//               />
//             </div>
//           </div>

//           {!isLogin && (
//             <div>
//               <label className="block text-sm font-medium mb-1">Role</label>
//               <div className="relative">
//                 <FiUserCheck className="absolute left-3 top-3 text-gray-400" />
//                 <select
//                   value={formData.role}
//                   onChange={(e) => setFormData({...formData, role: e.target.value})}
//                   className="w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
//                 >
//                   <option value="client">Client</option>
//                   <option value="admin">Admin</option>
//                 </select>
//               </div>
//             </div>
//           )}

//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
//           >
//             {loading ? 'Processing...' : (isLogin ? 'Login' : 'Sign Up')}
//           </button>
//         </form>

//         <div className="mt-4 text-center">
//           <span className="text-gray-600">
//             {isLogin ? "Don't have an account? " : "Already have an account? "}
//           </span>
//           <button
//             onClick={toggleMode}
//             className="text-blue-600 hover:text-blue-700 font-medium"
//           >
//             {isLogin ? 'Sign Up' : 'Login'}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginModal;