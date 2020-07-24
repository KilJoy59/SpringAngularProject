package ru.dfsystems.spring.tutorial.dto.room;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.Setter;
import ru.dfsystems.spring.tutorial.dto.BaseParams;

@Getter
@Setter
@JsonIgnoreProperties(ignoreUnknown = true)
public class RoomParams extends BaseParams {
    private String number;
    private String block;
}
