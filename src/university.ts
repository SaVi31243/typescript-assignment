/**
 * University management system using enums, interfaces and a class.
 * This file defines enumerations, interfaces and implements a class
 * that performs basic operations for students, courses and grades.
 */

// Enumeration of possible student statuses
enum StudentStatus {
  Active = "Active",
  Academic_Leave = "Academic_Leave",
  Graduated = "Graduated",
  Expelled = "Expelled"
}

// Enumeration of course types
enum CourseType {
  Mandatory = "Mandatory",
  Optional = "Optional",
  Special = "Special"
}

// Enumeration of semesters
enum Semester {
  First = "First",
  Second = "Second"
}

// Enumeration of grade values
enum GradeEnum {
  Excellent = 5,
  Good = 4,
  Satisfactory = 3,
  Unsatisfactory = 2
}

// Enumeration of faculties
enum Faculty {
  Computer_Science = "Computer_Science",
  Economics = "Economics",
  Law = "Law",
  Engineering = "Engineering"
}

// Interface representing a student
interface Student {
  id: number;
  fullName: string;
  faculty: Faculty;
  year: number;
  status: StudentStatus;
  enrollmentDate: Date;
  groupNumber: string;
}

// Interface representing a course
interface Course {
  id: number;
  name: string;
  type: CourseType;
  credits: number;
  semester: Semester;
  faculty: Faculty;
  maxStudents: number;
}

// Interface representing a grade entry
interface GradeEntry {
  studentId: number;
  courseId: number;
  grade: GradeEnum;
  date: Date;
  semester: Semester;
}

/**
 * Class UniversityManagementSystem
 * Contains logic to manage students, courses, registrations and grades.
 */
class UniversityManagementSystem {
  private students: Student[] = [];
  private courses: Course[] = [];
  private registrations: { studentId: number; courseId: number }[] = [];
  private grades: GradeEntry[] = [];
  private nextStudentId = 1;
  private nextCourseId = 1;

  // Enroll a new student and assign an id
  enrollStudent(student: Omit<Student, "id">): Student {
    const newStudent: Student = { id: this.nextStudentId++, ...student };
    this.students.push(newStudent);
    return newStudent;
  }

  // Add a new course and assign an id
  addCourse(course: Omit<Course, "id">): Course {
    const newCourse: Course = { id: this.nextCourseId++, ...course };
    this.courses.push(newCourse);
    return newCourse;
  }

  // Register a student for a course if possible
  registerForCourse(studentId: number, courseId: number): void {
    const student = this.students.find(s => s.id === studentId);
    const course = this.courses.find(c => c.id === courseId);
    if (!student) {
      throw new Error(`Student with id ${studentId} not found.`);
    }
    if (!course) {
      throw new Error(`Course with id ${courseId} not found.`);
    }
    if (student.faculty !== course.faculty) {
      throw new Error(`Student's faculty ${student.faculty} does not match course faculty ${course.faculty}.`);
    }
    const count = this.registrations.filter(r => r.courseId === courseId).length;
    if (count >= course.maxStudents) {
      throw new Error(`Course ${course.name} is full.`);
    }
    const existing = this.registrations.find(r => r.studentId === studentId && r.courseId === courseId);
    if (existing) {
      throw new Error(`Student ${studentId} is already registered for course ${courseId}.`);
    }
    this.registrations.push({ studentId, courseId });
  }

  // Assign a grade to a student for a course
  setGrade(studentId: number, courseId: number, grade: GradeEnum): void {
    const student = this.students.find(s => s.id === studentId);
    const course = this.courses.find(c => c.id === courseId);
    if (!student || !course) {
      throw new Error("Student or course not found.");
    }
    const registered = this.registrations.some(r => r.studentId === studentId && r.courseId === courseId);
    if (!registered) {
      throw new Error(`Student ${studentId} is not registered for course ${courseId}.`);
    }
    const entry: GradeEntry = {
      studentId,
      courseId,
      grade,
      date: new Date(),
      semester: course.semester
    };
    this.grades.push(entry);
  }

  // Update the status of a student
  updateStudentStatus(studentId: number, newStatus: StudentStatus): void {
    const student = this.students.find(s => s.id === studentId);
    if (!student) {
      throw new Error(`Student with id ${studentId} not found.`);
    }
    if (student.status !== newStatus) {
      student.status = newStatus;
    }
  }

  // Get all students for a given faculty
  getStudentsByFaculty(faculty: Faculty): Student[] {
    return this.students.filter(s => s.faculty === faculty);
  }

  // Get all grade entries for a student
  getStudentGrades(studentId: number): GradeEntry[] {
    return this.grades.filter(g => g.studentId === studentId);
  }

  // Get available courses for a faculty and semester
  getAvailableCourses(faculty: Faculty, semester: Semester): Course[] {
    return this.courses.filter(course => {
      if (course.faculty !== faculty || course.semester !== semester) return false;
      const count = this.registrations.filter(r => r.courseId === course.id).length;
      return count < course.maxStudents;
    });
  }

  // Calculate the average grade for a student
  calculateAverageGrade(studentId: number): number {
    const studentGrades = this.getStudentGrades(studentId);
    if (studentGrades.length === 0) {
      return 0;
    }
    const sum = studentGrades.reduce((acc, gr) => acc + gr.grade, 0);
    return sum / studentGrades.length;
  }

  // Get honours students for a faculty (average grade >= 4.5)
  getHonoursStudentsByFaculty(faculty: Faculty): Student[] {
    return this.getStudentsByFaculty(faculty).filter(s => this.calculateAverageGrade(s.id) >= 4.5);
  }
}

// --- Example usage ---
const ums = new UniversityManagementSystem();
// create a course for Economics faculty
const econCourse = ums.addCourse({
  name: "Microeconomics",
  type: CourseType.Mandatory,
  credits: 3,
  semester: Semester.First,
  faculty: Faculty.Economics,
  maxStudents: 50
});
// enroll a new student
const econStudent = ums.enrollStudent({
  fullName: "Олег Іванов",
  faculty: Faculty.Economics,
  year: 1,
  status: StudentStatus.Active,
  enrollmentDate: new Date(),
  groupNumber: "ECO-101"
});
// register and assign a grade
ums.registerForCourse(econStudent.id, econCourse.id);
ums.setGrade(econStudent.id, econCourse.id, GradeEnum.Excellent);
console.log(ums.calculateAverageGrade(econStudent.id));
