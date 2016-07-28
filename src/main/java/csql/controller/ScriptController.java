package csql.controller;


import csql.exception.MetaDataNotFoundException;
import csql.exception.UndefinedObjectException;
import csql.model.datastore.Table;
import csql.model.util.QueryResult;
import csql.service.ScriptService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLException;
import java.util.HashMap;

@Controller
@RequestMapping("/script")
public class ScriptController {

    @Autowired
    private ScriptService scriptService;


    /**
     *
     * @param conId
     * @param object
     * @return
     */
    @RequestMapping(value = "/connection/{conId}/object/{object}/meta", method = RequestMethod.GET)
    @ResponseBody
    public HashMap<String,Object> getObjectMetaData(@PathVariable Integer conId, @PathVariable String object) throws UndefinedObjectException, SQLException {
        return scriptService.getObjectMetaData(conId,object);
    }


    /**
     *
     * @param conId
     * @param script
     * @return
     */
    @RequestMapping(value = "/connection/{conId}/query/meta", method = RequestMethod.POST)
    @ResponseBody
    public Table getQueryMetaData(@PathVariable Integer conId, @RequestBody String script) throws SQLException, MetaDataNotFoundException {
        return scriptService.getQueryMetaData(conId, script);
    }

    /**
     *
     * execute given query
     *
     * @param conId connection id registered in the system.
     * @param query query to execute
     * @return
     */
    @RequestMapping(value = "/connection/{conId}/query/exec", method = RequestMethod.POST)
    @ResponseBody
    public QueryResult executeQuery(@PathVariable Integer conId, @RequestBody String query) throws SQLException, IllegalAccessException, ClassNotFoundException, InstantiationException{
        return scriptService.executeQuery(conId, query);
    }

}
