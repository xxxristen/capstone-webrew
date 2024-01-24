package app.vercel.webrew.exception;

public class ResourceNotFoundException extends RuntimeException {
    public ResourceNotFoundException(Integer id){
        super("Could not find product: "+id+".");
    }
}
