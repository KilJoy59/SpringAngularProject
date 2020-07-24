package ru.dfsystems.spring.tutorial.service;

import lombok.AllArgsConstructor;
import lombok.var;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.dfsystems.spring.tutorial.dao.instrument.InstrumentDaoImpl;
import ru.dfsystems.spring.tutorial.dao.lesson.LessonDaoImpl;
import ru.dfsystems.spring.tutorial.dao.lesson.LessonListDao;
import ru.dfsystems.spring.tutorial.dto.Page;
import ru.dfsystems.spring.tutorial.dto.PageParams;
import ru.dfsystems.spring.tutorial.dto.instrument.InstrumentListDto;
import ru.dfsystems.spring.tutorial.dto.lesson.LessonCreateDto;
import ru.dfsystems.spring.tutorial.dto.lesson.LessonDto;
import ru.dfsystems.spring.tutorial.dto.lesson.LessonListDto;
import ru.dfsystems.spring.tutorial.dto.lesson.LessonParams;
import ru.dfsystems.spring.tutorial.generated.tables.daos.LessonToInstrumentDao;
import ru.dfsystems.spring.tutorial.generated.tables.pojos.Lesson;
import ru.dfsystems.spring.tutorial.generated.tables.pojos.LessonToInstrument;
import ru.dfsystems.spring.tutorial.mapping.MappingService;

import java.util.List;

@Service
@AllArgsConstructor
public class LessonService {

    private final InstrumentDaoImpl instrumentDao;
    private final MappingService mappingService;
    private final LessonToInstrumentDao lessonToInstrumentDao;
    private final LessonListDao lessonListDao;
    private final LessonDaoImpl lessonDao;

    public List<InstrumentListDto> getInstruments(Integer lessonIdd) {
        return mappingService.mapList(instrumentDao.getInstrumentsByLessonIdd(lessonIdd), InstrumentListDto.class);
    }

    @Transactional
    public void putInstrument(Integer idd, Integer instrumentIdd) {
        var link = new LessonToInstrument();
        link.setLessonIdd(idd);
        link.setInstrumentIdd(instrumentIdd);
        lessonToInstrumentDao.insert(link);
    }

    public Page<LessonListDto> getLessonsByParams(PageParams<LessonParams> pageParams) {
        Page<Lesson> page = lessonListDao.list(pageParams);
        List<LessonListDto> list = mappingService.mapList(page.getList(), LessonListDto.class);
        return new Page<>(list, page.getTotalCount());
    }

    @Transactional
    public LessonCreateDto create(LessonDto lessonDto) {
        return mappingService.map(lessonDao.create(mappingService.map(lessonDto, Lesson.class)), LessonCreateDto.class);
    }

    public LessonDto get(Integer id) {
        return mappingService.map(lessonDao.getById(id), LessonDto.class);
    }

    @Transactional
    public LessonDto update(Integer id, LessonDto lessonDto) {
        Lesson lesson = lessonDao.getById(id);
        if (lesson == null) {
            throw new RuntimeException("");
        }
        Lesson newLesson = mappingService.map(lessonDto, Lesson.class);
        lesson.setName(newLesson.getName());
        lesson.setCourseIdd(newLesson.getCourseIdd());
        lesson.setRoomIdd(newLesson.getRoomIdd());
        lesson.setDescription(newLesson.getDescription());
        lesson.setLessonDateStart(newLesson.getLessonDateStart());
        lesson.setLessonDateEnd(newLesson.getLessonDateEnd());
        lessonDao.update(lesson);
        return mappingService.map(lesson, LessonDto.class);
    }

    public Boolean delete(Integer id) {
        Lesson lesson = lessonDao.getById(id);
        if (lesson != null) {
            lessonDao.delete(lesson);
            return true;
        }
        return false;
    }
}
