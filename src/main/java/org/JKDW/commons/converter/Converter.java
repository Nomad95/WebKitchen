package org.JKDW.commons.converter;

public interface Converter<ENTITY, DTO> {
    DTO convertEntityToDto(ENTITY entity);

    ENTITY convertDtoToEntity(DTO dto);
}
