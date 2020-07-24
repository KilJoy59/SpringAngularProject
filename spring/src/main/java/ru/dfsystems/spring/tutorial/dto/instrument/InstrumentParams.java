package ru.dfsystems.spring.tutorial.dto.instrument;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.Setter;
import ru.dfsystems.spring.tutorial.dto.BaseParams;

@Getter
@Setter
@JsonIgnoreProperties(ignoreUnknown = true)
public class InstrumentParams extends BaseParams {
    private String name;
    private String number;
}
