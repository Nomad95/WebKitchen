package org.JKDW.security.model;

public class JavaWebTokenBody {

    private String tokenValue;

    public JavaWebTokenBody() {
    }

    public JavaWebTokenBody(String tokenValue) {
        this.tokenValue = tokenValue;
    }

    public String getTokenValue() {
        return tokenValue;
    }

    public void setTokenValue(String tokenValue) {
        this.tokenValue = tokenValue;
    }
}
