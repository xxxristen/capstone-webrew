package app.vercel.webrew.exception;
public class EmptyProductListException extends RuntimeException {
    // Constructor to handle when the task list is empty
    public EmptyProductListException(String msg) {
        super(msg);
    }
}
