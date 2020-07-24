package ru.dfsystems.spring.tutorial.dao.lesson;

import org.jooq.DSLContext;
import org.springframework.stereotype.Repository;
import ru.dfsystems.spring.tutorial.generated.tables.daos.LessonDao;
import ru.dfsystems.spring.tutorial.generated.tables.pojos.Instrument;
import ru.dfsystems.spring.tutorial.generated.tables.pojos.Lesson;

import java.util.List;

import static ru.dfsystems.spring.tutorial.generated.tables.Instrument.INSTRUMENT;
import static ru.dfsystems.spring.tutorial.generated.tables.Lesson.LESSON;
import static ru.dfsystems.spring.tutorial.generated.tables.LessonToInstrument.LESSON_TO_INSTRUMENT;

@Repository
public class LessonDaoImpl extends LessonDao {
    final private DSLContext jooq;

    public LessonDaoImpl(DSLContext jooq) {
        super(jooq.configuration());
        this.jooq = jooq;
    }

    public Lesson create(Lesson lesson) {
        if (lesson.getId() == null) {
            lesson.setId(lesson.getId());
        }
        super.insert(lesson);
        return lesson;
    }

    public Lesson getById(Integer id) {
        return jooq.select(LESSON.fields())
                .from(LESSON)
                .where(LESSON.ID.eq(id))
                .fetchOneInto(Lesson.class);
    }

    public List<Lesson> getLessonsByCourseIdd(Integer idd) {
        return jooq.select(LESSON.fields())
                .from(LESSON)
                .where(LESSON.COURSE_IDD.eq(idd))
                .fetchInto(Lesson.class);
    }

    public List<Instrument> getInstrumentsByLessonId(Integer id) {
        return jooq.select(LESSON.fields())
                .from(LESSON)
                .join(LESSON_TO_INSTRUMENT)
                .on(INSTRUMENT.IDD.eq(LESSON_TO_INSTRUMENT.INSTRUMENT_IDD))
                .where(LESSON_TO_INSTRUMENT.LESSON_ID.eq(id))
                .fetchInto(Instrument.class);
    }
}
