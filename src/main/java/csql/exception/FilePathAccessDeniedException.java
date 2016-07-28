package csql.exception;

public class FilePathAccessDeniedException extends RuntimeException {
    public FilePathAccessDeniedException(String message) {
        super(message);
    }
}
