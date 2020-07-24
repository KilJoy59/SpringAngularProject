package ru.dfsystems.spring.tutorial.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.dfsystems.spring.tutorial.dao.course.CourseDaoImpl;
import ru.dfsystems.spring.tutorial.dao.teacher.TeacherDaoImpl;
import ru.dfsystems.spring.tutorial.dao.teacher.TeacherListDao;
import ru.dfsystems.spring.tutorial.dto.course.CourseListDto;
import ru.dfsystems.spring.tutorial.dto.teacher.TeacherDto;
import ru.dfsystems.spring.tutorial.dto.teacher.TeacherHistoryDto;
import ru.dfsystems.spring.tutorial.dto.teacher.TeacherListDto;
import ru.dfsystems.spring.tutorial.dto.teacher.TeacherParams;
import ru.dfsystems.spring.tutorial.generated.tables.pojos.Teacher;
import ru.dfsystems.spring.tutorial.mapping.MappingService;

import java.util.List;

@Service
public class TeacherService extends BaseService<TeacherHistoryDto, TeacherListDto, TeacherDto, TeacherParams, Teacher> {
    private final CourseDaoImpl courseDao;
    private final MappingService mappingService;

    @Autowired
    public TeacherService(MappingService mappingService, TeacherListDao teacherListDao, TeacherDaoImpl teacherDao, CourseDaoImpl courseDao) {
        super(mappingService, teacherListDao, teacherDao, TeacherListDto.class, TeacherDto.class, Teacher.class);
        this.courseDao = courseDao;
        this.mappingService = mappingService;
    }

    public List<CourseListDto> getCourses(Integer teacherIdd) {
        return mappingService.mapList(courseDao.getCoursesByTeacherIdd(teacherIdd), CourseListDto.class);
    }
}
