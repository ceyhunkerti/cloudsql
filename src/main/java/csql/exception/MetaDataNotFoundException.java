package csql.exception;

public class MetaDataNotFoundException extends RuntimeException {
    public MetaDataNotFoundException() {
        super("Unable to get meta data");
    }
}