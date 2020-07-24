package ru.dfsystems.spring.tutorial.service;

import lombok.val;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.dfsystems.spring.tutorial.dao.StudentToCourseDaoImpl;
import ru.dfsystems.spring.tutorial.dao.course.CourseDaoImpl;
import ru.dfsystems.spring.tutorial.dao.course.CourseListDao;
import ru.dfsystems.spring.tutorial.dto.BaseListDto;
import ru.dfsystems.spring.tutorial.dto.course.CourseDto;
import ru.dfsystems.spring.tutorial.dto.course.CourseHistoryDto;
import ru.dfsystems.spring.tutorial.dto.course.CourseListDto;
import ru.dfsystems.spring.tutorial.dto.course.CourseParams;
import ru.dfsystems.spring.tutorial.dto.lesson.LessonListDto;
import ru.dfsystems.spring.tutorial.dto.student.StudentListDto;
import ru.dfsystems.spring.tutorial.generated.tables.pojos.Course;
import ru.dfsystems.spring.tutorial.mapping.MappingService;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CourseService extends BaseService<CourseHistoryDto, CourseListDto, CourseDto, CourseParams, Course> {

    private StudentToCourseDaoImpl studentToCourseDao;

    @Autowired
    public CourseService(MappingService mappingService, CourseListDao courseListDao, CourseDaoImpl courseDao,
                         StudentToCourseDaoImpl studentToCourseDao) {
        super(mappingService, courseListDao, courseDao, CourseListDto.class, CourseDto.class, Course.class);
        this.studentToCourseDao = studentToCourseDao;
    }

    public List<LessonListDto> getLessonsByCourseIdd(Integer idd) {
        val course = super.get(idd);
        if (course == null) throw new RuntimeException("Отсутствует курс");
        return super.get(idd).getLessons();
    }

    @Override
    public CourseDto create(CourseDto dto) {
        CourseDto courseDto = super.create(dto);
        mergeStudents(dto.getIdd(), dto.getStudents(), courseDto.getStudents());
        return get(courseDto.getIdd());
    }

    @Override
    public CourseDto update(Integer idd, CourseDto dto) {
        CourseDto courseDto = super.update(idd, dto);
        mergeStudents(dto.getIdd(), dto.getStudents(), courseDto.getStudents());
        return get(courseDto.getIdd());
    }

    private void mergeStudents(Integer studentIdd, List<StudentListDto> newStudents, List<StudentListDto> oldStudents) {
        List<Integer> newIdds = newStudents.stream().map(BaseListDto::getIdd).collect(Collectors.toList());
        List<Integer> oldIdds = oldStudents.stream().map(BaseListDto::getIdd).collect(Collectors.toList());

        List<Integer> iddsToBeDelete = oldIdds.stream().filter(o -> !newIdds.contains(o)).collect(Collectors.toList());
        List<Integer> iddsToBeAdd = newIdds.stream().filter(o -> !oldIdds.contains(o)).collect(Collectors.toList());


        studentToCourseDao.deleteByStudentAndCourseIdd(studentIdd, iddsToBeDelete);
        studentToCourseDao.createByStudentAndCourseIdd(studentIdd, iddsToBeAdd);
    }
}
