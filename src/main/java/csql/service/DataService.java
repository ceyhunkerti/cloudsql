package csql.service;

import csql.exception.MetaDataNotFoundException;
import csql.exception.UndefinedObjectException;
import csql.model.datastore.Table;
import csql.model.util.QueryResult;

import java.sql.SQLException;
import java.util.HashMap;

public interface DataService {

    public QueryResult getQueryResult(int connectionId, String query) throws ClassNotFoundException, SQLException, InstantiationException, IllegalAccessException;


    public HashMap<String,Object> getObjectMetaData(int connectionId, String object) throws UndefinedObjectException, SQLException;

    public Table getQueryMetaData(int connectionId, String script) throws SQLException, MetaDataNotFoundException;
}
