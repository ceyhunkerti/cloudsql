conn = jaydebeapi.connect('org.hsqldb.jdbcDriver['jdbc:hsqldb:mem:.', 'SA','/path/to/hsqldb.jar',)


conn = jaydebeapi.connect('org.hsqldb.jdbcDriver',['jdbc:hsqldb:mem:.', '', ''],'/path/to/hsqldb.jar',)
