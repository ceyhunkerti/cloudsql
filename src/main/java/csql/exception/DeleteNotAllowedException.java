package csql.exception;

public class DeleteNotAllowedException extends RuntimeException {
    public DeleteNotAllowedException(String path) {
        super(String.format("Not allowed to delete", path));
    }
}
