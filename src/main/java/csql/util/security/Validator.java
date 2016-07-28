package csql.util.security;

import csql.exception.FilePathAccessDeniedException;
import csql.exception.InvalidValueException;
import org.apache.commons.lang.StringUtils;
import org.springframework.stereotype.Component;

@Component
public class Validator {

    public boolean isValidFilePath(String path) throws InvalidValueException{


        if(!StringUtils.contains(path, "..")){
            return true;
        }

        throw new InvalidValueException("Invalid path");
    }

    public boolean userHasAccess(String username, String path) throws FilePathAccessDeniedException{
        if(path.startsWith("/" + username + "/")){
            return true;
        }

        String message = "%s can not access path %s";
        throw new FilePathAccessDeniedException(String.format(message,username,path));
    }

    public boolean isValidAndUserHasAccess(String username, String path) throws InvalidValueException, FilePathAccessDeniedException{

        if(!isValidFilePath(path)) {
            return false;
        }else if(!userHasAccess(username, path)){
            return false;
        }

        return true;
    }

}
