package org.JKDW.user.model.DTO;//parse("File Header.java")

public class UserAccountPasswordChangeDTO {

    private Long id;

    private String password;

    private String oldPassword;

    public UserAccountPasswordChangeDTO(){}

    public UserAccountPasswordChangeDTO(Long id, String password) {
        this.id = id;
        this.password = password;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getOldPassword() {
        return oldPassword;
    }

    public void setOldPassword(String oldPassword) {
        this.oldPassword = oldPassword;
    }
}
