package springLibrary;


import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.scheduling.annotation.EnableScheduling;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

/**
 * Hello world!
 *
 */

@SpringBootApplication
@EnableConfigurationProperties
@EnableScheduling
public class App
{


    public static void main(String[] args ) throws IOException
    {

      SpringApplication.run(App.class, args);

      System.out.println("EXIT AND CLOSE");


    }
}
