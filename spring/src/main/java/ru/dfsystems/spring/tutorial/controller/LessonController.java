package ru.dfsystems.spring.tutorial.controller;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;
import ru.dfsystems.spring.tutorial.dto.Page;
import ru.dfsystems.spring.tutorial.dto.PageParams;
import ru.dfsystems.spring.tutorial.dto.lesson.LessonDto;
import ru.dfsystems.spring.tutorial.dto.lesson.LessonListDto;
import ru.dfsystems.spring.tutorial.dto.lesson.LessonParams;
import ru.dfsystems.spring.tutorial.service.LessonService;

@RestController
@RequestMapping(value = "/lesson", produces = "application/json; charset=UTF-8")
@AllArgsConstructor
public class LessonController {

    private final LessonService lessonService;

    @PostMapping("/list")
    //@Operation(summary = "Список уроков", description = "", tags = {"lesson"})
    public Page<LessonListDto> getList(@RequestBody PageParams<LessonParams> pageParams) {
        return lessonService.getLessonsByParams(pageParams);
    }

    @PostMapping
    //@Operation(summary = "Добавить урок", description = "", tags = {"lesson"})
    public void create(@RequestBody LessonDto lessonDto) {
        lessonService.create(lessonDto);
    }

    @GetMapping("/{id}")
    // @Operation(summary = "информация об уроке", description = "", tags = {"lesson"})
    public LessonDto get(@PathVariable("id") Integer id) {
        return lessonService.get(id);
    }

    @PatchMapping("/{id}")
    //@Operation(summary = "Обновить информацию об уроке", description = "", tags = {"lesson"})
    public LessonDto update(@PathVariable("id") Integer id, @RequestBody LessonDto lessonDto) {
        return lessonService.update(id, lessonDto);
    }

    @PutMapping("/{id}/instrument")
    // @Operation(summary = "Добавить инструмент для урока", description = "", tags = {"lesson"})
    public void putInstrument(@PathVariable("id") Integer id, @RequestBody Integer instrumentIdd) {
        lessonService.putInstrument(id, instrumentIdd);
    }

    @DeleteMapping("/{idd}")
    // @Operation(summary = "Удалить курс", description = "", tags = {"course"})
    public void delete(@PathVariable("idd") Integer idd) {
        lessonService.delete(idd);
    }
}
