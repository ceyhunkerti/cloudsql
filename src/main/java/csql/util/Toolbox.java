package csql.util;

import csql.type.DataSourceType;
import org.apache.commons.lang.StringUtils;
import org.zeroturnaround.zip.ZipUtil;

import java.io.File;
import java.io.IOException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

public class Toolbox {

    public static String getDriverClassName(String url) {
        String u = url.toLowerCase();

        if(u.contains("mysql")){
            return "com.mysql.jdbc.Driver";
        }
        if(u.contains("hsqldb")){
            return "org.hsqldb.jdbcDriver";
        }
        if(u.contains("oracle")){
            return "oracle.jdbc.driver.OracleDriver";
        }

        return "";
    }

    public static DataSourceType getDataSourceType(String url) {
        if(url.contains("mysql"))     return DataSourceType.MySql;
        if(url.contains("hsqldb"))    return DataSourceType.HSqlDb;
        if(url.contains("oracle"))    return DataSourceType.Oracle;

        return DataSourceType.Oracle;
    }

    public static void archive(String source, String archiveName) throws IOException{

        DateFormat dateFormat = new SimpleDateFormat("yyyy.mm.dd.HH.mm.ss");
        Date today = Calendar.getInstance().getTime();
        archiveName = archiveName + "."+dateFormat.format(today);
        ZipUtil.pack(new File(source), new File(archiveName));

    }

    public static String getAbsPath(String base, String path){

        return
                StringUtils.removeEnd(base, "/")
                        +   "/"
                        +   StringUtils.removeStart(path,"/");
    }


}
