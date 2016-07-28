package csql.controller;


import csql.model.MailServer;
import csql.service.MailServerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
public class MailServerController {

    @Autowired
    private MailServerService mailServerService;

    public MailServerController(){}


    @RequestMapping(value = "/mail_server", method = RequestMethod.GET)
    @ResponseBody
    public List<MailServer> findAll(){
        return mailServerService.findAll();
    }

    @RequestMapping(value = "/mail_server/{id}", method = RequestMethod.GET)
    @ResponseBody
    public MailServer findById(@PathVariable Integer id){
        return mailServerService.findById(id);
    }

    @RequestMapping(value = "/mail_server", method = RequestMethod.POST)
    @ResponseBody
    public MailServer create(@RequestBody MailServer mailServer){
        return mailServerService.create(mailServer);
    }

    @RequestMapping(value = "/mail_server/{id}", method = RequestMethod.PUT)
    @ResponseBody
    public MailServer update(@PathVariable Integer id, @RequestBody MailServer mailServer){
        return mailServerService.update(mailServer);
    }

    @RequestMapping(value = "/mail_server/{id}", method = RequestMethod.DELETE)
    @ResponseBody
    public void removeById(@PathVariable int id){
        mailServerService.removeById(id);
    }





}
