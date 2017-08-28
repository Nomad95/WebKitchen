package org.JKDW.user.model.rating.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.JKDW.user.model.UserAccount;

@Data
@AllArgsConstructor
public class UserMinimalDTO {

    private Long id;

    private String nickname;

    public static UserMinimalDTO fromUserAccount(UserAccount userAccount){
        return new UserMinimalDTO(userAccount.getId(),userAccount.getNick());
    }
}
