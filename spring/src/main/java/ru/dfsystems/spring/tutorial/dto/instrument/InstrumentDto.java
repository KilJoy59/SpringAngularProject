package ru.dfsystems.spring.tutorial.dto.instrument;

import lombok.Getter;
import lombok.Setter;
import ru.dfsystems.spring.tutorial.dto.BaseDto;

@Getter
@Setter
public class InstrumentDto extends BaseDto<InstrumentHistoryDto> {
    private String name;
    private String number;
}
