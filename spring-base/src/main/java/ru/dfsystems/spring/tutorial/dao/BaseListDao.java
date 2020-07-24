package ru.dfsystems.spring.tutorial.dao;

import ru.dfsystems.spring.tutorial.dto.BaseParams;
import ru.dfsystems.spring.tutorial.dto.Page;
import ru.dfsystems.spring.tutorial.dto.PageParams;
import ru.dfsystems.spring.tutorial.generate.BaseJooq;

public interface BaseListDao<Entity extends BaseJooq, Params extends BaseParams> {
    Page<Entity> list(PageParams<Params> pageParams);
}
