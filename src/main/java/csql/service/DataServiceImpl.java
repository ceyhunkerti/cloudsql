package csql.service;

import csql.exception.MetaDataNotFoundException;
import csql.exception.UndefinedObjectException;
import csql.masker.Masker;
import csql.model.Mask;
import csql.model.datastore.Column;
import csql.model.datastore.ObjectType;
import csql.model.datastore.Table;
import csql.model.util.QueryResult;
import csql.runtime.connection.ConnectionProvider;
import org.joda.time.DateTime;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.*;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@Transactional
public class DataServiceImpl implements DataService {


    @Value("${app.resultSet.maxRecordCount}")
    private Integer maxRecordCount;

    @Autowired
    private ConnectionService connectionService;

    @Autowired
    private MaskService maskService;

    @Autowired
    private ConnectionProvider connectionProvider;


    private Masker getMasker(Connection connection, Integer connectionId, String query) throws SQLException{
        List<Mask> masks = maskService.findMasksByConnectionId(connectionId);
        return new Masker(connection,query,masks);
    }

    @Override
    public QueryResult getQueryResult(int connectionId, String query) throws ClassNotFoundException, SQLException, InstantiationException, IllegalAccessException {

        if(this.maxRecordCount == null){
            maxRecordCount = 200;
        }

        Map<String, String> record;
        List<Map<String, String>> data;

        Connection connection = connectionProvider.getConnection(connectionId);
        QueryResult result = new QueryResult(query);
        result.setStartTime(DateTime.now().toDate());

        try {
            ResultSet rs;
            PreparedStatement stmt = connection.prepareStatement(query);
            rs = stmt.executeQuery();
            data = new ArrayList<>();
            List<Column>  columns = this.getColumns(rs);
            Masker masker = getMasker(connection, connectionId,query);
            for(Column column : columns ){
                column.setMasked(masker.isMasked(column.getName()));
            }
            result.setColumns(columns);


            while(rs.next()) {
                record = new HashMap<>();
                for(Column column : columns ){
                    String value = masker.mask(column.getName(),rs.getString(column.getName()));
                    record.put(column.getName(),value);
                }
                data.add(record);
                if(data.size() > this.maxRecordCount) {
                    break;
                }
            }
            connection.close();
            result.setData(data);
            result.setRecordCount(data.size());
            result.setEndTime(DateTime.now().toDate());
            return result;
        }catch (Exception e){
            connection.close();
            throw e;
        }

    }

    private List<Column> getColumns(ResultSet rs) throws SQLException {
        List<Column> columns = new ArrayList<>();
        ResultSetMetaData md = rs.getMetaData();
        int columnCount = md.getColumnCount();

        for(int i =1; i<= columnCount; i++) {
            Column column = new Column();
            column.setName(md.getColumnLabel(i));
            column.setDataType(md.getColumnTypeName(i));
            column.setSize(md.getColumnDisplaySize(i));
            columns.add(column);
        }

        return columns;
    }


    /**
     * Works for only tables
     * todo implement other objects
     *
     * @param connectionId
     * @param object
     * @return
     * @throws ClassNotFoundException
     * @throws SQLException
     * @throws InstantiationException
     * @throws IllegalAccessException
     */
    @Override
    public HashMap<String, Object> getObjectMetaData(int connectionId, String object) throws UndefinedObjectException, SQLException {

        Connection connection = null;
        String sql = "select * from " + object;

        Table table = null;
        try {
            table = getQueryMetaData(connectionId,sql);
        } catch (SQLException | MetaDataNotFoundException e) {
            e.printStackTrace();
            throw new UndefinedObjectException(object);
        }

        table.setName(object);

        HashMap<String,Object> result = new HashMap<>();

        result.put("objectType", ObjectType.TABLE);
        result.put("meta",table);

        return result;
    }


    @Override
    public Table getQueryMetaData(int connectionId, String query) throws MetaDataNotFoundException, SQLException {
        Connection connection = null;
        Table table = null;
        try {
            connection = connectionProvider.getConnection(connectionId);
            PreparedStatement stmt = connection.prepareStatement(query);
            ResultSet rs = stmt.executeQuery();
            List<Column> columns = getColumns(rs);
            table = new Table(query);
            table.setColumns(columns);
            connection.close();
        } catch (SQLException | IllegalAccessException | ClassNotFoundException | InstantiationException e) {
            e.printStackTrace();
            if(connection!=null){
                connection.close();
            }
            throw new MetaDataNotFoundException();
        }

        return table;
    }


}
