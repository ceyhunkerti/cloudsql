package csql.model;

import javax.persistence.*;
import java.util.Arrays;
import java.util.List;


@Entity
@Table(name="SHARES")
public class Share {

    @SequenceGenerator(name="SHARE_SEQ", sequenceName="SHARE_SEQ")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "SHARE_SEQ")
    private int shareNo;

    @EmbeddedId
    private SharePK sharePK;

    @Column
    private String guests;

    public Share() {

    }

    public Share(String owner, String path, String guests) {
        this.setSharePK(new SharePK(owner,path));
        this.setGuests(guests);
    }

    public String getGuests() {
        return guests;
    }

    public void setGuests(String guests) {
        this.guests = guests;
    }

    public List<String> getGuestList() {
        return Arrays.asList(this.guests.split(" "));
    }

    public SharePK getSharePK() {
        return sharePK;
    }

    public void setSharePK(SharePK sharePK) {
        this.sharePK = sharePK;
    }

    public int getShareNo() {
        return shareNo;
    }

    public void setShareNo(int shareNo) {
        this.shareNo = shareNo;
    }

    public String getOwner() {
        return this.getSharePK().getOwner();
    }

    public String getPath() {
        return this.getSharePK().getPath();
    }

}
