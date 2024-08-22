import React from 'react';

// header
const Header = ({ courseName }) => {
  return (
    <h1>{courseName}</h1>
  );
};

// part
const Part = ({ part }) => {
  return (
    <p>{part.name} {part.exercises}</p>
  );
};

// content
const Content = ({ parts }) => {
  return (
    <div>
      {parts.map(part => (
        <Part key={part.id} part={part} />
      ))}
    </div>
  );
};

// total
const Total = ({ total }) => {
  return (
    <p><strong>Total exercises: {total}</strong></p>
  );
};

// course
const Course = ({ course }) => {
  const totalExercises = course.parts.reduce((sum, part) => sum + part.exercises, 0);

  return (
    <div>
      <Header courseName={course.name} />
      <Content parts={course.parts} />
      <Total total={totalExercises} /> {/* show total */}
    </div>
  );
};

export default Course;