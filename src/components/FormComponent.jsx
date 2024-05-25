import React, { useState, useEffect } from 'react';

const FormComponent = () => {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    address: ''
  });

  const [students, setStudents] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    const storedStudents = JSON.parse(localStorage.getItem('students')) || [];
    setStudents(storedStudents);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      const updatedStudents = students.map((student, index) =>
        index === editIndex ? formData : student
      );
      setStudents(updatedStudents);
      localStorage.setItem('students', JSON.stringify(updatedStudents));
      setIsEditing(false);
      setEditIndex(null);
    } else {
      const updatedStudents = [...students, formData];
      setStudents(updatedStudents);
      localStorage.setItem('students', JSON.stringify(updatedStudents));
    }
    setFormData({
      name: '',
      mobile: '',
      address: ''
    });
  };

  const handleEdit = (index) => {
    setFormData(students[index]);
    setIsEditing(true);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const updatedStudents = students.filter((_, i) => i !== index);
    setStudents(updatedStudents);
    localStorage.setItem('students', JSON.stringify(updatedStudents));
  };

  return (
    <div className="bg-gradient-to-r from-blue-300 to-purple-500 h-screen flex flex-col pt-20 justify-center items-center align-center">
      <div className="mt-72 py-10 px-6 max-w-[50%] h-full bg-white bg-opacity-30 rounded-lg shadow-lg backdrop-blur-xl backdrop-filter border-4 border-black">
        <h1 className="text-3xl font-extrabold text-center text-gray-800 mb-5">Student Manager</h1>
        <p className="text-lg text-center text-gray-700 mb-8">Student Count: {students.length}</p>
        <form onSubmit={handleSubmit} className="flex flex-col">
          <div className="mb-5">
            <label htmlFor="name" className="text-gray-700 font-semibold mb-2">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="bg-transparent border rounded-lg shadow border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 py-2 px-4 block w-full appearance-none leading-normal"
              required
            />
          </div>
          <div className="mb-5">
            <label htmlFor="mobile" className="text-gray-700 font-semibold mb-2">Mobile:</label>
            <input
              type="tel"
              id="mobile"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              className="bg-transparent border rounded-lg shadow border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 py-2 px-4 block w-full appearance-none leading-normal"
              required
            />
          </div>
          <div className="mb-5">
            <label htmlFor="address" className="text-gray-700 font-semibold mb-2">Address:</label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="bg-transparent border rounded-lg shadow border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 py-2 px-4 block w-full appearance-none leading-normal"
              required
            />
          </div>
          <button type="submit" className="bg-gradient-to-r from-purple-400 to-indigo-500 text-white font-semibold py-2 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out mb-5">
            {isEditing ? 'Update' : 'Submit'}
          </button>
        </form>
        
      </div>
      <div className='bg-gradient-to-r from-blue-300 to-purple-500 w-full'>
          <div className="w-1/2 mx-auto">
          <h2 className="text-xl font-bold text-gray-800 mt-5">Stored Students</h2>
          <ul className="mt-3">
            {students.map((student, index) => (
              <li key={index} className="mb-2 p-2 bg-white bg-opacity-40 rounded flex justify-between items-center">
                <div>
                  <p className="text-gray-800"><strong className='px-2'>Name: </strong> {student.name}</p>
                  <p className="text-gray-800"><strong className='px-2'>Mobile: </strong> {student.mobile}</p>
                  <p className="text-gray-800"><strong className='px-2'>Address: </strong> {student.address}</p>
                </div>
                <div>
                  <button onClick={() => handleEdit(index)} className="bg-yellow-400 text-white font-semibold py-1 px-3 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out mr-2">Edit</button>
                  <button onClick={() => handleDelete(index)} className="bg-red-500 text-white font-semibold py-1 px-3 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out">Delete</button>
                </div>
              </li>
            ))}
          </ul>
          </div>
        </div>
    </div>
  );
};

export default FormComponent;
