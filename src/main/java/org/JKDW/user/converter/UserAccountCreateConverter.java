package org.JKDW.user.converter;

import org.JKDW.commons.converter.Converter;
import org.JKDW.user.model.DTO.UserAccountCreateDTO;
import org.JKDW.user.model.UserAccount;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class UserAccountCreateConverter implements Converter<UserAccount, UserAccountCreateDTO> {
    @Override
    public UserAccountCreateDTO convertEntityToDto(UserAccount userAccount) {
        UserAccountCreateDTO userAccountCreateDTO = new UserAccountCreateDTO();
        userAccountCreateDTO.setCountry(userAccount.getCountry());
        userAccountCreateDTO.setEmail(userAccount.getEmail());
        userAccountCreateDTO.setNick(userAccount.getNick());
        userAccountCreateDTO.setUsername(userAccount.getUsername());
        return userAccountCreateDTO;
    }

    @Override
    public UserAccount convertDtoToEntity(UserAccountCreateDTO userAccountCreateDTO) {
        UserAccount userAccount = new UserAccount();
        userAccount.setCountry(userAccountCreateDTO.getCountry());
        userAccount.setEmail(userAccountCreateDTO.getCountry());
        userAccount.setNick(userAccountCreateDTO.getCountry());
        userAccount.setPassword(userAccountCreateDTO.getCountry());
        userAccount.setUsername(userAccountCreateDTO.getCountry());
        userAccount.setCreatedAt(new Date());
        return userAccount;
    }
}
