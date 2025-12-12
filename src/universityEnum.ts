// TypeScript University Management System using Enums
// This file defines enums, interfaces and a class to manage students, courses and grades.

// Enum representing the status of a student
enum StudentStatus {
  Active = "Active",
  Academic_Leave = "Academic_Leave",
  Graduated = "Graduated",
  Expelled = "Expelled"
}

// Enum representing the type of a course
enum CourseType {
  Mandatory = "Mandatory",
  Optional = "Optional",
  Special = "Special"
}

// Enum representing the semester of study
enum Semester {
  First = "First",
  Second = "Second"
}

// Enum representing grade values (numeric)
enum Grade {
  Excellent = 5,
  Good = 4,
  Satisfactory = 3,
  Unsatisfactory = 2
}

// Enum representing university faculties
enum Faculty {
  Computer_Science = "Computer_Science",
  Economics = "Economics",
  Law = "Law",
  Engineering = "Engineering"
}

// Interface representing a student record
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

// Interface representing a grade record for a student in a course
interface GradeRecord {
  studentId: number;
  courseId: number;
  grade: Grade;
  date: Date;
  semester: Semester;
}

/**
 * University management system class.
 * Stores students, courses, registrations and grades in memory.
 * Provides methods to enroll students, register for courses, set grades,
 * update statuses, query data and calculate statistics.
 */
class UniversityManagementSystem {
  private students: Student[] = [];
  private courses: Course[] = [];
  private registrations: { studentId: number; courseId: number }[] = [];
  private grades: GradeRecord[] = [];
  private nextStudentId = 1;
  private nextCourseId = 1;

  /**
   * Enroll a new student. Assigns an id and stores the student record.
   * @param student Student data without id
   * @returns The newly created Student with id
   */
  enrollStudent(student: Omit<Student, "id">): Student {
    const newStudent: Student = { ...student, id: this.nextStudentId++ };
    this.students.push(newStudent);
    return newStudent;
  }

  /**
   * Add a new course to the system.
   * @param course Course data without id
   * @returns The newly created Course with id
   */
  addCourse(course: Omit<Course, "id">): Course {
    const newCourse: Course = { ...course, id: this.nextCourseId++ };
    this.courses.push(newCourse);
    return newCourse;
  }

  /**
   * Register a student for a course if there is capacity and faculties match.
   * @param studentId ID of the student
   * @param courseId ID of the course
   * @throws Error if student or course not found, faculties mismatch, course full, or already registered
   */
  registerForCourse(studentId: number, courseId: number): void {
    const student = this.students.find((s) => s.id === studentId);
    const course = this.courses.find((c) => c.id === courseId);
    if (!student) {
      throw new Error(`Student with id ${studentId} not found.`);
    }
    if (!course) {
      throw new Error(`Course with id ${courseId} not found.`);
    }
    // Faculty check
    if (student.faculty !== course.faculty) {
      throw new Error(
        `Student's faculty ${student.faculty} does not match course faculty ${course.faculty}.`
      );
    }
    // Capacity check
    const count = this.registrations.filter((r) => r.courseId === courseId).length;
    if (count >= course.maxStudents) {
      throw new Error(`Course ${course.name} is full.`);
    }
    // Already registered check
    const existing = this.registrations.find(
      (r) => r.studentId === studentId && r.courseId === courseId
    );
    if (existing) {
      throw new Error(
        `Student ${studentId} is already registered for course ${courseId}.`
      );
    }
    this.registrations.push({ studentId, courseId });
  }

  /**
   * Set a grade for a student in a course. Validates that the student is registered.
   * @param studentId ID of the student
   * @param courseId ID of the course
   * @param grade Grade value
   * @throws Error if student or course not found, or registration missing
   */
  setGrade(studentId: number, courseId: number, grade: Grade): void {
    const student = this.students.find((s) => s.id === studentId);
    const course = this.courses.find((c) => c.id === courseId);
    if (!student || !course) {
      throw new Error("Student or course not found.");
    }
    // Ensure registration exists
    const registered = this.registrations.some(
      (r) => r.studentId === studentId && r.courseId === courseId
    );
    if (!registered) {
      throw new Error(
        `Student ${studentId} is not registered for course ${courseId}.`
      );
    }
    const entry: GradeRecord = {
      studentId,
      courseId,
      grade,
      date: new Date(),
      semester: course.semester,
    };
    this.grades.push(entry);
  }

  /**
   * Update the status of an existing student.
   * @param studentId ID of the student
   * @param newStatus New status to assign
   * @throws Error if student not found
   */
  updateStudentStatus(studentId: number, newStatus: StudentStatus): void {
    const student = this.students.find((s) => s.id === studentId);
    if (!student) {
      throw new Error(`Student with id ${studentId} not found.`);
    }
    if (student.status !== newStatus) {
      student.status = newStatus;
    }
  }

  /**
   * Retrieve all students belonging to a given faculty.
   * @param faculty The faculty to filter by
   * @returns Array of students
   */
  getStudentsByFaculty(faculty: Faculty): Student[] {
    return this.students.filter((s) => s.faculty === faculty);
  }

  /**
   * Get all grade records for a particular student.
   * @param studentId ID of the student
   * @returns Array of grade records
   */
  getStudentGrades(studentId: number): GradeRecord[] {
    return this.grades.filter((g) => g.studentId === studentId);
  }

  /**
   * Get all available courses for a specific faculty and semester.
   * A course is available if it belongs to the given faculty and semester and is not full.
   * @param faculty The faculty to filter by
   * @param semester The semester to filter by
   * @returns Array of available courses
   */
  getAvailableCourses(faculty: Faculty, semester: Semester): Course[] {
    return this.courses.filter((course) => {
      if (course.faculty !== faculty || course.semester !== semester) return false;
      const count = this.registrations.filter((r) => r.courseId === course.id).length;
      return count < course.maxStudents;
    });
  }

  /**
   * Calculate the average grade (numerical) for a student.
   * @param studentId ID of the student
   * @returns Average grade as a number from 0 to 5; 0 if no grades
   */
  calculateAverageGrade(studentId: number): number {
    const studentGrades = this.getStudentGrades(studentId);
    if (studentGrades.length === 0) return 0;
    const sum = studentGrades.reduce((acc, gr) => acc + gr.grade, 0);
    return sum / studentGrades.length;
  }

  /**
   * Get honours students (average grade >= 4.5) for a given faculty.
   * @param faculty Faculty to check
   * @returns Array of students with average grade >= 4.5
   */
  getHonoursStudentsByFaculty(faculty: Faculty): Student[] {
    return this.getStudentsByFaculty(faculty).filter(
      (s) => this.calculateAverageGrade(s.id) >= 4.5
    );
  }
}

// --- Example usage ---

// Create an instance of the management system
const ums = new UniversityManagementSystem();

// Define courses
const algorithmsCourse = ums.addCourse({
  name: "Algorithms",
  type: CourseType.Mandatory,
  credits: 4,
  semester: Semester.First,
  faculty: Faculty.Computer_Science,
  maxStudents: 30,
});

const economicsCourse = ums.addCourse({
  name: "Macroeconomics",
  type: CourseType.Mandatory,
  credits: 3,
  semester: Semester.Second,
  faculty: Faculty.Economics,
  maxStudents: 50,
});

// Enroll students
const studentA = ums.enrollStudent({
  fullName: "Ольга Коваленко",
  faculty: Faculty.Computer_Science,
  year: 1,
  status: StudentStatus.Active,
  enrollmentDate: new Date(),
  groupNumber: "CS-101",
});

const studentB = ums.enrollStudent({
  fullName: "Ігор Сергієнко",
  faculty: Faculty.Economics,
  year: 2,
  status: StudentStatus.Active,
  enrollmentDate: new Date(),
  groupNumber: "ECO-201",
});

// Register students for courses and assign grades
ums.registerForCourse(studentA.id, algorithmsCourse.id);
ums.setGrade(studentA.id, algorithmsCourse.id, Grade.Excellent);

ums.registerForCourse(studentB.id, economicsCourse.id);
ums.setGrade(studentB.id, economicsCourse.id, Grade.Good);

// Output average grades
console.log(`Average grade for ${studentA.fullName}:`, ums.calculateAverageGrade(studentA.id));
console.log(`Average grade for ${studentB.fullName}:`, ums.calculateAverageGrade(studentB.id));

// Output honours students by faculty
console.log(
  "Honours students in Computer Science:",
  ums.getHonoursStudentsByFaculty(Faculty.Computer_Science)
);
