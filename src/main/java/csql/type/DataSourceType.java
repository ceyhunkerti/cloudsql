package csql.type;

import gudusoft.gsqlparser.EDbVendor;

public enum DataSourceType {
    Oracle,MySql, MsSql,HSqlDb, SqLite;


    private DataSourceType EDbVendorToDataSourceType(EDbVendor vendor) {

        switch (vendor) {
            case dbvoracle  : return DataSourceType.Oracle;
            case dbvmssql   : return DataSourceType.MsSql;
            case dbvmysql   : return DataSourceType.MySql;
        }

        return DataSourceType.Oracle;
    }

    private EDbVendor dataSourceTypeToEDbVendor( DataSourceType dataSourceType) {
        switch (dataSourceType) {
            case MySql  : return EDbVendor.dbvmysql;
            case Oracle : return EDbVendor.dbvoracle;
            case MsSql  : return EDbVendor.dbvmssql;
        }

        return EDbVendor.dbvoracle;
    }
}
