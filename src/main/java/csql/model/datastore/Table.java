package csql.model.datastore;

import java.util.List;

public class Table {

    private String name;
    private String owner;
    private String script;
    private List<Column> columns;

    public Table() {
    }

    public Table(String name){
        this.name = name;
    }

    public Table(String owner, String name){
        this.owner= owner;
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getOwner() {
        return owner;
    }

    public void setOwner(String owner) {
        this.owner = owner;
    }

    public String getScript() {
        return script;
    }

    public void setScript(String script) {
        this.script = script;
    }

    public List<Column> getColumns() {
        return columns;
    }

    public void setColumns(List<Column> columns) {
        this.columns = columns;
    }
}
