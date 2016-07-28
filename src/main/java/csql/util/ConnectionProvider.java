package csql.util;


import org.apache.commons.dbcp.BasicDataSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;
import csql.model.ConnectionDetail;
import csql.repository.ConnectionRepository;

import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

public class ConnectionProvider {


    private ConnectionRepository connectionRepository;

    private Map<Integer,JdbcTemplate> connections;

    @Autowired
    public ConnectionProvider(ConnectionRepository connectionRepository) {
        this.connectionRepository = connectionRepository;
        this.init();
    }


    public void init(){

        this.connections = new ConcurrentHashMap<Integer,JdbcTemplate>();

        Collection<ConnectionDetail> connectionDetailCollection =
                connectionRepository.findAll();

        Iterator<ConnectionDetail> iterator = connectionDetailCollection.iterator();

        if(!iterator.hasNext()) return;

        while(iterator.hasNext()) {
            ConnectionDetail con = iterator.next();
            this.connections.put(con.getId(),this.getConnectionPool(con));
        }

    }

    public void addToConnectionPool(int connectionId) {
        ConnectionDetail connectionDetail = connectionRepository.findOne(connectionId);
        if(connectionDetail != null) {
            this.connections.put(connectionId,this.getConnectionPool(connectionDetail));
        }
    }

    public void removeFromConnectionPool(int connectionId) {
        ConnectionDetail connectionDetail = connectionRepository.findOne(connectionId);
        if(connectionDetail != null){
            this.connections.remove(connectionDetail.getId());
        }
    }


    private JdbcTemplate getConnectionPool(ConnectionDetail con) {

        BasicDataSource dbcp = new BasicDataSource();
        dbcp.setDriverClassName(Toolbox.getDriverClassName(con.getUrl()));
        dbcp.setUrl(con.getUrl());
        dbcp.setUsername(con.getUsername());
        dbcp.setPassword(con.getPassword());

        return new JdbcTemplate(dbcp);
    }


    public JdbcTemplate getJdbcTemplate(Integer id) {
        return this.connections.get(id);
    }





}
