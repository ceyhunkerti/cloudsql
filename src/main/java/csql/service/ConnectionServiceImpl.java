package csql.service;

import csql.model.ConnectionDetail;
import csql.repository.ConnectionRepository;
import csql.runtime.connection.ConnectionProvider;
import csql.type.DataSourceType;
import csql.util.Toolbox;
import csql.util.security.Crypto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.SQLException;
import java.util.List;

@Service
@Transactional
public class ConnectionServiceImpl implements ConnectionService {


    private ConnectionProvider connectionProvider;
    private ConnectionRepository connectionRepository;

    public ConnectionServiceImpl() {
    }

    @Autowired
    public ConnectionServiceImpl(ConnectionRepository connectionRepository) {
        this.connectionRepository = connectionRepository;
    }

    @Autowired
    public void setConnectionProvider(ConnectionProvider connectionProvider){
        this.connectionProvider =connectionProvider;
    }


    @Override
    public ConnectionDetail findById(int connectionId) {
        return this.connectionRepository.findOne(connectionId);
    }


    @Override
    public ConnectionDetail findByName(String name) {
        ConnectionDetail connectionDetail = this.connectionRepository.findByName(name);
        return connectionDetail;
    }

    @Override
    public List<ConnectionDetail> findAll() {
        return this.connectionRepository.findAll();
    }

    @Override
    public ConnectionDetail update(ConnectionDetail connectionDetail) {
        ConnectionDetail con = this.connectionRepository.findOne(connectionDetail.getId());
        con.setUsername(connectionDetail.getUsername());
        String password = connectionDetail.getPassword();
        if(!password.equalsIgnoreCase(con.getPassword())){
            con.setPassword(Crypto.encrypt(password));
        }
        con.setUrl(connectionDetail.getUrl());
        con.setActive(connectionDetail.isActive());
        ConnectionDetail c = this.connectionRepository.save(con);
        this.connectionProvider.removeConnection(connectionDetail.getId());
        return c;

    }

    @Override
    public ConnectionDetail create(ConnectionDetail connectionDetail) throws IllegalAccessException, ClassNotFoundException, InstantiationException {

        String password = connectionDetail.getPassword();
        connectionDetail.setPassword(Crypto.encrypt(password));

        ConnectionDetail c = this.connectionRepository.save(connectionDetail);
        this.connectionProvider.addConnection(connectionDetail);
        return c;
    }

    @Override
    public void delete(Integer connectionDetailId) {
        this.connectionRepository.delete(connectionDetailId);
        this.connectionProvider.removeConnection(connectionDetailId);
    }

    @Override
    public boolean testConnection(ConnectionDetail connectionDetail) throws SQLException, IllegalAccessException, ClassNotFoundException, InstantiationException {
        return connectionProvider.testConnection(connectionDetail);
    }

    @Override
    public DataSourceType getDataSourceTypeById(int connectionId) {
        String url = connectionRepository.findOne(connectionId).getUrl();
        return Toolbox.getDataSourceType(url);
    }
}
