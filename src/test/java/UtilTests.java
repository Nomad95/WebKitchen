import org.junit.Test;

import java.util.Calendar;
import java.util.Date;

public class UtilTests {

    @Test
    public void dateTest(){
        Date now = new Date();
        Calendar calendar = Calendar.getInstance();
        calendar.set(2017,Calendar.JANUARY,12);
        Date past = calendar.getTime();
        boolean after = now.after(past);
        System.out.println(after);
    }
}
