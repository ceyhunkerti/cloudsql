package csql.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;


@Controller
public class HomeController {

    public HomeController() {
    }

    @RequestMapping(value = "/home", method = RequestMethod.GET)
    public String home() {

        return "index";
    }

    @RequestMapping(value = "/login", method = RequestMethod.GET)
    public String login() {
        return "login";
    }

    @RequestMapping(value = "/errorTest", method = RequestMethod.GET)
    public String error() {
        throw new UnsupportedOperationException("Test Error Message");
    }
}
