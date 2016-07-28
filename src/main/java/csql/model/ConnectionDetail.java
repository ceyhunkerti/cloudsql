package csql.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import csql.util.security.Crypto;
import org.apache.commons.lang.StringUtils;
import org.jasypt.exceptions.EncryptionOperationNotPossibleException;

import javax.persistence.*;

@Entity
@Table(name = "connections")
public class ConnectionDetail {

    @Id
    @SequenceGenerator(name="connection_seq", sequenceName="connection_seq")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "connection_seq")
    private Integer id;

    @Column
    private String name;

    @Column
    private String url;

    @Column
    private String username;

    @Column
    private String password;

    @Column
    private boolean active;


    public ConnectionDetail(){}

    public ConnectionDetail(int id) {
        this.id = id;
    }


    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @JsonIgnore
    public String getPasswordDecrypted(){
        if(!StringUtils.isEmpty(password)){
            try {
                return Crypto.decrypt(this.password);
            }catch (EncryptionOperationNotPossibleException e){
                e.printStackTrace();
            }
        }

        return password;
    }


    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }
}
