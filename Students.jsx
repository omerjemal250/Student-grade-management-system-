import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Students() {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [grades, setGrades] = useState([]);
  const [selectedStudentId, setSelectedStudentId] = useState('');
  const [selectedStudentForGrade, setSelectedStudentForGrade] = useState('');
  const [selectedCourseId, setSelectedCourseId] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [department, setDepartment] = useState('');
  const [courseName, setCourseName] = useState('');
  const [creditHour, setCreditHour] = useState('');
  const [marks, setMarks] = useState('');
  const [grade, setGrade] = useState('');
  const [point, setPoint] = useState('');
  const [editStudentId, setEditStudentId] = useState('');
  const [editFirstName, setEditFirstName] = useState('');
  const [editLastName, setEditLastName] = useState('');
  const [editDepartment, setEditDepartment] = useState('');
  const [editCourseId, setEditCourseId] = useState('');
  const [editCourseName, setEditCourseName] = useState('');
  const [editCreditHour, setEditCreditHour] = useState('');
  const [editGradeId, setEditGradeId] = useState('');
  const [editCourseIdForGrade, setEditCourseIdForGrade] = useState('');
  const [editMarks, setEditMarks] = useState('');
  const [editGradeText, setEditGradeText] = useState('');
  const [editPoint, setEditPoint] = useState('');
  const [studentFormTouched, setStudentFormTouched] = useState(false);
  const [courseFormTouched, setCourseFormTouched] = useState(false);
  const [gradeFormTouched, setGradeFormTouched] = useState(false);
  const [studentEditTouched, setStudentEditTouched] = useState(false);
  const [courseEditTouched, setCourseEditTouched] = useState(false);
  const [gradeEditTouched, setGradeEditTouched] = useState(false);
  const [searchName, setSearchName] = useState('');
  const [studentGpa, setStudentGpa] = useState(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [userRole, setUserRole] = useState('');
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('userRole') || 'user';
    setUserRole(role);
    if (!token) {
      navigate('/login');
      return;
    }
    loadProfile();
    loadStudents();
    loadCourses();
    loadGrades();
  }, [navigate]);

  const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return {
      Authorization: token ? `Bearer ${token}` : ''
    };
  };

  const loadStudents = async () => {
    try {
      const response = await axios.get('/api/students', {
        headers: getAuthHeaders()
      });
      setStudents(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load students.');
    }
  };

  const loadCourses = async () => {
    try {
      const response = await axios.get('/api/courses', {
        headers: getAuthHeaders()
      });
      setCourses(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load courses.');
    }
  };

  const loadGrades = async () => {
    try {
      const response = await axios.get('/api/grades', {
        headers: getAuthHeaders()
      });
      setGrades(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load grades.');
    }
  };

  const loadProfile = async () => {
    try {
      const response = await axios.get('/api/me', {
        headers: getAuthHeaders()
      });
      setProfile(response.data);
      setUserRole(response.data.role || 'user');
    } catch (err) {
      if (err.response?.status === 401 || err.response?.status === 403) {
        navigate('/login');
      }
    }
  };

  const handleAddStudent = async () => {
    setMessage('');
    setError('');
    setStudentFormTouched(true);

    if (!firstName || !lastName || !department) {
      setError('Please fill in first name, last name, and department.');
      return;
    }

    try {
      await axios.post(
        '/api/students',
        {
          first_name: firstName,
          last_name: lastName,
          department
        },
        { headers: getAuthHeaders() }
      );
      setMessage('Student added successfully.');
      setFirstName('');
      setLastName('');
      setDepartment('');
      setStudentFormTouched(false);
      await loadStudents();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add student.');
    }
  };

  const handleAddCourse = async () => {
    setMessage('');
    setError('');
    setCourseFormTouched(true);

    if (!courseName || !creditHour) {
      setError('Please fill in course name and credit hour.');
      return;
    }

    try {
      await axios.post(
        '/api/courses',
        {
          course_name: courseName,
          credit_hour: creditHour
        },
        { headers: getAuthHeaders() }
      );
      setMessage('Course added successfully.');
      setCourseName('');
      setCreditHour('');
      setCourseFormTouched(false);
      await loadCourses();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add course.');
    }
  };

  const handleAddGrade = async () => {
    setMessage('');
    setError('');
    setGradeFormTouched(true);

    if (!selectedStudentForGrade || !selectedCourseId || !marks || !grade || !point) {
      setError('Please choose student, course and fill marks, grade and point.');
      return;
    }

    try {
      await axios.post(
        '/api/grades',
        {
          student_id: selectedStudentForGrade,
          course_id: selectedCourseId,
          marks,
          grade,
          point
        },
        { headers: getAuthHeaders() }
      );
      setMessage('Grade added successfully.');
      setSelectedStudentForGrade('');
      setSelectedCourseId('');
      setMarks('');
      setGrade('');
      setPoint('');
      setGradeFormTouched(false);
      await loadGrades();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add grade.');
    }
  };

  const handleDeleteStudent = async (studentId) => {
    setMessage('');
    setError('');

    try {
      await axios.delete(`/api/students/${studentId}`, {
        headers: getAuthHeaders()
      });
      setMessage('Student deleted successfully.');
      await loadStudents();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to delete student.');
    }
  };

  const handleDeleteCourse = async (courseId) => {
    setMessage('');
    setError('');

    try {
      await axios.delete(`/api/courses/${courseId}`, {
        headers: getAuthHeaders()
      });
      setMessage('Course deleted successfully.');
      await loadCourses();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to delete course.');
    }
  };

  const handleDeleteGrade = async (gradeId) => {
    setMessage('');
    setError('');

    try {
      await axios.delete(`/api/grades/${gradeId}`, {
        headers: getAuthHeaders()
      });
      setMessage('Grade deleted successfully.');
      await loadGrades();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to delete grade.');
    }
  };

  const handleStartStudentEdit = (student) => {
    setEditStudentId(student.student_id);
    setEditFirstName(student.first_name);
    setEditLastName(student.last_name);
    setEditDepartment(student.department);
  };

  const handleUpdateStudent = async () => {
    if (!editStudentId) return;
    setStudentEditTouched(true);
    setMessage('');
    setError('');

    if (!editFirstName || !editLastName || !editDepartment) {
      setError('Please fill in first name, last name, and department.');
      return;
    }

    try {
      await axios.put(
        `/api/students/${editStudentId}`,
        {
          first_name: editFirstName,
          last_name: editLastName,
          department: editDepartment
        },
        { headers: getAuthHeaders() }
      );
      setMessage('Student updated successfully.');
      setEditStudentId('');
      setEditFirstName('');
      setEditLastName('');
      setEditDepartment('');
      setStudentEditTouched(false);
      await loadStudents();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to update student.');
    }
  };

  const handleStartCourseEdit = (course) => {
    setEditCourseId(course.course_id);
    setEditCourseName(course.course_name);
    setEditCreditHour(course.credit_hour);
  };

  const handleUpdateCourse = async () => {
    if (!editCourseId) return;
    setCourseEditTouched(true);
    setMessage('');
    setError('');

    if (!editCourseName || !editCreditHour) {
      setError('Please fill in course name and credit hour.');
      return;
    }

    try {
      await axios.put(
        `/api/courses/${editCourseId}`,
        {
          course_name: editCourseName,
          credit_hour: editCreditHour
        },
        { headers: getAuthHeaders() }
      );
      setMessage('Course updated successfully.');
      setEditCourseId('');
      setEditCourseName('');
      setEditCreditHour('');
      setCourseEditTouched(false);
      await loadCourses();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to update course.');
    }
  };

  const handleStartGradeEdit = (item) => {
    setEditGradeId(item.grade_id);
    setEditCourseIdForGrade(item.course_id);
    setEditMarks(item.marks);
    setEditGradeText(item.grade);
    setEditPoint(item.point);
  };

  const handleUpdateGrade = async () => {
    if (!editGradeId) return;
    setGradeEditTouched(true);
    setMessage('');
    setError('');

    if (!editCourseIdForGrade || !editMarks || !editGradeText || !editPoint) {
      setError('Please fill all grade fields before saving.');
      return;
    }

    try {
      await axios.put(
        `/api/grades/${editGradeId}`,
        {
          course_id: editCourseIdForGrade,
          marks: editMarks,
          grade: editGradeText,
          point: editPoint
        },
        { headers: getAuthHeaders() }
      );
      setMessage('Grade updated successfully.');
      setEditGradeId('');
      setEditCourseIdForGrade('');
      setEditMarks('');
      setEditGradeText('');
      setEditPoint('');
      setGradeEditTouched(false);
      await loadGrades();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to update grade.');
    }
  };

  const loadGpa = async (studentId) => {
    if (!studentId) {
      setStudentGpa(null);
      return;
    }

    try {
      const response = await axios.get(`/api/gpa/${studentId}`, {
        headers: getAuthHeaders()
      });
      setStudentGpa(response.data.gpa);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to load GPA.');
      setStudentGpa(null);
    }
  };

  const handleGpaCheck = async () => {
    setError('');
    if (!selectedStudentId) {
      setError('Select a student to view GPA.');
      setStudentGpa(null);
      return;
    }
    await loadGpa(selectedStudentId);
  };

  return null;
}

export default Students;
