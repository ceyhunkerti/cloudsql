package csql.service;

import csql.exception.MetaDataNotFoundException;
import csql.exception.UndefinedObjectException;
import csql.model.datastore.Table;
import csql.model.util.QueryResult;
import csql.runtime.connection.ConnectionProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.SQLException;
import java.util.HashMap;

@Service
public class ScriptServiceImpl implements ScriptService {

    @Autowired
    private ConnectionProvider connectionProvider;

    @Autowired
    private ConnectionService connectionService;

    @Autowired
    private DataService dataService;


    @Override
    public Table getQueryMetaData(int connectionId, String script) throws SQLException, MetaDataNotFoundException {
        return dataService.getQueryMetaData(connectionId,script);
    }


    @Override
    public QueryResult executeQuery(int connectionId, String query) throws SQLException, InstantiationException, IllegalAccessException, ClassNotFoundException{
        return dataService.getQueryResult(connectionId, query);
    }

    @Override
    public HashMap<String, Object> getObjectMetaData(int connectionId, String object) throws UndefinedObjectException, SQLException {
        return dataService.getObjectMetaData(connectionId,object);
    }


}
