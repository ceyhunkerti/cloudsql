package csql.runtime.connection;

import csql.model.ConnectionDetail;
import csql.service.ConnectionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.sql.Connection;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.Map;

@Component
public class ConnectionProvider {


    private ConnectionService connectionService;

    private Map<Integer, ConnectionPool> connectionPoolMap;


    public ConnectionProvider() {
        connectionPoolMap = new HashMap<>();
    }

    @Autowired
    public void setConnectionService(ConnectionService connectionService){
        this.connectionService = connectionService;
    }


    public Connection getConnection(int connectionDetailId) throws SQLException, IllegalAccessException, ClassNotFoundException, InstantiationException {
        if(this.connectionPoolMap.containsKey(connectionDetailId)){
            return connectionPoolMap.get(connectionDetailId).getConnection();
        } else {
            ConnectionPool pool = addConnectionPool(connectionDetailId);
            connectionPoolMap.put(connectionDetailId,pool);
            return pool.getConnection();
        }
    }

    public ConnectionPool addConnectionPool(int connectionId) throws IllegalAccessException, InstantiationException, ClassNotFoundException {
        ConnectionDetail con = connectionService.findById(connectionId);
        ConnectionPool pool = new ConnectionPool(con);
        connectionPoolMap.put(connectionId,pool);
        return pool;
    }

    public ConnectionPool addConnection(ConnectionDetail connectionDetail) throws IllegalAccessException, InstantiationException, ClassNotFoundException {

        if(this.connectionPoolMap.containsKey(connectionDetail.getId())){
            this.connectionPoolMap.remove(connectionDetail.getId());
        }

        ConnectionPool connectionPool = new ConnectionPool(connectionDetail);
        this.connectionPoolMap.put(connectionDetail.getId(),connectionPool);

        return connectionPool;
    }


    public void removeConnection(int connectionDetailId){
        if(this.connectionPoolMap.containsKey(connectionDetailId)){
            this.connectionPoolMap.remove(connectionDetailId);
        }
    }

    public boolean testConnection(ConnectionDetail connectionDetail) throws SQLException, IllegalAccessException, InstantiationException, ClassNotFoundException {
        Connection connection = null;

        if(this.connectionPoolMap.containsKey(connectionDetail.getId())){
            connection = connectionPoolMap.get(connectionDetail.getId()).getConnection();
            connection.close();
            return true;
        }
        ConnectionPool pool = new ConnectionPool(connectionDetail);
        connection = pool.getConnection();
        connection.close();
        return true;


    }
}
