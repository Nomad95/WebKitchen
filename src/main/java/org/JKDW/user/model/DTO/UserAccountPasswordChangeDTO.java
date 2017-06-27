package org.JKDW.user.model.DTO;

public class UserAccountPasswordChangeDTO {

    private Long id;

    private String newPassword;

    public UserAccountPasswordChangeDTO(){}

    public UserAccountPasswordChangeDTO(Long id, String newPassword) {
        this.id = id;
        this.newPassword = newPassword;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNewPassword() {
        return newPassword;
    }

    public void setNewPassword(String newPassword) {
        this.newPassword = newPassword;
    }

}
