package csql.controller;

import csql.model.User;
import csql.service.FileSystemService;
import csql.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.Collection;

@Controller
public class UserController {


    @Autowired
    private UserService userService;

    @Autowired
    private csql.security.CSQLUserContext CSQLUserContext;

    @Autowired
    private FileSystemService fileSystemService;

    @ResponseBody
    @RequestMapping(value = "/users", method = RequestMethod.GET)
    public Collection<User> getAll() {
        return userService.getAll();
    }

    @ResponseBody
    @RequestMapping(value = "/users/me", method = RequestMethod.GET)
    public User getMe(){
        User me = CSQLUserContext.getCurrentUser();
        return userService.findByUsername(me.getUsername());
    }


    @RequestMapping(value = "/users/not_me", method = RequestMethod.GET)
    @ResponseBody
    public Collection<User> getAllNotMe() {
        Collection<User> users = userService.getAll();
        User me = CSQLUserContext.getCurrentUser();
        users.remove(me);
        return users;
    }


    @RequestMapping(value = "/users", method = RequestMethod.POST)
    @ResponseBody
    public User createUser(@RequestBody User user) throws IOException {

        User u = userService.create(user);
        if(u != null) {
            fileSystemService.createUserRoot(u.getUsername());
        }
        return u;
    }


    @RequestMapping(value = "/users/{username}", method = RequestMethod.PUT)
    @ResponseBody
    public User updateUser(@RequestBody User user, @PathVariable String username) {
        return userService.update(user);
    }

    @RequestMapping(value = "/users/options/me", method = RequestMethod.PUT)
    @ResponseBody
    public User updateMyOptions(@RequestBody String options) {
        User me = CSQLUserContext.getCurrentUser();
        return userService.updateOptions(me.getUsername(),options);
    }

    @RequestMapping(value = "/users/options/me", method = RequestMethod.GET)
    @ResponseBody
    public String getMyOptions() {
        User me = CSQLUserContext.getCurrentUser();
        return userService.findByUsername(me.getUsername()).getOptions();
    }


    @RequestMapping(value = "/users/me/changePassword/{password}/{newPassword}", method = RequestMethod.PUT)
    @ResponseBody
    public void changePassword(@PathVariable String password,@PathVariable String newPassword) throws RuntimeException {
        userService.changePassword(CSQLUserContext.getCurrentUser().getUsername(),password, newPassword);
    }


    @RequestMapping(value = "/users/{username}", method = RequestMethod.DELETE)
    @ResponseBody
    public void deleteUser(@PathVariable String username) throws IOException {
        userService.delete(username);
        fileSystemService.deleteUserFile(username);
    }

}
