package ru.dfsystems.spring.tutorial.service;

import lombok.var;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.dfsystems.spring.tutorial.dao.StudentToCourseDaoImpl;
import ru.dfsystems.spring.tutorial.dao.course.CourseDaoImpl;
import ru.dfsystems.spring.tutorial.dao.student.StudentDaoImpl;
import ru.dfsystems.spring.tutorial.dao.student.StudentListDao;
import ru.dfsystems.spring.tutorial.dto.BaseListDto;
import ru.dfsystems.spring.tutorial.dto.course.CourseListDto;
import ru.dfsystems.spring.tutorial.dto.student.StudentDto;
import ru.dfsystems.spring.tutorial.dto.student.StudentHistoryDto;
import ru.dfsystems.spring.tutorial.dto.student.StudentListDto;
import ru.dfsystems.spring.tutorial.dto.student.StudentParams;
import ru.dfsystems.spring.tutorial.generated.tables.pojos.Student;
import ru.dfsystems.spring.tutorial.generated.tables.pojos.StudentToCourse;
import ru.dfsystems.spring.tutorial.mapping.MappingService;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class StudentService extends BaseService<StudentHistoryDto, StudentListDto, StudentDto, StudentParams, Student> {
    private final CourseDaoImpl courseDao;
    private final StudentToCourseDaoImpl studentToCourseDao;
    private final MappingService mappingService;
    private final StudentListDao studentListDao;

    @Autowired
    public StudentService(MappingService mappingService, StudentListDao studentListDao, StudentDaoImpl studentDao, CourseDaoImpl courseDao, StudentToCourseDaoImpl studentToCourseDao) {
        super(mappingService, studentListDao, studentDao, StudentListDto.class, StudentDto.class, Student.class);
        this.courseDao = courseDao;
        this.mappingService = mappingService;
        this.studentToCourseDao = studentToCourseDao;
        this.studentListDao = studentListDao;
    }

    public List<CourseListDto> getCourses(Integer studentIdd) {
        return mappingService.mapList(courseDao.getCoursesByStudentIdd(studentIdd), CourseListDto.class);
    }

    @Transactional
    public void enrollInCourse(Integer idd, Integer courseIdd) {
        var link = new StudentToCourse();
        link.setStudentIdd(idd);
        link.setCourseIdd(courseIdd);
        studentToCourseDao.insert(link);
    }

    @Override
    public StudentDto create(StudentDto dto) {
        StudentDto result = super.create(dto);
        mergeCourses(dto.getIdd(), dto.getCourses(), result.getCourses());
        return get(result.getIdd());
    }

    @Override
    public StudentDto update(Integer idd, StudentDto dto) {
        StudentDto result = super.update(idd, dto);
        mergeCourses(dto.getIdd(), dto.getCourses(), result.getCourses());
        return get(result.getIdd());
    }

    private void mergeCourses(Integer courseIdd, List<CourseListDto> newCourses, List<CourseListDto> oldCourses) {
        List<Integer> newIdds = newCourses.stream().map(BaseListDto::getIdd).collect(Collectors.toList());
        List<Integer> oldIdds = oldCourses.stream().map(BaseListDto::getIdd).collect(Collectors.toList());

        List<Integer> iddsToBeDelete = oldIdds.stream().filter(o -> !newIdds.contains(o)).collect(Collectors.toList());
        List<Integer> iddsToBeAdd = newIdds.stream().filter(o -> !oldIdds.contains(o)).collect(Collectors.toList());


        studentToCourseDao.deleteByStudentAndCourseIdd(courseIdd, iddsToBeDelete);
        studentToCourseDao.createByStudentAndCourseIdd(courseIdd, iddsToBeAdd);
    }

    public List<StudentListDto> freeInstrumentList(Integer courseIdd) {
        return mappingService.mapList(studentListDao.freeInstrumentList(courseIdd), StudentListDto.class);
    }
}
