package csql.model.util;

import com.fasterxml.jackson.annotation.JsonIgnore;
import csql.model.datastore.Table;

public class AppResponse extends Table {

    private boolean success = true;
    private String message;
    private ResponseCode responseCode = ResponseCode.UNKNOWN;
    private Object data;


    public AppResponse() {

    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Object getData() {
        return data;
    }

    public void setData(Object data) {
        this.data = data;
    }

    public String getResponseCode() {
        return responseCode.toString();
    }

    public void setResponseCode(ResponseCode responseCode) {
        this.responseCode = responseCode;
    }

    @JsonIgnore
    public static AppResponse error() {
        AppResponse response = new AppResponse();
        response.setResponseCode(ResponseCode.ERROR);
        return response;
    }
}
