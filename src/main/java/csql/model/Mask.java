package csql.model;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.hibernate.annotations.NotFound;
import org.hibernate.annotations.NotFoundAction;

import javax.persistence.*;

@Entity
@Table(name="masks",  uniqueConstraints ={
        @UniqueConstraint(columnNames={
                "connection_detail",
                "table_name",
                "column_name"})})
@JsonIgnoreProperties(ignoreUnknown = true)
public class Mask {

    @Id
    @SequenceGenerator(name="mask_seq", sequenceName="mask_seq")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "mask_seq")
    private Integer id;

    @ManyToOne(optional=true)
    @JoinColumn(nullable = true)
    @NotFound(action= NotFoundAction.IGNORE)
    @JsonProperty("connection")
    private ConnectionDetail connectionDetail;

    @Column
    private MaskType maskType;

    @Column
    private String maskTypeDetail;


    @Column(name="column_name")
    private String columnName;

    @Column(name="table_name")
    private String tableName;

    @Column
    private boolean active;

    public Mask(){}

    public Mask(int id, Integer connectionId, MaskType maskType, String maskTypeDetail, String columnName, String tableName, boolean active) {
        this.id = id;
        if(connectionId!=null){
            this.connectionDetail = new ConnectionDetail(connectionId);
        }
        this.maskType = maskType;
        this.maskTypeDetail = maskTypeDetail;
        this.columnName = columnName;
        this.tableName = tableName;
        this.active = active;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getColumnName() {
        return columnName;
    }

    public void setColumnName(String columnName) {
        this.columnName = columnName;
    }

    public String getTableName() {
        return tableName;
    }

    public void setTableName(String tableName) {
        this.tableName = tableName;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }

    public ConnectionDetail getConnectionDetail () {
        return this.connectionDetail;
    }

    public void setConnectionDetail(ConnectionDetail connectionDetail) {
         this.connectionDetail = connectionDetail;
    }

    public String getConnectionName() {
        if(this.getConnectionDetail()!=null){
            return this.getConnectionDetail().getName();
        }
        return null;
    }

    public MaskType getMaskType() {
        return maskType;
    }

    public void setMaskType(MaskType maskType) {
        this.maskType = maskType;
    }

    public String getMaskTypeDetail() {
        return maskTypeDetail;
    }

    public void setMaskTypeDetail(String maskTypeDetail) {
        this.maskTypeDetail = maskTypeDetail;
    }
}
