package ru.dfsystems.spring.tutorial.controller;

import org.springframework.web.bind.annotation.*;
import ru.dfsystems.spring.tutorial.dto.course.CourseListDto;
import ru.dfsystems.spring.tutorial.dto.student.StudentDto;
import ru.dfsystems.spring.tutorial.dto.student.StudentHistoryDto;
import ru.dfsystems.spring.tutorial.dto.student.StudentListDto;
import ru.dfsystems.spring.tutorial.dto.student.StudentParams;
import ru.dfsystems.spring.tutorial.generated.tables.pojos.Student;
import ru.dfsystems.spring.tutorial.service.StudentService;

import java.util.List;

@RestController
@RequestMapping(value = "/student", produces = "application/json; charset=UTF-8")
public class StudentController extends BaseController<StudentHistoryDto, StudentListDto, StudentDto, StudentParams, Student> {
    private final StudentService studentService;

    public StudentController(StudentService service) {
        super(service);
        this.studentService = service;
    }

    @GetMapping("/{idd}/course/list")
    public List<CourseListDto> getCourseList(@PathVariable("idd") Integer idd) {
        return studentService.getCourses(idd);
    }

    @PutMapping("/{idd}/course")
    public void enrollInCourse(@PathVariable("idd") Integer idd, @RequestBody Integer courseIdd) {
        studentService.enrollInCourse(idd, courseIdd);
    }

    @GetMapping("/{idd}/addStudent/list")
    public List<StudentListDto> getFreeInstrumentList(@PathVariable("idd") Integer courseIdd) {
        return studentService.freeInstrumentList(courseIdd);
    }
}
