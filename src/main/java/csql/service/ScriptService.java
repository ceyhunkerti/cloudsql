package csql.service;

import csql.model.datastore.Table;
import csql.model.util.AppResponse;
import csql.model.util.QueryResult;

import java.sql.SQLException;
import java.util.HashMap;


public interface ScriptService {

    public Table getQueryMetaData(int connectionId, String script) throws SQLException;
    public QueryResult executeQuery(int connectionId, String query) throws SQLException, InstantiationException, IllegalAccessException, ClassNotFoundException;

    public HashMap<String,Object> getObjectMetaData(int connectionId, String object) throws SQLException;
}
