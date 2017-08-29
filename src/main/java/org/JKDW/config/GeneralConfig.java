package org.JKDW.config;

import org.JKDW.user.model.Cuisines;
import org.JKDW.user.model.Event;
import org.JKDW.user.model.UserDetails;
import org.JKDW.user.model.comment.RatingComment;
import org.JKDW.user.model.rating.RatingOfTheHost;
import org.JKDW.user.model.UserAccount;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.orm.hibernate4.LocalSessionFactoryBean;

import javax.sql.DataSource;


@Configuration
public class GeneralConfig {


    @Autowired
    DataSource dataSource;

    @Autowired


    @Bean(name = "sessionFactory")
    public LocalSessionFactoryBean hibernate5SessionFactoryBean(){
        LocalSessionFactoryBean localSessionFactoryBean = new LocalSessionFactoryBean();
        localSessionFactoryBean.setDataSource(dataSource);
        localSessionFactoryBean.setAnnotatedClasses(
               UserAccount.class,
                RatingOfTheHost.class,
                Event.class,
                UserDetails.class,
                Cuisines.class,
                RatingComment.class
        );

        return localSessionFactoryBean;
    }
}
