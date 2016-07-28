package csql.service;

import csql.model.MailServer;

import java.util.List;

public interface MailServerService {

    public List<MailServer> findAll();
    public MailServer findOne();
    public MailServer findById(int id);
    public MailServer create(MailServer mailServer);
    public MailServer update(MailServer mailServer);
    public void removeById(int id);

}
