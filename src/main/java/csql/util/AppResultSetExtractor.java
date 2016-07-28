package csql.util;

import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.ResultSetExtractor;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

public class AppResultSetExtractor implements ResultSetExtractor {


    private int start;
    private int limit;

    public AppResultSetExtractor() {
    }



    public AppResultSetExtractor(int start, int limit) {
        this.start = start;
        this.limit = limit;
    }

    /**
     * Implementations must implement this method to process the entire ResultSet.
     *
     * @param rs ResultSet to extract data from. Implementations should
     *           not close this: it will be closed by the calling JdbcTemplate.
     * @return an arbitrary result object, or {@code null} if none
     * (the extractor will typically be stateful in the latter case).
     * @throws java.sql.SQLException        if a SQLException is encountered getting column
     *                             values or navigating (that is, there's no need to catch SQLException)
     * @throws org.springframework.dao.DataAccessException in case of custom exceptions
     */
    @Override
    public Object extractData(ResultSet rs) throws SQLException, DataAccessException {

        int k = 0;
        while(rs.next() && k<this.start ) { k++; rs.next();}

        List<HashMap<String,Object>> data = new ArrayList<>();
        int columnCount = rs.getMetaData().getColumnCount();
        while(rs.next() && data.size() < this.limit) {
            HashMap<String,Object> record = new HashMap<>();
            for(int i = 1; i <= columnCount; i++) {
                record.put(rs.getMetaData().getColumnName(i), rs.getObject(i));
            }
            data.add(record);
        }

        return data;
    }
}
