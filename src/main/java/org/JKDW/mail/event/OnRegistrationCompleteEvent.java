package org.JKDW.mail.event;

import org.JKDW.user.model.UserAccount;
import org.springframework.context.ApplicationEvent;

import java.util.Locale;

public class OnRegistrationCompleteEvent extends ApplicationEvent {

    private String appUrl;

    private Locale locale;

    private UserAccount userAccount;

    public OnRegistrationCompleteEvent(
            UserAccount userAccount, Locale locale, String appUrl) {
        super(userAccount);

        this.userAccount = userAccount;
        this.locale = locale;
        this.appUrl = appUrl;
    }

    public String getAppUrl() {
        return appUrl;
    }

    public void setAppUrl(String appUrl) {
        this.appUrl = appUrl;
    }

    public UserAccount getUserAccount() {
        return userAccount;
    }

    public void setUserAccount(UserAccount userAccount) {
        this.userAccount = userAccount;
    }

    public Locale getLocale() {
        return locale;
    }

    public void setLocale(Locale locale) {
        this.locale = locale;
    }
}