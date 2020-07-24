package ru.dfsystems.spring.tutorial.dao;

import ru.dfsystems.spring.tutorial.generate.BaseJooq;

import java.util.List;

public interface BaseDao<Entity extends BaseJooq> {
    Entity create(Entity entity);

    Entity getActiveByIdd(Integer idd);

    void update(Entity room);

    List<Entity> getHistory(Integer idd);
}
