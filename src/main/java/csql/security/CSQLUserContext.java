package csql.security;

import csql.model.User;

public interface CSQLUserContext {
    public User getCurrentUser();
}
