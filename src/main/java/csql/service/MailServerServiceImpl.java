package csql.service;

import csql.model.MailServer;
import csql.repository.MailServerRepository;
import csql.util.security.Crypto;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class MailServerServiceImpl implements MailServerService {

    private MailServerRepository mailServerRepository;

    @Autowired
    public MailServerServiceImpl(MailServerRepository mailServerRepository){
        this.mailServerRepository = mailServerRepository;
    }

    public MailServerServiceImpl(){}

    @Override
    public List<MailServer> findAll() {
        return mailServerRepository.findAll();
    }

    @Override
    public MailServer findOne() {
        List<MailServer> all = findAll();
        if(all!= null && all.size()>0){
            return all.get(0);
        }
        return null;
    }

    @Override
    public MailServer findById(int id) {
        return mailServerRepository.findOne(id);
    }

    @Override
    public MailServer create(MailServer mailServer) {
        mailServerRepository.deleteAll();
        String password = mailServer.getSmtpPassword();
        mailServer.setSmtpPassword(Crypto.encrypt(password));
        return mailServerRepository.save(mailServer);
    }

    @Override
    public MailServer update(MailServer mailServer) {
        MailServer ms = mailServerRepository.findOne(mailServer.getId());

        ms.setSmtpHost(mailServer.getSmtpHost());
        ms.setSmtpPort(mailServer.getSmtpPort());
        ms.setSmtpUsername(mailServer.getSmtpUsername());

        String password = mailServer.getSmtpPassword();
        if(!StringUtils.isEmpty(password)){
            if(!password.equals(ms.getSmtpPassword())){
                ms.setSmtpPassword(Crypto.encrypt(password));
            }
        }

        ms.setProxy(mailServer.isProxy());
        ms.setProxyHost(mailServer.getProxyHost());
        ms.setProxyPort(mailServer.getProxyPort());

        return mailServerRepository.save(ms);
    }

    @Override
    public void removeById(int id) {
        mailServerRepository.delete(id);
    }
}
