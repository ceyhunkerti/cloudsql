package csql.service;

import csql.model.ConnectionDetail;
import csql.type.DataSourceType;

import javax.persistence.EntityNotFoundException;
import java.sql.SQLException;
import java.util.List;

public interface ConnectionService {

    ConnectionDetail findById(int connectionId);

    public ConnectionDetail findByName(String connectionName) throws EntityNotFoundException;

    public List<ConnectionDetail> findAll();

    public ConnectionDetail update(ConnectionDetail connectionDetail);

    public ConnectionDetail create(ConnectionDetail connectionDetail) throws IllegalAccessException, ClassNotFoundException, InstantiationException;

    public void delete(Integer id);

    public boolean testConnection(ConnectionDetail connectionDetail) throws SQLException, IllegalAccessException, ClassNotFoundException, InstantiationException;

    public DataSourceType getDataSourceTypeById(int connectionId);

}
