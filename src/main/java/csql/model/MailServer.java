package csql.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

@Entity
@Table(name="mail_server")
@JsonIgnoreProperties(ignoreUnknown = true)
public class MailServer {

    @Id
    @SequenceGenerator(name="mail_server_seq", sequenceName="mail_server_seq")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "mail_server_seq")
    private Integer id;

    @Column
    private String smtpHost;

    @Column
    private Integer smtpPort;

    @Column
    private String smtpUsername;

    @Column
    private String smtpPassword;

    @Column
    private boolean proxy;

    @Column
    private String proxyHost;

    @Column
    private Integer proxyPort;

    /**
     * for development
     * disable if no mail server
     */
    @Column
    private boolean active;


    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getSmtpHost() {
        return smtpHost;
    }

    public void setSmtpHost(String smtpHost) {
        this.smtpHost = smtpHost;
    }

    public Integer getSmtpPort() {
        return smtpPort;
    }

    public void setSmtpPort(Integer smtpPort) {
        this.smtpPort = smtpPort;
    }

    public String getSmtpUsername() {
        return smtpUsername;
    }

    public void setSmtpUsername(String smtpUsername) {
        this.smtpUsername = smtpUsername;
    }

    public String getSmtpPassword() {
        return smtpPassword;
    }

    public void setSmtpPassword(String smtpPassword) {
        this.smtpPassword = smtpPassword;
    }

    public boolean isProxy() {
        return proxy;
    }

    public void setProxy(boolean proxy) {
        this.proxy = proxy;
    }

    public String getProxyHost() {
        return proxyHost;
    }

    public void setProxyHost(String proxyHost) {
        this.proxyHost = proxyHost;
    }

    public Integer getProxyPort() {
        return proxyPort;
    }

    public void setProxyPort(Integer proxyPort) {
        this.proxyPort = proxyPort;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }
}
