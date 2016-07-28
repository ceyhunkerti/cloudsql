package csql.util;

import csql.model.MailServer;
import csql.util.security.Crypto;
import org.apache.commons.mail.DefaultAuthenticator;
import org.apache.commons.mail.Email;
import org.apache.commons.mail.EmailException;
import org.apache.commons.mail.SimpleEmail;

public class AppMail {

    private static String from = "info@cloudsql.com";

    public static void send(MailServer server, String to, String subject, String message){

        try {

            String username = server.getSmtpUsername();
            String password = Crypto.decrypt(server.getSmtpPassword());

            Email email = new SimpleEmail();
            email.setHostName(server.getSmtpHost());
            email.setSmtpPort(server.getSmtpPort());
            email.setAuthenticator(new DefaultAuthenticator(username, password));
            email.setSSLOnConnect(true);
            email.setFrom(from);
            email.setSubject(subject);
            email.setMsg(message);
            email.addTo(to);
            email.send();
        } catch (EmailException e){
            e.printStackTrace();
        }
    }


}
