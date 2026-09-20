const express = require('express');
const app = express();

app.use(express.json());

const studentRoutes = []

app.post('/students', (req, res) => {
    const { name, age, grade, gender } = req.body;
    const newStudent = { 
        id: studentRoutes.length + 1,
        name,
        age,
        grade,
        gender,
        email: `${name.toLowerCase().replace(/\s+/g, '')}@school.com`,
        completed: false
     };



    studentRoutes.push(newStudent);


    res.status(201).json(newStudent);
});

app.get('/students', (req, res) => {
    res.json(studentRoutes);
});

app.get('/students/:name', (req, res) => {
    const studentName = req.params.name;
    const student = studentRoutes.find(s => s.name === studentName); 
    if (!student) {
        return res.status(404).json({ message: 'Student not found' });
    }
    res.json(student);
});


app.put('/students/:id', (req, res) => {
    const studentId = parseInt(req.params.id);
    const student = studentRoutes.find(s => s.id === studentId);
    if (!student) {
        return res.status(404).json({ message: 'Student not found' });
    }
    const { age, grade, gender } = req.body;
    student.age = age;
    student.grade = grade;
    student.gender = gender;
    res.json(student);
});


app.delete('/students/:id', (req, res) => {
    const studentId = parseInt(req.params.id);
    const studentIndex = studentRoutes.findIndex(s => s.id === studentId);
    if (studentIndex === -1) {
        return res.status(404).json({ message: 'Student not found' });
    }
    studentRoutes.splice(studentIndex, 1);
    res.json({ message: 'Student deleted' });
});


app.listen(4000, () => {
    console.log('Server is running at http://localhost:4000');
});
