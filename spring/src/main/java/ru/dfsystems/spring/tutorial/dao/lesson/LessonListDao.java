package ru.dfsystems.spring.tutorial.dao.lesson;

import lombok.AllArgsConstructor;
import lombok.val;
import org.jooq.Condition;
import org.jooq.DSLContext;
import org.jooq.SelectSeekStepN;
import org.jooq.SortField;
import org.springframework.stereotype.Repository;
import ru.dfsystems.spring.tutorial.dto.Page;
import ru.dfsystems.spring.tutorial.dto.PageParams;
import ru.dfsystems.spring.tutorial.dto.lesson.LessonParams;
import ru.dfsystems.spring.tutorial.generated.tables.pojos.Lesson;
import ru.dfsystems.spring.tutorial.generated.tables.records.LessonRecord;

import java.util.ArrayList;
import java.util.List;

import static ru.dfsystems.spring.tutorial.generated.tables.Lesson.LESSON;

@Repository
@AllArgsConstructor
public class LessonListDao {
    private final DSLContext jooq;

    public Page<Lesson> list(PageParams<LessonParams> pageParams) {
        val params = pageParams.getParams() == null ? new LessonParams() : pageParams.getParams();
        val listQuery = getLessonSelect(params);

        val count = jooq.selectCount()
                .from(listQuery)
                .fetchOne(0, Long.class);

        List<Lesson> list = listQuery.offset(pageParams.getStart())
                .limit(pageParams.getPage())
                .fetchInto(Lesson.class);

        return new Page<>(list, count);
    }

    private SelectSeekStepN<LessonRecord> getLessonSelect(LessonParams params) {
        Condition condition = null;
        if (params.getName() != null) {
            condition = LESSON.NAME.like(params.getName());
        }
        if (params.getLessonDateStartBefore() != null && params.getLessonDateStartAfter() != null) {
            condition = LESSON.LESSON_DATE_START.between(params.getLessonDateStartBefore(), params.getLessonDateStartAfter());
        }
        if (params.getLessonDateStartBefore() != null && params.getLessonDateStartAfter() == null) {
            condition = LESSON.LESSON_DATE_START.greaterThan(params.getLessonDateStartBefore());
        }
        if (params.getLessonDateStartBefore() == null && params.getLessonDateStartAfter() != null) {
            condition = LESSON.LESSON_DATE_START.lessThan(params.getLessonDateStartAfter());
        }
        if (params.getLessonDateEndBefore() != null && params.getLessonDateEndAfter() != null) {
            condition = LESSON.LESSON_DATE_END.between(params.getLessonDateEndBefore(), params.getLessonDateEndAfter());
        }
        if (params.getLessonDateEndBefore() != null && params.getLessonDateEndAfter() == null) {
            condition = LESSON.LESSON_DATE_END.greaterThan(params.getLessonDateEndBefore());
        }
        if (params.getLessonDateEndBefore() == null && params.getLessonDateEndAfter() != null) {
            condition = LESSON.LESSON_DATE_END.lessThan(params.getLessonDateEndAfter());
        }

        val sort = getOrderBy(params.getOrderBy(), params.getOrderDir());

        return jooq.selectFrom(LESSON)
                .where(condition)
                .orderBy(sort);
    }

    private SortField<?>[] getOrderBy(String orderBy, String orderDir) {
        val asc = orderDir == null || orderDir.equalsIgnoreCase("asc");

        if (orderBy == null) {
            return asc
                    ? new SortField[]{LESSON.ID.asc()}
                    : new SortField[]{LESSON.ID.desc()};
        }

        val orderArray = orderBy.split(",");

        List<SortField> listSortBy = new ArrayList<>();
        for (val order : orderArray) {
            if (order.equalsIgnoreCase("id")) {
                listSortBy.add(asc ? LESSON.ID.asc() : LESSON.ID.desc());
            }
            if (order.equalsIgnoreCase("name")) {
                listSortBy.add(asc ? LESSON.NAME.asc() : LESSON.NAME.desc());
            }
            if (order.equalsIgnoreCase("lessonDateStart")) {
                listSortBy.add(asc ? LESSON.LESSON_DATE_START.asc() : LESSON.LESSON_DATE_START.desc());
            }
            if (order.equalsIgnoreCase("lessonDateEnd")) {
                listSortBy.add(asc ? LESSON.LESSON_DATE_END.asc() : LESSON.LESSON_DATE_END.desc());
            }
        }

        return listSortBy.toArray(new SortField[0]);
    }

}
