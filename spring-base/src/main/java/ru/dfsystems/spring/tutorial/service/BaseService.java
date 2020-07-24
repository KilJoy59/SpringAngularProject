package ru.dfsystems.spring.tutorial.service;

import ru.dfsystems.spring.tutorial.dao.BaseDao;
import ru.dfsystems.spring.tutorial.dao.BaseListDao;
import ru.dfsystems.spring.tutorial.dto.*;
import ru.dfsystems.spring.tutorial.generate.BaseJooq;
import ru.dfsystems.spring.tutorial.mapping.BaseMapping;

import java.time.LocalDateTime;

public abstract class BaseService<History extends BaseHistoryDto, List extends BaseListDto, Dto extends BaseDto<History>, Params extends BaseParams, Entity extends BaseJooq> {

    private final BaseMapping mappingService;
    private final BaseListDao<Entity, Params> listDao;
    private final BaseDao<Entity> baseDao;
    private final Class<List> listClass;
    private final Class<Dto> dtoClass;
    private final Class<Entity> entityClass;

    public BaseService(BaseMapping mappingService,
                       BaseListDao<Entity, Params> listDao,
                       BaseDao<Entity> baseDao,
                       Class<List> listClass,
                       Class<Dto> dtoClass,
                       Class<Entity> entityClass) {
        this.mappingService = mappingService;
        this.listDao = listDao;
        this.baseDao = baseDao;
        this.listClass = listClass;
        this.dtoClass = dtoClass;
        this.entityClass = entityClass;
    }

    public Page<List> list(PageParams<Params> pageParams) {
        Page<Entity> page = listDao.list(pageParams);
        java.util.List<List> list = mappingService.mapList(page.getList(), listClass);
        return new Page<>(list, page.getTotalCount());
    }

    public Dto create(Dto dto) {
        return mappingService.map(baseDao.create(mappingService.map(dto, entityClass)), dtoClass);
    }

    public Dto get(Integer idd) {
        return mappingService.map(baseDao.getActiveByIdd(idd), dtoClass);
    }

    public Dto update(Integer idd, Dto dto) {
        Entity entity = baseDao.getActiveByIdd(idd);
        if (entity == null) {
            throw new RuntimeException("");
        }
        entity.setDeleteDate(LocalDateTime.now());
        baseDao.update(entity);

        Entity newEntity = mappingService.map(dto, entityClass);
        newEntity.setIdd(entity.getIdd());
        baseDao.create(newEntity);
        return mappingService.map(newEntity, dtoClass);
    }

    public void delete(Integer idd) {
        Entity entity = baseDao.getActiveByIdd(idd);
        entity.setDeleteDate(LocalDateTime.now());
        baseDao.update(entity);
    }

    public java.util.List<History> getHistory(Integer idd) {
        Entity entity = baseDao.getActiveByIdd(idd);
        if (entity == null) {
            throw new RuntimeException("Не найден объект");
        }
        Dto dto = mappingService.map(entity, dtoClass);
        return dto.getHistory();
    }
}
