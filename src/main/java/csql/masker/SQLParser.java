package csql.masker;

import model.column.BaseColumn;
import model.column.QueryResultColumn;
import parser.core.QueryParseResult;
import parser.core.QueryParser;

import java.sql.Connection;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;

public class SQLParser {

    private QueryParseResult parseResult;
    private HashMap<String, List<BaseColumn>> columnParentMap;

    public SQLParser(Connection connection, String sql) throws SQLException {
        QueryParser parser = new QueryParser(connection, sql);
        this.parseResult = parser.parse();
        initColumnParentMap();
    }

    private void initColumnParentMap() {
        columnParentMap = new HashMap<>();
        final List<QueryResultColumn> columns = this.parseResult.getResultColumns();

        for(QueryResultColumn column : columns){
            columnParentMap.put(column.getColumnLabel(),column.getParents());
        }

    }

    public HashMap getColumnParentMap(){
        return this.columnParentMap;
    }


}
