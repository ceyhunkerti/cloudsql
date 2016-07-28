package csql.masker;

import csql.model.Mask;
import csql.model.MaskType;
import csql.util.security.Crypto;
import model.column.BaseColumn;
import org.springframework.util.StringUtils;

import java.sql.Connection;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class Masker {

    private SQLParser  sqlParser;
    private List<Mask> masks;
    private Map<String,Mask> maskMap;
    private static final String ALL_STARS = "*******";

    public Masker(Connection connection, String sql, List<Mask> masks) throws SQLException {
        sqlParser = new SQLParser(connection, sql);
        this.masks = masks;
        initMaskMap();
    }

    public String mask(String columnLabel, String columnValue){

        Mask mask = getMask(columnLabel);
        if(mask == null){
            return columnValue;
        }

        if(mask.getMaskType()== MaskType.ALL_STARS){
            return ALL_STARS;
        }

        if(mask.getMaskType()== MaskType.CRYPTIC) {
            return Crypto.md5Hash(columnValue);
        }

        Integer charCount = 0;
        if(mask.getMaskType()== MaskType.STARS_AFTER){
            if(mask.getMaskTypeDetail()!=null && org.apache.commons.lang.StringUtils.isNumeric(mask.getMaskTypeDetail())){
                charCount = Integer.valueOf(mask.getMaskTypeDetail());
            }
            if(columnValue == null){
                return null;
            }

            if(columnValue.length() <= charCount){
                return columnValue;
            }

            return columnValue.substring(0,charCount)+ALL_STARS;


        }else if(mask.getMaskType()== MaskType.STARS_BEFORE){
            if(mask.getMaskTypeDetail()!=null && org.apache.commons.lang.StringUtils.isNumeric(mask.getMaskTypeDetail())){
                charCount = Integer.valueOf(mask.getMaskTypeDetail());
            }
            if(columnValue == null){
                return null;
            }

            if(columnValue.length() <= charCount){
                return columnValue;
            }


            return ALL_STARS + columnValue.substring(columnValue.length()-charCount);

        }


        return columnValue;
    }

    private Mask getMask(String column){
        if(maskMap.isEmpty()){
            return null;
        }
        if(maskMap.containsKey(column.toUpperCase())){
            return maskMap.get(column.toUpperCase());
        }
        return null;
    }


    private void initMaskMap() {
        maskMap = new HashMap<>();
        HashMap<String,List<BaseColumn>> columnParentMap = this.sqlParser.getColumnParentMap();
        for(String column : columnParentMap.keySet()){
            Mask mask = null;
            if(columnParentMap.get(column) != null){
                mask = findMask(columnParentMap.get(column));
            }

            maskMap.put(column.toUpperCase().replaceAll(" ", ""),mask);
        }
    }

    private Mask findMask(List<BaseColumn> baseColumns) {
        Mask mask = null;
        for(BaseColumn column : baseColumns){
            mask = findMask(column);
            if(mask != null){
                break;
            }
        }

        return mask;
    }

    private Mask findMask(BaseColumn baseColumn){
        Mask m = null;

        for(Mask mask : masks){
            if(m !=null){ break; }

            boolean isConnectionMasked = isConnectionMasked(mask);
            if(isConnectionMasked){
                m  = mask;
            }
            boolean isTableMasked = isTableMasked(baseColumn, mask);
            if(isTableMasked){
                m = mask;
            }else{
                m = null;
            }

            boolean isColumnMasked = isColumnMasked(baseColumn, mask);
            if(isColumnMasked){
                m = mask;
            }else{
                m = null;
            }
        }

        return m;
    }

    private boolean isColumnMasked(BaseColumn baseColumn, Mask mask) {

        if(!isTableMasked(baseColumn,mask)){
            return false;
        }

        if(StringUtils.isEmpty(mask.getColumnName()) || mask.getColumnName().equalsIgnoreCase(baseColumn.getName())){
            return true;
        }

        return false;
    }

    private boolean isConnectionMasked(Mask mask) {
        if(StringUtils.isEmpty(mask.getColumnName()) && StringUtils.isEmpty(mask.getTableName())){
            return true;
        }
        return false;
    }

    private boolean isTableMasked(BaseColumn baseColumn, Mask mask) {

        if(baseColumn.getTable()==null){
            return false;
        }

        if(StringUtils.isEmpty(mask.getTableName())){
            return true;
        }


        if(mask.getTableName().equalsIgnoreCase(baseColumn.getTable().getName())){
            return true;
        }

        String table = baseColumn.getTable().getOwner() + "." + baseColumn.getTable().getName();
        if(mask.getTableName().equalsIgnoreCase(table)){
            return true;
        }

        return false;
    }

    public boolean isMasked(String column) {
        return getMask(column) != null;
    }
}
