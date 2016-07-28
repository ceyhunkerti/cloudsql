package csql.runtime.connection;

import csql.model.ConnectionDetail;
import csql.util.Toolbox;
import org.apache.commons.dbcp.ConnectionFactory;
import org.apache.commons.dbcp.DriverManagerConnectionFactory;
import org.apache.commons.dbcp.PoolableConnectionFactory;
import org.apache.commons.dbcp.PoolingDataSource;
import org.apache.commons.pool.impl.GenericObjectPool;

import java.sql.Connection;
import java.sql.SQLException;

public class ConnectionPool {

    private final ConnectionDetail connectionDetail;
    private GenericObjectPool connectionPool = null;
    private PoolableConnectionFactory poolableConnectionFactory;
    private PoolingDataSource poolingDataSource;

    public ConnectionPool(ConnectionDetail connectionDetail) throws ClassNotFoundException, IllegalAccessException, InstantiationException {

        this.connectionDetail = connectionDetail;

        // Load JDBC Driver class.
        Class.forName(Toolbox.getDriverClassName(connectionDetail.getUrl())).newInstance();


        // Creates an instance of GenericObjectPool that holds our
        // pool of connections object.
        connectionPool = new GenericObjectPool();

        // Creates an instance of GenericObjectPool that holds our
        // pool of connections object.
        connectionPool = new GenericObjectPool();
        connectionPool.setMaxActive(20);


        // Creates a connection factory object which will be use by
        // the pool to create the connection object. We passes the
        // JDBC url info, username and password.
        ConnectionFactory connectionFactory = new DriverManagerConnectionFactory(
                connectionDetail.getUrl(),
                connectionDetail.getUsername(),
                connectionDetail.getPasswordDecrypted());


        // Creates a PoolableConnectionFactory that will wraps the
        // connection object created by the ConnectionFactory to add
        // object pooling functionality.
        poolableConnectionFactory =
                new PoolableConnectionFactory(connectionFactory, connectionPool,
                        null, null, false, true);

        poolingDataSource =
                new PoolingDataSource(poolableConnectionFactory.getPool());

    }

    public ConnectionDetail getConnectionDetail(){
        return this.connectionDetail;
    }

    public Connection getConnection() throws SQLException {
        return this.poolingDataSource.getConnection();


    }

}
