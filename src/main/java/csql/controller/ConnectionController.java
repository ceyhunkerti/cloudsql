package csql.controller;


import csql.model.ConnectionDetail;
import csql.service.ConnectionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.jpa.JpaSystemException;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLException;
import java.util.Collection;

@Controller
public class ConnectionController {

    @Autowired
    private ConnectionService connectionService;

    @RequestMapping(value = "/connection", method = RequestMethod.GET)
    @ResponseBody
    public Collection<ConnectionDetail> getConnections() {
        return connectionService.findAll();
    }

    @RequestMapping(value = "/connection", method = RequestMethod.POST)
    @ResponseBody
    public ConnectionDetail saveConnection(@RequestBody ConnectionDetail connectionDetail) throws IllegalAccessException, InstantiationException, ClassNotFoundException {
        return connectionService.create(connectionDetail);
    }

    @RequestMapping(value = "/connection/{id}", method = RequestMethod.DELETE)
    @ResponseBody
    public void deleteConnection(@PathVariable Integer id) throws RuntimeException{
        try {
            connectionService.delete(id);
        }catch (JpaSystemException e){
            throw new RuntimeException("Connection exists in masks! Remove masks first.");
        }

    }

    @RequestMapping(value = "/connection/{id}", method = RequestMethod.PUT)
    @ResponseBody
    public ConnectionDetail updateConnection(@RequestBody ConnectionDetail connectionDetail, @PathVariable("id") String id) {
        return connectionService.update(connectionDetail);
    }


    @RequestMapping(value = "/connection/test", method = RequestMethod.POST)
    @ResponseBody
    public Boolean testConnection(@RequestBody ConnectionDetail connectionDetail) throws SQLException, IllegalAccessException, InstantiationException, ClassNotFoundException {
        return connectionService.testConnection(connectionDetail);
    }


}
