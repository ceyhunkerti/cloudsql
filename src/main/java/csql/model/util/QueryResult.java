package csql.model.util;

import csql.model.datastore.Column;

import java.util.Date;
import java.util.List;
import java.util.Map;

public class QueryResult {

    private String query;
    private Date startTime;
    private Date endTime;
    private Integer recordCount;
    private List<Column> columns;
    private List<Object> rawData;
    private List<Map<String, String>> data;
    private boolean limitedSet;


    public QueryResult(){
    }

    public QueryResult(String query){
        this.query = query;
    }


    public String getQuery() {
        return query;
    }

    public void setQuery(String query) {
        this.query = query;
    }

    public List<Column> getColumns() {
        return columns;
    }

    public void setColumns(List<Column> columns) {
        this.columns = columns;
    }

    public List<Map<String, String>> getData() {
        return data;
    }

    public void setData(List<Map<String, String>> dataWithMetadata) {
        this.data = dataWithMetadata;
    }

    public Integer getRecordCount() {
        return recordCount;
    }

    public void setRecordCount(Integer recordCount) {
        this.recordCount = recordCount;
    }

    public Date getEndTime() {
        return endTime;
    }

    public void setEndTime(Date endTime) {
        this.endTime = endTime;
    }

    public Date getStartTime() {
        return startTime;
    }

    public void setStartTime(Date startTime) {
        this.startTime = startTime;
    }

    public List<Object> getRawData() {
        return rawData;
    }

    public void setRawData(List<Object> rawData) {
        this.rawData = rawData;
    }

    public boolean isLimitedSet() {
        return limitedSet;
    }

    public void setLimitedSet(boolean limitedSet) {
        this.limitedSet = limitedSet;
    }
}
