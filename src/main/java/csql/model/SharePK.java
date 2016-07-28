package csql.model;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;

@Embeddable
public class SharePK implements Serializable {

    @Column(name="OWNER")
    private String owner;

    @Column(name="PATH")
    private String path;

    public SharePK() {}

    public SharePK(String owner, String path) {
        this.owner = owner;
        this.path  = path;
    }

    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }

    public String getOwner() {
        return owner;
    }

    public void setOwner(String owner) {
        this.owner = owner;
    }


    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((owner == null) ? 0 : owner.hashCode());
        result = prime * result + ((path == null) ? 0 : path.hashCode());
        return result;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (obj == null)
            return false;
        if (getClass() != obj.getClass())
            return false;
        SharePK other = (SharePK) obj;
        if (owner == null) {
            if (other.owner!= null)
                return false;
        } else if (!owner.equals(other.owner))
            return false;
        if (path == null) {
            if (other.path != null)
                return false;
        } else if (!path.equals(other.path))
            return false;

        return true;
    }
}
