'use client';
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { validateEmail, validatePhoneNumber, validatePassword } from '../../utils/validations';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import '../../styles/custom-phone-input.css';
import Link from 'next/link';


const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    date_of_birth: '',
    company_name: '',
    phone_number: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  
  const handlePhoneChange = (value) => {
    setFormData({
      ...formData,
      phone_number: value,
    });
  };

  const validateForm = () => {
    let errors = {};
    if (!formData.username) errors.name = 'Name is required';
    if (!validateEmail(formData.email)) errors.email = 'Invalid email address';
    if (!formData.date_of_birth) errors.date_of_birth = 'Date of Birth is required';
    if (!validatePhoneNumber(formData.phone_number)) errors.phone_number = 'Invalid phone number';
    if (!validatePassword(formData.password)) errors.password = 'Password must be at least 8 characters long and include both letters and numbers';
    if (formData.password !== formData.confirmPassword) errors.confirmPassword = 'Passwords do not match';
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await axios.post('http://localhost:3001/api/auth/register', formData);
        localStorage.setItem('token', response.data.token); 
        toast.success('Registration successful!');
        router.push('/dashboard');
      } catch (error) {
        if (error.response && error.response.status === 400 && error.response.data.message === 'User already exists') {
          toast.error('User already exists. Please try logging in.');
        } else {
          toast.error('Registration failed. Please try again.');
        }
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-96">
        <h1 className="text-2xl font-bold text-white mb-4">Register</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-300 mb-2">Name:</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-700 text-white"
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-300 mb-2">Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-700 text-white"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-300 mb-2">Date of Birth:</label>
            <input
              type="date"
              name="date_of_birth"
              value={formData.date_of_birth}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-700 text-white"
            />
            {errors.date_of_birth && <p className="text-red-500 text-sm">{errors.date_of_birth}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-300 mb-2">Company Name:</label>
            <input
              type="text"
              name="company_name"
              value={formData.company_name}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-700 text-white"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-300 mb-2">Phone Number:</label>
            <PhoneInput
              country={'in'}
              value={formData.phone_number}
              onChange={handlePhoneChange}
              inputClass="w-full p-2 rounded bg-gray-700 text-white"
              buttonClass="bg-gray-700 text-white"
            />
            {errors.phone_number && <p className="text-red-500 text-sm">{errors.phone_number}</p>}
          </div>
          <div className="mb-4">
              <label className="block text-gray-300 mb-2">ID CARD:</label>
              <input
              type="file"
              name="avatar"
              accept="image/*"
              className="w-full p-2 rounded bg-gray-700 text-white"
              />
             
          </div>
          <div className="mb-4">
            <label className="block text-gray-300 mb-2">Password:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-700 text-white"
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-300 mb-2">Confirm Password:</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-700 text-white"
            />
            {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
          </div>
          <button type="submit" className="w-full p-2 bg-indigo-600 rounded text-white">Sign Up</button>
        </form>
        <p className="text-gray-300 mt-4">
          Already have an account? <Link href="/login" className="text-indigo-500">Login</Link>
        </p>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Register;
