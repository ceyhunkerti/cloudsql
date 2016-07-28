package csql.exception;

public class UndefinedObjectException extends RuntimeException {
    public UndefinedObjectException(String object) {
        super("Object " + object + " is not defined");
    }
}
