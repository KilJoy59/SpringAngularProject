package ru.dfsystems.spring.tutorial.controller;

import org.springframework.web.bind.annotation.*;
import ru.dfsystems.spring.tutorial.dto.*;
import ru.dfsystems.spring.tutorial.generate.BaseJooq;
import ru.dfsystems.spring.tutorial.service.BaseService;

public abstract class BaseController<History extends BaseHistoryDto, List extends BaseListDto, Dto extends BaseDto<History>, Params extends BaseParams, Entity extends BaseJooq> {
    private final BaseService<History, List, Dto, Params, Entity> service;

    public BaseController(BaseService<History, List, Dto, Params, Entity> service) {
        this.service = service;
    }

    @PostMapping("/list")
    public Page<List> getList(@RequestBody PageParams<Params> pageParams) {
        return service.list(pageParams);
    }

    @PostMapping
    public void create(@RequestBody Dto dto) {
        service.create(dto);
    }

    @GetMapping("/{idd}")
    public Dto get(@PathVariable("idd") Integer idd) {
        return service.get(idd);
    }

    @PatchMapping("/{idd}")
    public Dto update(@PathVariable("idd") Integer idd, @RequestBody Dto dto) {
        return service.update(idd, dto);
    }

    @DeleteMapping("/{idd}")
    public void delete(@PathVariable("idd") Integer idd) {
        service.delete(idd);
    }

    @GetMapping("/{idd}/history")
    public java.util.List<History> getHistory(@PathVariable("idd") Integer idd) {
        return service.getHistory(idd);
    }
}
